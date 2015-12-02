/// <reference path="./typings/tsd.d.ts" />
var beautyLogOs = require('./index.js')("os");
var beautyLogBrowser = require("./index.js")("browser");

console.log('*** start test ***');
console.log ('');

console.log('declarative function calls:');
beautyLogOs.log('beautylog.log(), with normal logText, without logType');
beautyLogOs.dir('beautylog.dir(), with normal logText, without logType');
beautyLogOs.error('beautylog.error(), with normal logText, without logType');
beautyLogOs.info('beautylog.dir(), with normal logText, without logType');
beautyLogOs.ok('beautylog.ok(), with normal logText, without logType');
beautyLogOs.success('beautylog.success(), with normal logText, without logType');
beautyLogOs.warn('beautylog.warn(), with normal logText, without logType');

console.log('');

console.log('logType String:');
beautyLogOs.log('beautylog.log(), with normal logText, without logType');
beautyLogOs.log('beautylog.log(), with normal logText, with logType "dir"','dir');
beautyLogOs.log('beautylog.log(), with normal logText, with logType "error"','error');
beautyLogOs.log('beautylog.log(), with normal logText, with logType "info"','info');
beautyLogOs.log('beautylog.log(), with normal logText, with logType "ok"','ok');
beautyLogOs.log('beautylog.log(), with normal logText, with logType "success"','success');
beautyLogOs.log('beautylog.log(), with normal logText, with logType "warn"','warn');

console.log ('');
console.log('*** end test ***');

console.log("start test of beautylog browser module (Might look weird in is console...)");
beautyLogBrowser.log("hello");