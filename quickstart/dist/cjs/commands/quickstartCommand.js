"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startTestnetNode = exports.startTestNetPersistentNode = exports.startLocalNetwork = exports.startFutureNetPersistentNode = exports.startFutureNetNode = exports.quickstartCommands = exports.processCustomCommand = exports.getVolumeOption = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _core = require("@omnilumen/core");
var _os = _interopRequireDefault(require("os"));
var _path = _interopRequireDefault(require("path"));
var _quickstartConst = require("../utils/quickstartConst.js");
/**
 * @file quickstartCommand.js
 * @description Quickstart Command for Omnilumen.
 * @module quickstartCommand
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */

var executeShellCommand = _core.setup.executeShellCommand;
var startDockerContainer = _core.utils.startDockerContainer,
  removeExistingContainer = _core.utils.removeExistingContainer,
  stopContainersByImageName = _core.utils.stopContainersByImageName;

/**
 * Starts a local development/test network with customizable settings.
 * @param {Array} customArgs - Additional custom arguments provided by the user.
 */
var startLocalNetwork = exports.startLocalNetwork = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(customArgs) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // Stop and remove the existing container if it exists
          removeExistingContainer(_quickstartConst.STELLAR_CONTAINER_NAME);
          _context.next = 3;
          return startDockerContainer(customArgs, '--local', _quickstartConst.STELLAR_CONTAINER_NAME, 'stellar/quickstart', '');
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function startLocalNetwork(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Starts a futurenet node with customizable settings.
 * @param {Array} customArgs - Additional custom arguments provided by the user.
 */
var startFutureNetNode = exports.startFutureNetNode = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(customArgs) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          removeExistingContainer(_quickstartConst.STELLAR_CONTAINER_NAME);
          _context2.next = 3;
          return startDockerContainer(customArgs, '--futurenet', _quickstartConst.STELLAR_CONTAINER_NAME, 'stellar/quickstart', '');
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function startFutureNetNode(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Starts a persistent futurenet node with customizable settings.
 * @param {Array} customArgs - Additional custom arguments provided by the user.
 */
var startFutureNetPersistentNode = exports.startFutureNetPersistentNode = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(customArgs) {
    var volumeOption;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          removeExistingContainer(_quickstartConst.STELLAR_CONTAINER_PERSISTENT_NAME);
          // Determine the default volume directory based on the network type
          volumeOption = getVolumeOption('--futurenet');
          _context3.next = 4;
          return startDockerContainer(customArgs, '--futurenet', _quickstartConst.STELLAR_CONTAINER_PERSISTENT_NAME, 'stellar/quickstart', volumeOption);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function startFutureNetPersistentNode(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Starts a testnet node with customizable settings.
 * @param {Array} customArgs - Additional custom arguments provided by the user.
 */
var startTestnetNode = exports.startTestnetNode = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(customArgs) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          removeExistingContainer(_quickstartConst.STELLAR_CONTAINER_NAME);
          _context4.next = 3;
          return startDockerContainer(customArgs, '--testnet', _quickstartConst.STELLAR_CONTAINER_NAME, 'stellar/quickstart', '');
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function startTestnetNode(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Starts a persistent testnet node with customizable settings.
 * @param {Array} customArgs - Additional custom arguments provided by the user.
 */
var startTestNetPersistentNode = exports.startTestNetPersistentNode = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(customArgs) {
    var volumeOption;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          removeExistingContainer(_quickstartConst.STELLAR_CONTAINER_PERSISTENT_NAME);
          // Determine the default volume directory based on the network type
          volumeOption = getVolumeOption('--testnet');
          _context5.next = 4;
          return startDockerContainer(customArgs, '--testnet', _quickstartConst.STELLAR_CONTAINER_PERSISTENT_NAME, 'stellar/quickstart', volumeOption);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function startTestNetPersistentNode(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Processes custom Docker commands or general commands from the user.
 * @param {Array} args - The command line arguments provided by the user.
 */
var processCustomCommand = exports.processCustomCommand = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(args) {
    var reconstructedCommand, hasDockerRun, networkOptions, hasNetworkOption, dockerCommand;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          reconstructedCommand = args.map(function (arg) {
            // Add quotes if the argument contains spaces, semicolons, or ampersands
            if (arg.includes(' ') || arg.includes(';') || arg.includes('&')) {
              return "\"".concat(arg, "\"");
            }
            return arg;
          }).join(' ');
          hasDockerRun = reconstructedCommand.startsWith('docker run');
          networkOptions = ['--pubnet', '--testnet', '--futurenet', '--local'];
          hasNetworkOption = networkOptions.some(function (option) {
            return reconstructedCommand.includes(option);
          });
          if (!hasNetworkOption) {
            console.error('Error: You must provide one of the network options: --pubnet, --testnet, --futurenet or --local.');
            process.exit(1);
          }

          // Stop containers running the `stellar/quickstart` image before executing the new command
          stopContainersByImageName(_quickstartConst.STELLAR_QUICK_START_IMAGE);
          dockerCommand = hasDockerRun ? reconstructedCommand // Use the full command as provided by the user
          : "docker run ".concat(reconstructedCommand); // Prepend "docker run" if not provided
          console.log("Executing:", dockerCommand);
          _context6.next = 10;
          return executeShellCommand(dockerCommand);
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function processCustomCommand(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Function to determine the appropriate volume directory and options based on the network type.
 * @param {string} networkOption - The network option to pass to the quickstart (e.g., --testnet, --pubnet).
 * @returns {string} - The Docker volume option string (e.g., `-v "/path:/opt/stellar"`).
 */
var getVolumeOption = exports.getVolumeOption = function getVolumeOption(networkOption) {
  var defaultDirName;
  if (networkOption === '--testnet') {
    defaultDirName = '.stellar-testnet';
  } else if (networkOption === '--futurenet') {
    defaultDirName = '.stellar-futurenet';
  } else if (networkOption === '--pubnet') {
    defaultDirName = '.stellar-mainnet';
  } else if (networkOption === '--pubnet') {
    defaultDirName = '.stellar-local';
  } else {
    throw new Error('Invalid network option. Use --local or --futurenet or --testnet or --pubnet.');
  }

  // Determine the default volume directory based on the user's home directory
  var defaultVolumeDir = _path["default"].join(_os["default"].homedir(), defaultDirName);

  // Return the Docker volume option string
  return "-v \"".concat(defaultVolumeDir, ":/opt/stellar\"");
};
var quickstartCommands = exports.quickstartCommands = [{
  command: 'start-local',
  aliases: ['local', 'up'],
  description: 'Start a local development network',
  example: 'sqs local (OR) sqs up'
}, {
  command: 'start-futurenet',
  aliases: ['future', 'fn'],
  description: 'Start a futurenet node',
  example: 'sqs future (OR) sqs fn'
}, {
  command: 'start-futurenet-persistent',
  aliases: ['futurenet-persist', 'future-persist', 'fn-persist', 'fnp'],
  description: 'Start a persistent futurenet node',
  example: 'sqs futurenet-persist (OR) sqs fnp'
}, {
  command: 'start-testnet',
  aliases: ['tn'],
  description: 'Start a testnet node',
  example: 'sqs tn'
}, {
  command: 'start-testnet-persistent',
  aliases: ['testnet-persist', 'tn-persist', 'tnp'],
  description: 'Start a persistent testnet node',
  example: 'sqs testnet-persist (OR) sqs tnp'
}, {
  command: 'shutdown',
  aliases: ['down'],
  description: 'Shutdown a running Stellar Quickstart container',
  example: 'sqs down'
},
// Default/custom commands
{
  command: 'docker run',
  aliases: ['docker run'],
  description: 'Run a custom Docker command',
  example: 'sqs docker run -p 8000:8000 stellar/quickstart --local'
}];