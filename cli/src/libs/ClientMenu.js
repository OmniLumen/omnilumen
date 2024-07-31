/**
 * @file clientMenu.js
 * @description Menu for interacting with Omnilumen installers.
 * @module ClientMenu
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import InstallerHandler from '../installers/installerHandler.js';
import {
    displayCurrentVersions,
    displayInstallerVersion,
    displayVersionTags,
    getVersions,
    updateVersion
} from './versionToolkit.js';

class ClientMenu {

    /**
     * Handle the chosen action for an installer.
     * @param {OmnilumenInstaller} installer - The installer instance.
     * @param {string} action - The action to perform.
     */
    async handleAction(installer, action) {
        switch (action) {
            case 'install':
                await installer.install();
                break;
            case 'update':
                await updateVersion(installer);
                break;
            case 'uninstall':
                await installer.uninstall();
                break;
            case 'getAvailableVersions':
                const { tags, error } = await installer.getAvailableVersions();
                if (error) {
                    console.error('Error fetching available versions:', error);
                } else {
                    await displayVersionTags(tags);
                }
                break;
            case 'checkVersion':
                await displayInstallerVersion(installer)
                break;
            case 'exit':
                console.log('Exiting...');
                return false;
            default:
                console.log('Unknown action');
        }
        return true;
    }

    async showActionMenu(installer) {

        const componentName = chalk.green(installer.constructor.name.replace('Installer', ''));
        while (true) {
            const currentVersion = (await installer.checkVersion()).toLowerCase();
            let actions = ['back', 'getAvailableVersions', 'checkVersion'];
            if (currentVersion === 'unknown') {
                actions.push('install');
            } else {
                actions.push('update');
                actions.push('uninstall');
            }

            const actionPrompt = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: `Choose an action for the ${componentName} component:`,
                    choices: actions,
                }
            ]);

            if (actionPrompt.action === 'back') {
                return;
            }

            const continueLoop = await this.handleAction(installer, actionPrompt.action);
            // If the action was uninstall, re-check the version to update the menu
            if (actionPrompt.action === 'uninstall') {
                let currentVersion = (await installer.checkVersion()).toLowerCase();
                if (currentVersion === 'unknown') {
                    actions = ['back', 'getAvailableVersions', 'checkVersion', 'install'];
                }
            }

            if (!continueLoop) {
                break;
            }
        }
    }
    /**
     * Show the menu to the user.
     */
    async showMenu() {
        const components = ['rust', 'stellar-cli', 'exit'];
        const versions = await getVersions(components.slice(0, -1));
        displayCurrentVersions(versions);

        let continueLoop = true;
        while (continueLoop) {
            const componentPrompt = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'component',
                    message: 'Choose a component:',
                    choices: components,
                }
            ]);

            if (componentPrompt.component === 'exit') {
                // console.log('Exiting...');
                continueLoop = false;
                process.exit(0);
            } else {
                const installer = InstallerHandler.createInstaller(componentPrompt.component);
                await this.showActionMenu(installer);
            }
        }
    }
}

export default ClientMenu;
