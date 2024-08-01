import os from 'os';

export const isWindows = () => {
    return os.platform() === 'win32';
}