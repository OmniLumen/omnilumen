"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _ora = _interopRequireDefault(require("ora"));
var _shelljs = _interopRequireDefault(require("shelljs"));
var _core = require("@omnilumen/core");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /**
 * @file quickstartInstaller.js
 * @description Quickstart installer for Omnilumen.
 * @module QuickstartInstaller
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */
var listImageTags = _core.setup.listImageTags,
  displayImageTagsTable = _core.setup.displayImageTagsTable,
  displayInstallerVersion = _core.setup.displayInstallerVersion,
  runShellCommand = _core.setup.runShellCommand,
  OmnilumenInstaller = _core.setup.OmnilumenInstaller;
var TAG = _core.constants.TAG;
/**
 * Class representing a Quickstart Installer.
 * @extends OmnilumenInstaller
 */
var QuickStartInstaller = exports["default"] = /*#__PURE__*/function (_OmnilumenInstaller) {
  /**
   * Create a Quickstart instance.
   */
  function QuickStartInstaller() {
    (0, _classCallCheck2["default"])(this, QuickStartInstaller);
    return _callSuper(this, QuickStartInstaller);
  }

  /**
   * Installs Stellar Quickstart by pulling the latest Docker image.
   * Works on Windows, macOS, and Unix-like systems.
   */
  (0, _inherits2["default"])(QuickStartInstaller, _OmnilumenInstaller);
  return (0, _createClass2["default"])(QuickStartInstaller, [{
    key: "install",
    value: (function () {
      var _install = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var spinner;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              spinner = (0, _ora["default"])('Installing Stellar Quickstart...').start();
              _context.prev = 1;
              _context.next = 4;
              return runShellCommand('docker pull stellar/quickstart:latest', spinner);
            case 4:
              spinner.succeed('Stellar Quickstart installed successfully.');

              // Display the list of Docker images
              _context.next = 7;
              return displayInstallerVersion(this);
            case 7:
              _context.next = 12;
              break;
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              spinner.fail("Stellar Quickstart installation failed: ".concat(_context.t0.message));
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[1, 9]]);
      }));
      function install() {
        return _install.apply(this, arguments);
      }
      return install;
    }()
    /**
     * Updates Stellar Quickstart to the specified version by pulling the Docker image.
     * If no version is specified, it defaults to 'latest'.
     *
     * @param {string} [version='latest'] - The version of the Stellar Quickstart Docker image to update to.
     * @returns {Promise<void>} Resolves when the update is complete, or throws an error if it fails.
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var version,
          spinner,
          containersUsingImage,
          _iterator,
          _step,
          containerId,
          imagesToRemove,
          _iterator2,
          _step2,
          oldVersion,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              version = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 'latest';
              spinner = (0, _ora["default"])("Updating Quickstart to version ".concat(version, "...")).start();
              _context2.prev = 2;
              _context2.next = 5;
              return runShellCommand("docker pull stellar/quickstart:".concat(version), spinner);
            case 5:
              spinner.succeed("Quickstart updated to version ".concat(version, " successfully."));

              // Get the list of running containers using the stellar/quickstart image
              containersUsingImage = _shelljs["default"].exec("docker ps -q --filter ancestor=stellar/quickstart", {
                silent: true
              }).stdout.split('\n').filter(function (id) {
                return id;
              }); // Stop and remove any running containers using the image
              _iterator = _createForOfIteratorHelper(containersUsingImage);
              _context2.prev = 8;
              _iterator.s();
            case 10:
              if ((_step = _iterator.n()).done) {
                _context2.next = 20;
                break;
              }
              containerId = _step.value;
              spinner.info("Stopping container ".concat(containerId, " using stellar/quickstart image..."));
              _context2.next = 15;
              return runShellCommand("docker stop ".concat(containerId), spinner);
            case 15:
              _context2.next = 17;
              return runShellCommand("docker rm ".concat(containerId), spinner);
            case 17:
              spinner.succeed("Stopped and removed container ".concat(containerId, "."));
            case 18:
              _context2.next = 10;
              break;
            case 20:
              _context2.next = 25;
              break;
            case 22:
              _context2.prev = 22;
              _context2.t0 = _context2["catch"](8);
              _iterator.e(_context2.t0);
            case 25:
              _context2.prev = 25;
              _iterator.f();
              return _context2.finish(25);
            case 28:
              // Remove any previous versions except the current one
              imagesToRemove = _shelljs["default"].exec('docker images stellar/quickstart --format "{{.Tag}}"', {
                silent: true
              }).stdout.split('\n').map(function (tag) {
                return tag.trim();
              }).filter(function (tag) {
                return tag && tag !== version;
              });
              _iterator2 = _createForOfIteratorHelper(imagesToRemove);
              _context2.prev = 30;
              _iterator2.s();
            case 32:
              if ((_step2 = _iterator2.n()).done) {
                _context2.next = 39;
                break;
              }
              oldVersion = _step2.value;
              _context2.next = 36;
              return runShellCommand("docker rmi -f stellar/quickstart:".concat(oldVersion), spinner);
            case 36:
              // Use -f to force remove
              spinner.succeed("Removed old version: stellar/quickstart:".concat(oldVersion));
            case 37:
              _context2.next = 32;
              break;
            case 39:
              _context2.next = 44;
              break;
            case 41:
              _context2.prev = 41;
              _context2.t1 = _context2["catch"](30);
              _iterator2.e(_context2.t1);
            case 44:
              _context2.prev = 44;
              _iterator2.f();
              return _context2.finish(44);
            case 47:
              _context2.next = 49;
              return displayInstallerVersion(this);
            case 49:
              _context2.next = 54;
              break;
            case 51:
              _context2.prev = 51;
              _context2.t2 = _context2["catch"](2);
              spinner.fail("Quickstart update failed: ".concat(_context2.t2.message));
            case 54:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[2, 51], [8, 22, 25, 28], [30, 41, 44, 47]]);
      }));
      function update() {
        return _update.apply(this, arguments);
      }
      return update;
    }()
    /**
     * Uninstalls Stellar Quickstart by removing the Docker container and image.
     * Provides user feedback via a spinner during the process.
     *
     * @returns {Promise<void>} Resolves when the uninstallation is complete, or throws an error if it fails.
     */
    )
  }, {
    key: "uninstall",
    value: (function () {
      var _uninstall = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var spinner, removeImagesCommand;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              spinner = (0, _ora["default"])('Uninstalling Stellar Quickstart...').start();
              _context3.prev = 1;
              _context3.next = 4;
              return runShellCommand('docker rm -f stellar', spinner);
            case 4:
              // Remove the Stellar Quickstart Docker image
              removeImagesCommand = 'docker images stellar/quickstart --format "{{.Repository}}:{{.Tag}}" | xargs -r docker rmi';
              _context3.next = 7;
              return runShellCommand(removeImagesCommand, spinner);
            case 7:
              spinner.succeed('Stellar Quickstart uninstalled successfully.');
              _context3.next = 10;
              return displayInstallerVersion(this);
            case 10:
              _context3.next = 15;
              break;
            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](1);
              if (_context3.t0.message.includes('No such container') || _context3.t0.message.includes('No such image')) {
                spinner.succeed('Stellar Quickstart was already uninstalled.');
              } else {
                spinner.fail("Stellar Quickstart uninstallation failed: ".concat(_context3.t0.message));
              }
            case 15:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[1, 12]]);
      }));
      function uninstall() {
        return _uninstall.apply(this, arguments);
      }
      return uninstall;
    }()
    /**
     * Get available Rust versions.
     * @returns {Promise<string>} - The available versions.
     */
    )
  }, {
    key: "getAvailableVersions",
    value: (function () {
      var _getAvailableVersions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var spinner, versions;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              spinner = (0, _ora["default"])('Fetching available quickstart tags...').start();
              _context4.prev = 1;
              _context4.next = 4;
              return listImageTags('stellar/quickstart', 20);
            case 4:
              versions = _context4.sent;
              spinner.succeed('Fetched available quickstart versions successfully.');
              return _context4.abrupt("return", versions);
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](1);
              spinner.fail("Failed to fetch available quickstart tags: ".concat(_context4.t0.message));
              throw _context4.t0;
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[1, 9]]);
      }));
      function getAvailableVersions() {
        return _getAvailableVersions.apply(this, arguments);
      }
      return getAvailableVersions;
    }()
    /**
     * display available Rust versions.
     * @returns {Promise<string>} - The available versions.
     */
    )
  }, {
    key: "displayVersionTags",
    value: (function () {
      var _displayVersionTags = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(tags) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return displayImageTagsTable(tags, [25, 25, 25, 25]);
            case 3:
              _context5.next = 8;
              break;
            case 5:
              _context5.prev = 5;
              _context5.t0 = _context5["catch"](0);
              throw _context5.t0;
            case 8:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 5]]);
      }));
      function displayVersionTags(_x) {
        return _displayVersionTags.apply(this, arguments);
      }
      return displayVersionTags;
    }()
    /**
     * get the component tag type.
     * @throws {Error} Method not implemented.
     */
    )
  }, {
    key: "tagType",
    value: (function () {
      var _tagType = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", TAG.IMAGE);
            case 1:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function tagType() {
        return _tagType.apply(this, arguments);
      }
      return tagType;
    }()
    /**
     * Checks and displays the version of the installed Stellar Quickstart Docker image.
     *
     * @returns {Promise<string>} Resolves to the version and tag information, or 'Unknown' if not found.
     */
    )
  }, {
    key: "checkVersion",
    value: (function () {
      var _checkVersion = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var command, versionOutput;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              // Command to get the repository and tag for the Stellar Quickstart image
              command = "docker images stellar/quickstart --format \"{{.Repository}}:{{.Tag}}\"";
              versionOutput = _shelljs["default"].exec(command, {
                silent: true
              }).stdout.trim(); // Check if versionOutput is not empty
              if (!versionOutput) {
                _context7.next = 8;
                break;
              }
              console.log(versionOutput); // Display the repository and tag
              return _context7.abrupt("return", versionOutput);
            case 8:
              return _context7.abrupt("return", 'Unknown');
            case 9:
              _context7.next = 15;
              break;
            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](0);
              console.error('Error fetching version:', _context7.t0);
              return _context7.abrupt("return", 'Unknown');
            case 15:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 11]]);
      }));
      function checkVersion() {
        return _checkVersion.apply(this, arguments);
      }
      return checkVersion;
    }()
    /**
     * Checks if the Stellar Quickstart container is running using Docker.
     * @returns {Promise<boolean>} Resolves to true if the container is running, otherwise resolves to false.
     */
    )
  }, {
    key: "isQuickstartRunning",
    value: (function () {
      var _isQuickstartRunning = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        var spinner, command, result;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              spinner = (0, _ora["default"])('Checking if Stellar Quickstart is running...').start();
              _context8.prev = 1;
              command = 'docker ps -a --filter "ancestor=stellar/quickstart" --filter "status=running" --format "{{.Names}}"';
              _context8.next = 5;
              return runShellCommand(command, spinner);
            case 5:
              result = _context8.sent;
              if (!result) {
                _context8.next = 11;
                break;
              }
              spinner.succeed('Stellar Quickstart container is running.');
              return _context8.abrupt("return", true);
            case 11:
              throw new Error('Stellar Quickstart container is not running.');
            case 12:
              _context8.next = 23;
              break;
            case 14:
              _context8.prev = 14;
              _context8.t0 = _context8["catch"](1);
              if (!_context8.t0.message.includes('not running')) {
                _context8.next = 21;
                break;
              }
              spinner.succeed('Stellar Quickstart container is not running.');
              return _context8.abrupt("return", false);
            case 21:
              spinner.fail("Failed to check Stellar Quickstart container: ".concat(_context8.t0.message));
              return _context8.abrupt("return", false);
            case 23:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[1, 14]]);
      }));
      function isQuickstartRunning() {
        return _isQuickstartRunning.apply(this, arguments);
      }
      return isQuickstartRunning;
    }())
  }]);
}(OmnilumenInstaller);