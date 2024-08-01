/**
 * @file RustInstaller.js
 * @description Rust installer for Omnilumen.
 * @module RustInstaller
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */
import os from 'os';
import path from 'path';
import ora from 'ora';
import shell from 'shelljs';
import OmnilumenInstaller from '../libs/omnilumenInstaller.js';
import {displayInstallerVersion, getVersionTags} from "../libs/versionToolkit.js";
import {execSync} from "child_process";
import { fileURLToPath } from 'url';
import { isWindows } from "../utils/util.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default class RustInstaller extends OmnilumenInstaller {
    constructor() {
        super();
        this.sourceCargoEnv();
    }
    sourceCargoEnv() {
        try {
            const scriptPath = path.resolve(__dirname, 'source_cargo_env.sh');

            if (!isWindows()) {
                let output = execSync(`sh ${scriptPath}`).toString();
                // console.log('Environment variables set:', output);
                // Explicitly set environment variables in the Node.js process
                const envVars = output.split('\n').filter(line => line.includes('='));
                envVars.forEach(envVar => {
                    const [key, value] = envVar.split('=');
                    process.env[key] = value;
                });
            } else {

            }

        } catch (error) {

        }
    }

    /**
     * Install Rust.
     */
    async install() {
        const platform = os.platform();
        const spinner = ora('Installing Rust...').start();

        try {
            switch (platform) {
                case 'win32':
                    // For Windows, using the official Rust installer
                    await this.runShellCommand('powershell -Command "Invoke-WebRequest -Uri https://win.rustup.rs -OutFile rustup-init.exe; Start-Process -Wait ./rustup-init.exe -ArgumentList \'-y\'; Remove-Item ./rustup-init.exe"', spinner);
                    break;
                case 'darwin':
                case 'linux':
                    // For macOS and Unix-like systems
                    await this.runShellCommand('curl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y', spinner);
                    // Source the environment variables for the current session
                    shell.exec('source $HOME/.cargo/env', { silent: true });
                    break;
                default:
                    throw new Error('Unsupported platform. Rust installation supports Windows, macOS, and Unix-like systems.');
            }
            // Set the default toolchain to the latest stable version
            await this.runShellCommand(`${this.getRustupCommand()} default stable`, spinner);
            spinner.succeed('Rust installed successfully.');
            // Refresh environment variables
            // shell.env['PATH'] += `:${shell.env['HOME']}/.cargo/bin`;
            this.sourceCargoEnv();
            // Check and display the installed version
            await displayInstallerVersion(this);
        } catch (error) {
            spinner.fail(`Rust installation failed: ${error.message}`);
        }
    }

    /**
     * Update Rust.
     * @param {string} [version='latest'] - The version to update.
     */
    async update(version = 'latest') {
        const spinner = ora(`Updating Rust to version ${version}...`).start();
        try {
            if (version === 'latest') {
                await this.runShellCommand(`${this.getRustupCommand()} update`, spinner);
            } else {
                await this.runShellCommand(`${this.getRustupCommand()} install ${version}`, spinner);
                await this.runShellCommand(`${this.getRustupCommand()} default ${version}`, spinner);
            }
            spinner.succeed(`Rust updated to version ${version} successfully.`);
            process.env.PATH += `:${process.env.HOME}/.cargo/bin`;

            // Ensure environment variables are set for the current session
            this.sourceCargoEnv();

            await displayInstallerVersion(this);
        } catch (error) {
            spinner.fail(`Rust update failed: ${error.message}`);
        }
    }
    /**
     * Uninstall Rust.
     */

    async uninstall() {
        const spinner = ora('Uninstalling Rust...').start();
        try {
            await this.runShellCommand(`${this.getRustupCommand()} self uninstall -y`, spinner);
            spinner.succeed('Rust uninstalled successfully.');
        } catch (error) {
            if (error.message.includes('not found')) {
                spinner.succeed('Rust was already uninstalled.');
            } else {
                spinner.fail(`Rust uninstallation failed: ${error.message}`);
            }
        }
    }
    /**
     * Get available Rust versions.
     * @returns {Promise<string>} - The available versions.
     */

    async getAvailableVersions() {
        const spinner = ora('Fetching available Rust versions...').start();
        try {
            const versions = await getVersionTags('rust-lang/rust', 12);
            spinner.succeed('Fetched available Rust versions successfully.');
            return versions;
        } catch (error) {
            spinner.fail(`Failed to fetch available Rust versions: ${error.message}`);
            throw error;
        }
    }
    /**
     * Check the currently installed Rust version.
     * @returns {Promise<string>} - The installed version.
     */
    async checkVersion() {
        try {
            const version = shell.exec('rustc --version', { silent: true }).stdout.trim();
            return version || 'Unknown';
        } catch (error) {
            return 'Unknown';
        }
    }

    getRustupCommand() {
        const platform = os.platform();
        if (platform === 'win32') {
            return 'rustup';
        } else {
            return '$HOME/.cargo/bin/rustup';
        }
    }
}