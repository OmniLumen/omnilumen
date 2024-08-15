#!/usr/bin/env node
import { execSync } from 'child_process';
import Table from 'cli-table3';
import prompts from 'prompts';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJsonPath = join(__dirname, '../package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

function getPackageVersion(packageName) {
    try {
        const version = execSync(`npm ls -g ${packageName} --depth=0 --json`, { stdio: 'pipe' });
        const parsedVersion = JSON.parse(version).dependencies[packageName].version;
        return parsedVersion || 'version not found';
    } catch (error) {
        return 'not installed';
    }
}
async function main() {
    // Fetch versions of installed packages
    const cliVersion = getPackageVersion('@omnilumen/cli');
    const quickstartVersion = getPackageVersion('@omnilumen/quickstart');
    const omnilumenVersion = packageJson.version;

    // Create a table to display the versions
    const table = new Table({
        head: ['Package', 'Version'],
        colWidths: [30, 30],  // Set column widths (in characters)
        style: {
            head: ['cyan'],
            border: ['gray'],
            'padding-left': 2,   // Increase padding
            'padding-right': 2
        }
    });

    table.push(
        ['omnilumen', omnilumenVersion],
        ['omnilumen-cli', cliVersion],
        ['omnilumen-quickstart', quickstartVersion]
    );

    // Print the table
    console.log('OmniLumen has been successfully installed.');
    console.log(table.toString());

    // Prompt the user to select a package
    const response = await prompts({
        type: 'select',
        name: 'command',
        message: 'Which tool would you like to use?',
        choices: [
            { title: 'OmniLumen CLI', value: 'omnilumen-cli' },
            { title: 'OmniLumen Quickstart', value: 'omnilumen-quickstart' },
            { title: 'Exit', value: 'exit' }
        ]
    });

    // Execute the selected command
    if (response.command === 'omnilumen-cli') {
        execSync('omnilumen-cli', { stdio: 'inherit' });
    } else if (response.command === 'omnilumen-quickstart') {
        execSync('omnilumen-quickstart', { stdio: 'inherit' });
    } else {
        console.log('Exiting OmniLumen.');
    }
}

main().catch(error => console.error(error));

