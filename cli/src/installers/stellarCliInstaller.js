/**
 * @file StellarCliInstaller.js
 * @description Stellar CLI installer for Omnilumen.
 * @module StellarCliInstaller
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */

import { setup, utils } from '@omnilumen/core';
import {execSync} from 'child_process';
import os from 'os';
import ora from "ora";
import path from "path";
import {fileURLToPath} from "url";
import {STELLAR_CLI_GIT} from "../utils/cliConst.js";
const { displayInstallerVersion, getVersionTags, runShellCommandWithLogs, runShellCommand, runCommand, OmnilumenInstaller } = setup;
const { isWindows } = utils;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * Class representing a StellarCl Installer.
 * @extends OmnilumenInstaller
 */
export default class StellarCliInstaller extends OmnilumenInstaller {
    /**
     * Create a StellarCliInstaller instance.
     */
    constructor() {
        super();
    }
    /**
     * Check if GCC is installed and prompt the user to install it if not.
     */
    checkAndInstallGcc() {
        try {
            const scriptPath = path.resolve(__dirname, 'source_stellar_cli_env.sh');
               if (!isWindows()) {
                execSync(`sh ${scriptPath}`).toString();
            }
        } catch (error) {

        }
    }

    /**
     * @param {Object} options - Options for installation.
     * @param {boolean} [options.experimental=false] - Whether to install experimental features.
     * @param {string} [options.features="opt"] - Additional features to include.
     * @param {string} [options.gitUrl="https://github.com/stellar/stellar-cli.git"] - Git URL for experimental installation.
     * @param {string} [options.customOptions=""] - Additional custom options to pass to the install command.
     */
    async install(options = {}) {
        const {
            experimental = false,
            features = "opt",
            gitUrl = STELLAR_CLI_GIT,
            customOptions = ""
        } = options;

        const platform = os.platform();

        try {
            this.checkAndInstallGcc();
            let command;
            if (experimental) {
                command = `cargo install --locked stellar-cli --features ${features} --git ${gitUrl} ${customOptions}`;
            } else {
                switch (platform) {
                    case 'win32':
                        // Windows installation using cargo-binstall or another appropriate method
                        command = `cargo install --locked cargo-binstall && cargo binstall -y stellar-cli ${customOptions}`;
                        break;
                    case 'darwin':
                        command = `brew install stellar/tap/stellar-cli ${customOptions}`;
                        break;
                    case 'linux':
                        command = `cargo install --locked stellar-cli --features ${features} ${customOptions}`;
                        break;
                    default:
                        throw new Error('Unsupported platform. Stellar CLI installation supports Windows, macOS, and Unix-like systems.');
                }
            }
            await runShellCommandWithLogs(command);
            console.log('Stellar CLI installed successfully.');
            // Check and display the installed version
            await displayInstallerVersion(this);
        } catch (error) {
            console.error(`Stellar CLI installation failed: ${error.message}`);
        }
    }

    /**
     * Update Stellar CLI.
     * @param {string} [version='latest'] - The version to update.
     */
    /**
     * Update Stellar CLI to a specific version.
     * @param versionInput
     */
    async update(versionInput) {
        const platform = os.platform();

        try {
            let command;
            if (!versionInput) {
                throw new Error('Version is required for update.');
            }
            const version = versionInput.replace(/^v/, '');
            switch (platform) {
                case 'win32':
                    command = `cargo install --locked --version ${version} stellar-cli`;
                    break;
                case 'darwin':
                case 'linux':
                    command = `cargo install --locked --version ${version} stellar-cli`;
                    break;
                default:
                    throw new Error('Unsupported platform. Stellar CLI update supports Windows, macOS, and Unix-like systems.');
            }
            await runShellCommandWithLogs(command);
            console.log(`Stellar CLI updated to version ${version} successfully.`);
            await displayInstallerVersion(this);
        } catch (error) {
            console.error(`Stellar CLI update failed: ${error.message}`);
        }
    }

    /**
     * Uninstall Stellar CLI.
     */
    async uninstall() {
        const spinner = ora('Uninstalling stellar-cli...').start();
        const platform = os.platform();
        let command;
        try {
            switch (platform) {
                case 'win32':
                    // Windows installation using cargo-binstall or another appropriate method
                    command = `cargo uninstall stellar-cli`;
                    break;
                case 'darwin':
                    command = `brew uninstall stellar/tap/stellar-cli`;
                    break;
                case 'linux':
                    command = `cargo uninstall stellar-cli`;
                    break;
                default:
                    throw new Error('Unsupported platform. Stellar CLI uninstallation supports Windows, macOS, and Unix-like systems.');
            }
            await runShellCommand(command, spinner);
            spinner.succeed('stellar-cli uninstalled successfully.');
        } catch (error) {
            if (error.message.includes('not found')) {
                spinner.succeed('stellar-cli was already uninstalled.');
            } else {
                spinner.fail(`stellar-cli uninstallation failed: ${error.message}`);
            }
        }

    }

    /**
     * Get available Stellar CLI versions.
     * @returns {Promise<string>} - The available versions.
     */
    async getAvailableVersions() {
        return await getVersionTags('stellar/stellar-core', 12);
    }

    /**
     * Check the currently installed Stellar CLI version.
     * @returns {Promise<string>} - The installed version.
     */
    async checkVersion() {
        try {
            return await runCommand('stellar --version');
        } catch (error) {
            return 'Unknown';
        }
    }
}