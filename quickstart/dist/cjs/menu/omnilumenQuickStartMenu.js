"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _inquirer = _interopRequireDefault(require("inquirer"));
var _chalk = _interopRequireDefault(require("chalk"));
var _core = require("@omnilumen/core");
var _quickstartConst = require("../utils/quickstartConst.js");
var _quickstartInstaller = _interopRequireDefault(require("../installers/quickstartInstaller.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, e, r, o) { var p = (0, _get2["default"])((0, _getPrototypeOf2["default"])(1 & o ? t.prototype : t), e, r); return 2 & o ? function (t) { return p.apply(r, t); } : p; } /**
 * @file omnilumenQuickStartMenu.js
 * @description Quickstart Menu for Omnilumen.
 * @module omnilumenQuickStartMenu
 * @version 1.0.0
 * @license MIT
 * @author Brian Wu
 */
var COMMON = _core.constants.COMMON;
var BaseSetupMenu = _core.setup.BaseSetupMenu;
var OmnilumenQuickStartMenu = /*#__PURE__*/function (_BaseSetupMenu) {
  function OmnilumenQuickStartMenu() {
    (0, _classCallCheck2["default"])(this, OmnilumenQuickStartMenu);
    var installerMap = (0, _defineProperty2["default"])({}, _quickstartConst.QUICKSTART_TOP_MENU.STELLAR_QUICKSTART, new _quickstartInstaller["default"]());
    return _callSuper(this, OmnilumenQuickStartMenu, [installerMap]);
  }
  (0, _inherits2["default"])(OmnilumenQuickStartMenu, _BaseSetupMenu);
  return (0, _createClass2["default"])(OmnilumenQuickStartMenu, [{
    key: "getComponents",
    value: function getComponents() {
      return [_quickstartConst.QUICKSTART_TOP_MENU.STELLAR_QUICKSTART, COMMON.EXIT];
    }
  }, {
    key: "handleComponent",
    value: function () {
      var _handleComponent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(component) {
        var quickstartInstaller, quickstartVersion, installPrompt, installer;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(component === _quickstartConst.QUICKSTART_TOP_MENU.STELLAR_QUICKSTART)) {
                _context.next = 23;
                break;
              }
              quickstartInstaller = this.installerMap[_quickstartConst.QUICKSTART_TOP_MENU.STELLAR_QUICKSTART];
              _context.next = 4;
              return quickstartInstaller.checkVersion();
            case 4:
              quickstartVersion = _context.sent.toLowerCase();
              if (!(quickstartVersion === COMMON.UNKNOWN)) {
                _context.next = 18;
                break;
              }
              console.log(_chalk["default"].red('Quick Start is not installed. Please install Quick Start first.'));
              _context.next = 9;
              return _inquirer["default"].prompt([{
                type: 'confirm',
                name: 'installQuickStart',
                message: 'Do you want to install Stellar Quick Start now?',
                "default": true
              }]);
            case 9:
              installPrompt = _context.sent;
              if (!installPrompt.installQuickStart) {
                _context.next = 15;
                break;
              }
              _context.next = 13;
              return this.showActionMenu(quickstartInstaller);
            case 13:
              _context.next = 16;
              break;
            case 15:
              process.exit(0);
            case 16:
              _context.next = 21;
              break;
            case 18:
              installer = this.installerMap[_quickstartConst.QUICKSTART_TOP_MENU.STELLAR_QUICKSTART];
              _context.next = 21;
              return this.showActionMenu(installer);
            case 21:
              _context.next = 25;
              break;
            case 23:
              _context.next = 25;
              return _superPropGet(OmnilumenQuickStartMenu, "handleComponent", this, 3)([component]);
            case 25:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function handleComponent(_x) {
        return _handleComponent.apply(this, arguments);
      }
      return handleComponent;
    }()
  }]);
}(BaseSetupMenu);
var _default = exports["default"] = OmnilumenQuickStartMenu;