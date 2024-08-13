/**
 * @file RustInstaller.js
 * @description Rust installer for Omnilumen.
 * @module RustInstaller
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */
import ora from 'ora';
import shell from 'shelljs';
import {setup, constants} from '@omnilumen/core';

const { listImageTags, displayImageTagsTable, displayInstallerVersion, runShellCommand, OmnilumenInstaller } = setup;
const {TAG} = constants
/**
 * Class representing a Quickstart Installer.
 * @extends OmnilumenInstaller
 */
export default class QuickStartInstaller extends OmnilumenInstaller {
    /**
     * Create a Quickstart instance.
     */
    constructor() {
        super();
    }

    /**
     * Installs Stellar Quickstart by pulling the latest Docker image.
     * Works on Windows, macOS, and Unix-like systems.
     */
    async install() {
        const spinner = ora('Installing Stellar Quickstart...').start();

        try {
            // Pull the latest Stellar Quickstart Docker image
            await runShellCommand('docker pull stellar/quickstart:latest', spinner);

            spinner.succeed('Stellar Quickstart installed successfully.');

            // Display the list of Docker images
            await displayInstallerVersion(this);

        } catch (error) {
            spinner.fail(`Stellar Quickstart installation failed: ${error.message}`);
        }
    }

    /**
     * Updates Stellar Quickstart to the specified version by pulling the Docker image.
     * If no version is specified, it defaults to 'latest'.
     *
     * @param {string} [version='latest'] - The version of the Stellar Quickstart Docker image to update to.
     * @returns {Promise<void>} Resolves when the update is complete, or throws an error if it fails.
     */
    async update(version = 'latest') {
        const spinner = ora(`Updating Quickstart to version ${version}...`).start();
        try {
            // Pull the specified version of the Stellar Quickstart Docker image
            await runShellCommand(`docker pull stellar/quickstart:${version}`, spinner);
            spinner.succeed(`Quickstart updated to version ${version} successfully.`);

            // Remove any previous versions except the current one
            const imagesToRemove = shell.exec('docker images stellar/quickstart --format "{{.Tag}}"', { silent: true })
                .stdout.split('\n')
                .map(tag => tag.trim())
                .filter(tag => tag && tag !== version);

            for (const oldVersion of imagesToRemove) {
                await runShellCommand(`docker rmi stellar/quickstart:${oldVersion}`, spinner);
                spinner.succeed(`Removed old version: stellar/quickstart:${oldVersion}`);
            }

            // Optionally, check and display the installed version
            await displayInstallerVersion(this);
        } catch (error) {
            spinner.fail(`Quickstart update failed: ${error.message}`);
        }
    }

    /**
     * Uninstalls Stellar Quickstart by removing the Docker container and image.
     * Provides user feedback via a spinner during the process.
     *
     * @returns {Promise<void>} Resolves when the uninstallation is complete, or throws an error if it fails.
     */
    async uninstall() {
        const spinner = ora('Uninstalling Stellar Quickstart...').start();
        try {
            // Stop and remove any running containers based on the Stellar Quickstart image
            await runShellCommand('docker rm -f stellar', spinner);

            // Remove the Stellar Quickstart Docker image
            await runShellCommand('docker rmi stellar/quickstart', spinner);
            spinner.succeed('Stellar Quickstart uninstalled successfully.');
            await displayInstallerVersion(this);
        } catch (error) {
            if (error.message.includes('No such container') || error.message.includes('No such image')) {
                spinner.succeed('Stellar Quickstart was already uninstalled.');
            } else {
                spinner.fail(`Stellar Quickstart uninstallation failed: ${error.message}`);
            }
        }
    }
    /**
     * Get available Rust versions.
     * @returns {Promise<string>} - The available versions.
     */

    async getAvailableVersions() {
        const spinner = ora('Fetching available quickstart tags...').start();
        try {
            const versions = await listImageTags('stellar/quickstart', 20);
            spinner.succeed('Fetched available quickstart versions successfully.');
            return versions;
        } catch (error) {
            spinner.fail(`Failed to fetch available quickstart tags: ${error.message}`);
            throw error;
        }
    }
    /**
     * display available Rust versions.
     * @returns {Promise<string>} - The available versions.
     */
    async  displayVersionTags(tags) {
        try {
            await displayImageTagsTable(tags, [25, 25, 25, 25])
        } catch (error) {
            throw error;
        }
    }
    /**
     * get the component tag type.
     * @throws {Error} Method not implemented.
     */
    async tagType() {
        return TAG.IMAGE
    }
    /**
     * Checks and displays the version of the installed Stellar Quickstart Docker image.
     *
     * @returns {Promise<string>} Resolves to the version and tag information, or 'Unknown' if not found.
     */
    async checkVersion() {
        try {
            // Command to get the repository and tag for the Stellar Quickstart image
            const command = `docker images stellar/quickstart --format "{{.Repository}}:{{.Tag}}"`;
            const versionOutput = shell.exec(command, { silent: true }).stdout.trim();

            // Check if versionOutput is not empty
            if (versionOutput) {
                console.log(versionOutput); // Display the repository and tag
                return versionOutput;
            } else {
                return 'Unknown';
            }
        } catch (error) {
            console.error('Error fetching version:', error);
            return 'Unknown';
        }
    }
    /**
     * Checks if the Stellar Quickstart container is running using Docker.
     * @returns {Promise<boolean>} Resolves to true if the container is running, otherwise resolves to false.
     */
    async isQuickstartRunning() {
        const spinner = ora('Checking if Stellar Quickstart is running...').start();
        try {
            const command = 'docker ps -a --filter "ancestor=stellar/quickstart" --filter "status=running" --format "{{.Names}}"';
            const result = await runShellCommand(command, spinner);

            if (result) {
                spinner.succeed('Stellar Quickstart container is running.');
                return true;
            } else {
                throw new Error('Stellar Quickstart container is not running.');
            }
        } catch (error) {
            if (error.message.includes('not running')) {
                spinner.succeed('Stellar Quickstart container is not running.');
                return false;
            } else {
                spinner.fail(`Failed to check Stellar Quickstart container: ${error.message}`);
                return false;
            }
        }
    }
}