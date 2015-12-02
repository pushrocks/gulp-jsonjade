/// <reference path="./index.ts" />
var BeautylogOS;
(function (BeautylogOS) {
    function init() {
        var colors = require("colors");
        var clc = require("cli-color");
        var beautylogOS = {};
        /**
         * object to append to all locally used params
         * @type {{}}
         */
        var localBl;
        localBl = {};
        localBl.dirPrefix = clc.bgXterm(39).xterm(231).bold(' DIR ') + ' ';
        localBl.errorPrefix = ' Error: '.bgRed.white.bold + ' ';
        localBl.infoPrefix = clc.bgXterm(198).xterm(231).bold(' INFO ') + ' ';
        localBl.normalPrefix = ' Log: '.bgCyan.white.bold + ' ';
        localBl.okPrefix = ' '.bgGreen + ' OK! '.bgBlack.green.bold + ' ';
        localBl.successPrefix = ' Success: '.bgGreen.white.bold + ' ';
        localBl.warnPrefix = ' '.bgYellow + ' Warn: '.bgBlack.yellow.bold + ' ';
        /**
         *
         * @param logText
         * @param logType
         * @returns {boolean}
         */
        beautylogOS.log = function (logText, logType) {
            if (logText === void 0) { logText = 'empty log'; }
            if (logType === void 0) { logType = 'normal'; }
            try {
                switch (logType) {
                    case 'dir':
                        logText = localBl.dirPrefix + clc.xterm(26)(logText);
                        break;
                    case 'error':
                        logText = localBl.errorPrefix + logText.red.bold;
                        break;
                    case 'info':
                        logText = localBl.infoPrefix + clc.xterm(198)(logText);
                        break;
                    case 'normal':
                        logText = localBl.normalPrefix + logText.cyan.bold;
                        break;
                    case 'ok':
                        logText = localBl.okPrefix + logText.bold;
                        break;
                    case 'success':
                        logText = localBl.successPrefix + logText.green.bold;
                        break;
                    case 'warn':
                        logText = localBl.warnPrefix + logText.bold;
                        break;
                    default:
                        logText.blue.bold;
                        console.log(('unknown logType for "' + logText + '"').red.bold);
                }
                console.log(logText);
                return true;
            }
            catch (error) {
                console.log(localBl.errorPrefix + 'You seem to have tried logging something strange'.red.bold + error);
                return false;
            }
        };
        /**
         * logs an directory to console
         * @param logText
         * @returns {boolean}
         */
        beautylogOS.dir = function (logText) {
            return beautylogOS.log(logText, 'dir');
        };
        /**
         * logs an error to console
         * @param logText
         * @returns {boolean}
         */
        beautylogOS.error = function (logText) {
            return beautylogOS.log(logText, 'error');
        };
        /**
         * logs an info to console
         * @param logText
         * @returns {boolean}
         */
        beautylogOS.info = function (logText) {
            return beautylogOS.log(logText, 'info');
        };
        /**
         * logs an 'OK!' message to console
         * @param logText
         * @returns {boolean}
         */
        beautylogOS.ok = function (logText) {
            return beautylogOS.log(logText, 'ok');
        };
        /**
         * logs a success to console
         * @param logText string to log as error
         * @returns {boolean}
         */
        beautylogOS.success = function (logText) {
            return beautylogOS.log(logText, 'success');
        };
        /**
         * logs a 'warn:' message to console
         * @param logText string to log as error
         * @returns {boolean}
         */
        beautylogOS.warn = function (logText) {
            return beautylogOS.log(logText, 'warn');
        };
        return beautylogOS;
    }
    BeautylogOS.init = init;
})(BeautylogOS || (BeautylogOS = {}));
//# sourceMappingURL=console.os.js.map