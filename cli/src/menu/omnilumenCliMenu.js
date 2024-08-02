// stellarCliMenu.js
import {CLI_TOP_MENU} from "../utils/cliConst.js";
import inquirer from 'inquirer';
import chalk from 'chalk';
import {constants, setup} from '@omnilumen/core';
import RustInstaller from "../installers/rustInstaller.js";
import StellarCliInstaller from "../installers/stellarCliInstaller.js";
const { COMMON } = constants;
const { BaseSetupMenu } = setup;

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
