/**
 * @file StellarCliInstaller.js
 * @description Stellar CLI installer for Omnilumen.
 * @module StellarCliInstaller
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */
import OmnilumenInstaller from './omnilumenInstaller.js';
import {getVersionTags} from "../libs/versionToolkit.js";


export default class StellarCliInstaller extends OmnilumenInstaller {
    /**
     * Install Stellar CLI.
     */
    async install() {
        await this.runCommand('cargo install --locked stellar-cli --features opt');
    }

    /**
     * Update Stellar CLI.
     * @param {string} [version='latest'] - The version to update.
     */
    async update(version = 'latest') {
        await this.install(version); // Same as install
    }

    /**
     * Uninstall Stellar CLI.
     */
    async uninstall() {
        await this.runCommand('cargo uninstall stellar-cli');
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
            return await this.runCommand('stellar --version');
        } catch (error) {
            return 'Unknown';
        }
    }
}