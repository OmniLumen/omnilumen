/**
 * @file quickstartCommand.js
 * @description Quickstart Command for Omnilumen.
 * @module quickstartCommand
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */

import {utils} from "@omnilumen/core";
import {setup} from '@omnilumen/core';
import os from 'os';
import path from 'path';
import {
    STELLAR_CONTAINER_NAME,
    STELLAR_CONTAINER_PERSISTENT_NAME,
    STELLAR_QUICK_START_IMAGE
} from "../utils/quickstartConst.js";
const { executeShellCommand } = setup;
const {startDockerContainer, removeExistingContainer, stopContainersByImageName}= utils;


/**
 * Starts a local development/test network with customizable settings.
 * @param {Array} customArgs - Additional custom arguments provided by the user.
 */
export const startLocalNetwork = async (customArgs) => {
    // Stop and remove the existing container if it exists
    removeExistingContainer(STELLAR_CONTAINER_NAME);
    await startDockerContainer(customArgs, '--local', STELLAR_CONTAINER_NAME, 'stellar/quickstart', '');
};

/**
 * Starts a futurenet node with customizable settings.
 * @param {Array} customArgs - Additional custom arguments provided by the user.
 */
export const startFutureNetNode = async (customArgs) => {
    removeExistingContainer(STELLAR_CONTAINER_NAME);
    await startDockerContainer(customArgs, '--futurenet', STELLAR_CONTAINER_NAME, 'stellar/quickstart', '');
};

/**
 * Starts a persistent futurenet node with customizable settings.
 * @param {Array} customArgs - Additional custom arguments provided by the user.
 */
export const startFutureNetPersistentNode = async (customArgs) => {
    removeExistingContainer(STELLAR_CONTAINER_PERSISTENT_NAME);
    // Determine the default volume directory based on the network type
    const volumeOption = getVolumeOption('--futurenet');
    await startDockerContainer(customArgs, '--futurenet', STELLAR_CONTAINER_PERSISTENT_NAME, 'stellar/quickstart', volumeOption);
};

/**
 * Starts a testnet node with customizable settings.
 * @param {Array} customArgs - Additional custom arguments provided by the user.
 */
export const startTestnetNode = async (customArgs) => {
    removeExistingContainer(STELLAR_CONTAINER_NAME);
    await startDockerContainer(customArgs, '--testnet', STELLAR_CONTAINER_NAME, 'stellar/quickstart', '');
};

/**
 * Starts a persistent testnet node with customizable settings.
 * @param {Array} customArgs - Additional custom arguments provided by the user.
 */
export const startTestNetPersistentNode = async (customArgs) => {
    removeExistingContainer(STELLAR_CONTAINER_PERSISTENT_NAME);
    // Determine the default volume directory based on the network type
    const volumeOption = getVolumeOption('--testnet');
    await startDockerContainer(customArgs, '--testnet', STELLAR_CONTAINER_PERSISTENT_NAME, 'stellar/quickstart', volumeOption);
};


/**
 * Processes custom Docker commands or general commands from the user.
 * @param {Array} args - The command line arguments provided by the user.
 */
export const processCustomCommand = async (args) => {
    const reconstructedCommand = args.map(arg => {
        // Add quotes if the argument contains spaces, semicolons, or ampersands
        if (arg.includes(' ') || arg.includes(';') || arg.includes('&')) {
            return `"${arg}"`;
        }
        return arg;
    }).join(' ');

    const hasDockerRun = reconstructedCommand.startsWith('docker run');
    const networkOptions = ['--pubnet', '--testnet', '--futurenet', '--local'];
    const hasNetworkOption = networkOptions.some(option => reconstructedCommand.includes(option));

    if (!hasNetworkOption) {
        console.error('Error: You must provide one of the network options: --pubnet, --testnet, --futurenet or --local.');
        process.exit(1);
    }

    // Stop containers running the `stellar/quickstart` image before executing the new command
    stopContainersByImageName(STELLAR_QUICK_START_IMAGE);

    const dockerCommand = hasDockerRun
        ? reconstructedCommand // Use the full command as provided by the user
        : `docker run ${reconstructedCommand}`; // Prepend "docker run" if not provided

    console.log("Executing:", dockerCommand);
    await executeShellCommand(dockerCommand);
}
/**
 * Function to determine the appropriate volume directory and options based on the network type.
 * @param {string} networkOption - The network option to pass to the quickstart (e.g., --testnet, --pubnet).
 * @returns {string} - The Docker volume option string (e.g., `-v "/path:/opt/stellar"`).
 */
export const getVolumeOption = (networkOption) => {
    let defaultDirName;

    if (networkOption === '--testnet') {
        defaultDirName = '.stellar-testnet';
    } else if (networkOption === '--futurenet') {
        defaultDirName = '.stellar-futurenet';
    } else if (networkOption === '--pubnet') {
        defaultDirName = '.stellar-mainnet';
    } else if (networkOption === '--pubnet') {
        defaultDirName = '.stellar-local';
    }  else {
        throw new Error('Invalid network option. Use --local or --futurenet or --testnet or --pubnet.');
    }

    // Determine the default volume directory based on the user's home directory
    const defaultVolumeDir = path.join(os.homedir(), defaultDirName);

    // Return the Docker volume option string
    return `-v "${defaultVolumeDir}:/opt/stellar"`;
}