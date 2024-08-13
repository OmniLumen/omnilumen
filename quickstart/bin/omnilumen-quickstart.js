import cfonts from 'cfonts';
import OmnilumenQuickStartMenu from "../src/menu/omnilumenQuickStartMenu.js";
import {utils} from '@omnilumen/core';
const { ensureStellarQuickStart } = utils;


// Function to display the menu
async function showMenu() {
    cfonts.say('OmniLumen|quick start', {
        font: 'simple',              // define the font face
        align: 'left',              // define text alignment
        colors: ['system'],         // define all colors
        background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
        letterSpacing: 1,           // define letter spacing
        lineHeight: 1,              // define the line height
        space: true,                // define if the output text should have empty lines on top and on the bottom
        maxLength: '0',             // define how many characters can be on one line
        gradient: ['red', 'blue'],           // define your two gradient colors
        //gradient: false,           // define your two gradient colors
        independentGradient: false, // define if you want to recalculate the gradient for each new line
        transitionGradient: false,  // define if this is a transition between colors directly
        rawMode: false,             // define if the line breaks should be CRLF (`\r\n`) over the default LF (`\n`)
        env: 'node'                 // define the environment cfonts is being executed in
    });
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
        // const args = process.argv.slice(2); // Skip 'node' and 'omnilumen-cli'
        //
        // // Reconstruct the command line string
        // const reconstructedCommand = args.map(arg => {
        //     // Add quotes if the argument contains spaces, semicolons, or ampersands
        //     if (arg.includes(' ') || arg.includes(';') || arg.includes('&')) {
        //         return `"${arg}"`;
        //     }
        //     return arg;
        // }).join(' ');
        //
        // // Load the CLI configuration store
        // const cliConf = loadConfigStore('stellar_cli-conf');
        //
        // // Generate command paths based on the current command structure
        // generateCommandPaths(cliConf, stellarCommandStructure, '');
        //
        // let finalCommand;
        // // If no specific command is provided, show the help message
        // if (args.length === 0) {
        //     finalCommand = 'stellar --help';
        // } else {
        //     const command = args[0];
        //     if (command === 'stellar') {
        //         // If the command is 'stellar', execute the remaining arguments
        //         finalCommand = `stellar ${args.slice(1).join(' ')}`;
        //     } else {
        //         const updatedReconstructedCommand = `stellar ${reconstructedCommand}`;
        //         finalCommand = await processCliCommandArgs(cliConf, updatedReconstructedCommand);
        //     }
        // }
        // // Execute the final command
        // console.log("Executing:", finalCommand);
        // executeCommand(finalCommand);
    }
}


// Run the main function and handle any unhandled promise rejections
main().catch(error => {
    console.error(error);
    process.exit(1);
});