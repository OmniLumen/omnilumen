#!/usr/bin/env node

/**
 * @file omnilumen-quickstart.js
 * @description Main entry point for the OmniLumen quickstart. Handles command-line arguments, reconstructs commands, and executes them using the Stellar quickstart.
 * @module bin
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */

import OmnilumenQuickStartMenu from "../src/menu/omnilumenQuickStartMenu.js";
import {
    processCustomCommand,quickstartCommands,
    startFutureNetNode,
    startFutureNetPersistentNode,
    startLocalNetwork,
    startTestnetNode,
    startTestNetPersistentNode
} from "../src/commands/quickstartCommand.js";
import {STELLAR_QUICK_START_IMAGE} from "../src/utils/quickstartConst.js";
import {setup, utils} from '@omnilumen/core';

const { ensureStellarQuickStart, shutdownContainer } = utils;
const {displayHomeMenu, showHelp} = setup;



// Function to display the menu
async function showMenu() {
    displayHomeMenu('OmniLumen|quick start')
    /**
     * Entry point for the OmniLumen CLI application.
     * Initializes and displays the main menu.
     *
     * @async
     * @function
     * @name main
     * @returns {Promise<void>} A promise that resolves when the menu is shown and handled.
     */

    const quickstartMenu = new OmnilumenQuickStartMenu();
    await quickstartMenu.showMenu();
}


/**
 * Main entry point for the OmniLumen quickstart application.
 * Ensures Stellar quickstart is installed and handles command line arguments.
 *
 * If Stellar quickstart is not installed or no additional arguments are provided,
 * the interactive menu is displayed. Otherwise, the provided command is executed.
 *
 * @async
 * @function
 * @name main
 * @returns {Promise<void>} A promise that resolves when the quickstart operation is complete.
 *
 * @example
 * // Run without arguments to display the menu:
 * // $ node bin/omnilumen-quickstart.js
 *
 */
async function main() {
    const stellarQuickStartInstalled = await ensureStellarQuickStart();

    if (!stellarQuickStartInstalled || process.argv.length <= 2) {
        await showMenu();
    } else {
        const args = process.argv.slice(2); // Skip 'node' and 'omnilumen-quickstart'
        const command = args[0].toLowerCase();
        // Handle help commands
        if (command === '--help' || command === '-h') {
            showHelp('OmniLumen Quickstart Commands:', quickstartCommands);
            return;
        }
        // Handle quick commands
        switch (command) {
            case 'start-local':
            case 'local':
            case 'up':
                await startLocalNetwork(args.slice(1));
                return;
            case 'start-futurenet':
            case 'future':
            case 'fn':
                await startFutureNetNode(args.slice(1));
                return;
            case 'start-futurenet-persistent':
            case 'futurenet-persist':
            case 'future-persist':
            case 'fn-persist':
            case 'fnp':
                await startFutureNetPersistentNode(args.slice(1));
                return;
            case 'start-testnet':
            case 'tn':
                await startTestnetNode(args.slice(1));
                return;
            case 'start-testnet-persistent':
            case 'testnet-persist':
            case 'tn-persist':
            case 'tnp':
                await startTestNetPersistentNode(args.slice(1));
                return;
            case 'shutdown':
            case 'down':
                await shutdownContainer(STELLAR_QUICK_START_IMAGE);
                return;
            default:
                // Proceed with the custom Docker command or general command processing
                await processCustomCommand(args);
        }
    }
}


// Run the main function and handle any unhandled promise rejections
main().catch(error => {
    console.error(error);
    process.exit(1);
});