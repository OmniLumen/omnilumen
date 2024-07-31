/**
 * @file omnilumenInstaller.js
 * @description Base class for Omnilumen installers.
 * @module OmnilumenInstaller
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */
import shell from 'shelljs';
import { exec } from 'child_process';

class OmnilumenInstaller {
    /**
     * Install the component.
     * @throws {Error} Method not implemented.
     */
    async install() {
        throw new Error('Method not implemented.');
    }

    /**
     * Update the component.
     * @param {string} [version='latest'] - The version to update.
     * @throws {Error} Method not implemented.
     */
    async update(version = 'latest') {
        throw new Error('Method not implemented.');
    }

    /**
     * Uninstall the component.
     * @throws {Error} Method not implemented.
     */
    async uninstall() {
        throw new Error('Method not implemented.');
    }

    /**
     * Get available versions from a repository.
     * @throws {Error} Method not implemented.
     */
    async getAvailableVersions() {
        throw new Error('Method not implemented.');
    }

    /**
     * Check the currently installed version.
     * @throws {Error} Method not implemented.
     */
    async checkVersion() {
        throw new Error('Method not implemented.');
    }

    /**
     * Run a shell command.
     * @param {string} command - The command to run.
     * @returns {Promise<string>} - The command output.
     */
    async runCommand(command) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdout.trim());
                }
            });
        });
    }
    /**
     * Run a shell command.
     * @returns {Promise<string>} - The command output.
     */

    async runShellCommand(command, spinner) {
        return new Promise((resolve, reject) => {
            shell.exec(command, { silent: true }, (code, stdout, stderr) => {
                if (code !== 0) {
                    spinner.fail(`Command failed: ${command}\n${stderr || 'Unknown error'}`);
                    return reject(new Error(stderr || 'Command failed'));
                }
                spinner.text = `${command} completed successfully.`;
                resolve(stdout.trim());
            });

            // Simulate dynamic spinner updates
            setTimeout(() => {
                spinner.color = 'yellow';
                spinner.text = 'Loading components...';
            }, 1000);

            setTimeout(() => {
                spinner.color = 'green';
                spinner.text = 'Finalizing setup...';
            }, 2000);
        });
    }
}

export default OmnilumenInstaller;