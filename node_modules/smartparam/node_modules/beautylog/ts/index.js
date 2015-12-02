/// <reference path="./typings/tsd.d.ts" />
/// <reference path="./console.os.ts" />
/// <reference path="./console.browser.ts" />
var beautylog = function (logPlatform) {
    if (logPlatform === void 0) { logPlatform = "os"; }
    switch (logPlatform) {
        case "os":
            var beautylogOs = BeautylogOS.init();
            return beautylogOs;
            break;
        case "browser":
            var beautylogBrowser = BeautylogBrowser.init();
            return beautylogBrowser;
            break;
        default:
            console.log("something is strage about the way you required beautylog");
            break;
    }
};
module.exports = beautylog;
//# sourceMappingURL=index.js.map