#!/usr/bin/env node

/**
 * @file omnilumen-cli.js
 * @description Main entry point for the OmniLumen CLI. Handles command-line arguments, reconstructs commands, and executes them using the Stellar CLI.
 * @module bin
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */

import OmnilumenCliMenu, {showCliHelp} from "../src/menu/omnilumenCliMenu.js";
import {utils, setup} from '@omnilumen/core';
const {displayHomeMenu} = setup;
import {stellarCommandStructure} from '../src/conf/stellarCliConf.js';
const { ensureStellarCli, executeCommand, generateCommandPaths, loadConfigStore, processCliCommandArgs } = utils;

// Function to display the menu
async function showMenu() {
    displayHomeMenu('OmniLumen|cli')
    /**
     * Entry point for the OmniLumen CLI application.
     * Initializes and displays the main menu.
     *
     * @async
     * @function
     * @name main
     * @returns {Promise<void>} A promise that resolves when the menu is shown and handled.
     */

    const clientMenu = new OmnilumenCliMenu();
    await clientMenu.showMenu();
}



/**
 * Main entry point for the OmniLumen CLI application.
 * Ensures Stellar CLI is installed and handles command line arguments.
 *
 * If Stellar CLI is not installed or no additional arguments are provided,
 * the interactive menu is displayed. Otherwise, the provided command is executed.
 *
 * @async
 * @function
 * @name main
 * @returns {Promise<void>} A promise that resolves when the CLI operation is complete.
 *
 * @example
 * // Run without arguments to display the menu:
 * // $ node bin/omnilumen-cli.js
 *
 * @example
 * // Execute a Stellar contract deploy command:
 * // $ node bin/omnilumen-cli.js stellar contract deploy --source S... --network testnet --wasm-hash <hex-encoded-wasm-hash>
 *
 * @example
 * // Check the version of Stellar CLI:
 * // $ node bin/omnilumen-cli.js stellar version
 */
async function main() {
    const stellarCliInstalled = await ensureStellarCli();

    if (!stellarCliInstalled || process.argv.length <= 2) {
        await showMenu();
    } else {
        const args = process.argv.slice(2); // Skip 'node' and 'omnilumen-cli'
        const command = args[0].toLowerCase();
        // Handle help commands
        if (command === '--help' || command === '-h') {
            showCliHelp('OmniLumen CLI Commands:', stellarCommandStructure);
            return;
        }
        // Reconstruct the command line string
        const reconstructedCommand = args.map(arg => {
            // Add quotes if the argument contains spaces, semicolons, or ampersands
            if (arg.includes(' ') || arg.includes(';') || arg.includes('&')) {
                return `"${arg}"`;
            }
            return arg;
        }).join(' ');

        // Load the CLI configuration store
        const cliConf = loadConfigStore('stellar_cli-conf');

        // Generate command paths based on the current command structure
        generateCommandPaths(cliConf, stellarCommandStructure, '');

        let finalCommand;
        // If no specific command is provided, show the help message
        if (args.length === 0) {
            finalCommand = 'stellar --help';
        } else {
            const command = args[0];
            if (command === 'stellar') {
                // If the command is 'stellar', execute the remaining arguments
                finalCommand = `stellar ${args.slice(1).join(' ')}`;
            } else {
                const updatedReconstructedCommand = `stellar ${reconstructedCommand}`;
                finalCommand = await processCliCommandArgs(cliConf, updatedReconstructedCommand);
            }
        }
        // Execute the final command
        executeCommand(finalCommand);
    }
}


// Run the main function and handle any unhandled promise rejections
main().catch(error => {
    console.error(error);
    process.exit(1);
});