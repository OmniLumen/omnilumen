import { strict as assert } from 'assert';
import sinon from 'sinon';
import StellarCliInstaller from '../src/installers/stellarCliInstaller.js'
import { setup } from '@omnilumen/core';
import os from 'os';

describe('StellarCliInstaller', () => {
    let installer;
    let mockShell, mockOs, mockOra, mockSetup;
    let sandbox;
  
    beforeEach(() => {
      // Create a sandbox for sinon to mock methods safely
      sandbox = sinon.createSandbox();
  
      // Mock the external dependencies
      mockShell = {
        exec: sandbox.stub().returns({ stdout: '' }),  // Mock shell.exec with a fake result
      };
  
      mockOs = {
        platform: sandbox.stub().returns('linux'),  // Mock the OS platform as Linux
      };
  
      // Mock ora() to return an object with start, succeed, and fail methods
      mockOra = sandbox.stub().returns({
        start: sandbox.stub().returns({
          succeed: sandbox.fake(),
          fail: sandbox.fake(),
        }),
      });
  
      // Mock setup.runShellCommand to simulate command execution
      mockSetup = {
        runShellCommand: sandbox.stub().resolves(),  // Simulate successful command execution
      };
  
      // Initialize the RustInstaller instance with the mocked dependencies
      installer = new StellarCliInstaller({
        shell: mockShell,
        os: mockOs,
        ora: mockOra,
        setup: mockSetup,
      });
    });
  
    afterEach(() => {
      // Restore the sandbox to avoid side effects in other tests
      sandbox.restore();
    });
  
    it('should create an instance of StellarCliInstaller', () => {
      assert.ok(installer); // Check that the instance is created
    });
  });
  