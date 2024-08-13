// stellarQuickstartMenu.js
import inquirer from 'inquirer';
import chalk from 'chalk';
import {constants, setup} from '@omnilumen/core';
import {QUICKSTART_TOP_MENU} from "../utils/quickstartConst.js";
import QuickStartInstaller from "../installers/quickstartInstaller.js";

const { COMMON } = constants;
const { BaseSetupMenu } = setup;

class OmnilumenQuickStartMenu extends BaseSetupMenu {

    constructor() {
        const installerMap = {
            // [QUICKSTART_TOP_MENU.DOCKER]: new DockerInstaller(),
            [QUICKSTART_TOP_MENU.STELLAR_QUICKSTART]: new QuickStartInstaller()
        };
        super(installerMap);
    }

    getComponents() {
        return [QUICKSTART_TOP_MENU.STELLAR_QUICKSTART, COMMON.EXIT];
    }

    async handleComponent(component) {
        if (component === QUICKSTART_TOP_MENU.STELLAR_QUICKSTART) {
            const quickstartInstaller = this.installerMap[QUICKSTART_TOP_MENU.STELLAR_QUICKSTART];
            const quickstartVersion = (await quickstartInstaller.checkVersion()).toLowerCase();
            if (quickstartVersion === COMMON.UNKNOWN) {
                console.log(chalk.red('Quick Start is not installed. Please install Quick Start first.'));
                const installPrompt = await inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'installQuickStart',
                        message: 'Do you want to install Stellar Quick Start now?',
                        default: true,
                    }
                ]);
                if (installPrompt.installQuickStart) {
                    await this.showActionMenu(quickstartInstaller);
                } else {
                    process.exit(0);
                }
            } else {
                const installer = this.installerMap[QUICKSTART_TOP_MENU.STELLAR_QUICKSTART];
                await this.showActionMenu(installer);
            }
        } else {
            await super.handleComponent(component);
        }
    }
}

export default OmnilumenQuickStartMenu;
