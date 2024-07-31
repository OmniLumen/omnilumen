/**
 * @file InstallerFactory.js
 * @description Factory for creating Omnilumen installers.
 * @module InstallerHandler
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */

import RustInstaller from './rustInstaller.js';
import StellarCliInstaller from './stellarCliInstaller.js';

export default class InstallerHandler {
    /**
     * Create an installer instance based on the component type.
     * @param {string} componentType - The type of the component.
     * @returns {OmnilumenInstaller} - The installer instance.
     * @throws {Error} Unknown component type.
     */
    static createInstaller(componentType) {
        switch (componentType) {
            case 'rust':
                return new RustInstaller();
            case 'stellar-cli':
                return new StellarCliInstaller();
            default:
                throw new Error('Unknown component type');
        }
    }
}