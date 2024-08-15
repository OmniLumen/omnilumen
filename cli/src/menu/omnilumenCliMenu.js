// stellarCliMenu.js
import {CLI_TOP_MENU} from "../utils/cliConst.js";
import inquirer from 'inquirer';
import chalk from 'chalk';
import Table from 'cli-table3';
import {constants, setup, utils } from '@omnilumen/core';
import RustInstaller from "../installers/rustInstaller.js";
import StellarCliInstaller from "../installers/stellarCliInstaller.js";
const { COMMON } = constants;
const { BaseSetupMenu } = setup;
const { collectCommands } = utils;

class OmnilumenCliMenu extends BaseSetupMenu {

    constructor() {
        const installerMap = {
            [CLI_TOP_MENU.RUST]: new RustInstaller(),
            [CLI_TOP_MENU.STELLAR_CLI]: new StellarCliInstaller()
        };
        super(installerMap);
    }

    async checkPrerequisite() {
        const stellarInstaller = this.installerMap[CLI_TOP_MENU.STELLAR_CLI];
        try {
            await stellarInstaller.checkPrerequisite();
        } catch (error) {
            console.error('Failed to check prerequisites:', error);
        }
    }

    getComponents() {
        return [CLI_TOP_MENU.RUST, CLI_TOP_MENU.STELLAR_CLI, COMMON.EXIT];
    }

    async handleComponent(component) {
        if (component === CLI_TOP_MENU.STELLAR_CLI) {
            const rustInstaller = this.installerMap[CLI_TOP_MENU.RUST];
            const rustVersion = (await rustInstaller.checkVersion()).toLowerCase();
            if (rustVersion === COMMON.UNKNOWN) {
                console.log(chalk.red('Rust is not installed. Please install Rust first.'));
                const installPrompt = await inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'installRust',
                        message: 'Do you want to install Rust now?',
                        default: true,
                    }
                ]);
                if (installPrompt.installRust) {
                    await this.showActionMenu(rustInstaller);
                } else {
                    process.exit(0);
                }
            } else {
                const installer = this.installerMap[CLI_TOP_MENU.STELLAR_CLI];
                await this.showActionMenu(installer);
            }
        } else {
            await super.handleComponent(component);
        }
    }
}

export default OmnilumenCliMenu;

/**
 * Displays a help table for the CLI commands.
 *
 * @param {string} title - The title to display above the command list.
 * @param {Object} commandStructure - The root of the command structure to display.
 */
export const showCliHelp = (title, commandStructure) => {
    const table = new Table({
        head: ['Command', 'Description', 'Example'],
        colWidths: [30, 50, 50],
        style: {
            head: ['cyan'],
            border: ['gray'],
            'padding-left': 2,
            'padding-right': 2
        }
    });

    const collectedCommands = [];
    collectCommands(commandStructure, collectedCommands);
    collectedCommands.forEach(cmd => {
        table.push([cmd.command, cmd.description, cmd.example]);
    });

    console.log(title);
    console.log(table.toString());
}