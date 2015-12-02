/// <reference path="typings/tsd.d.ts" />
var smartparam = require("./index.js");
var bl = require("beautylog")("os");
bl.log('now starting tests');
//construct test objects
var parentObject = {};
var childObject = {};
var existsTest1 = function () {
    if (!smartparam.exists(parentObject, "childObject")) {
        bl.success("childObject is not a child of parentObject at this time. " +
            "Perfect!");
    }
    else {
        bl.error("childObject should not be a child of parentObject at this time." +
            "It seems something is wrong");
        process.exit(1);
    }
    ;
};
existsTest1();
bl.info('now adding childObject as child of parentObject!');
parentObject.childObject = childObject;
var existsTest2 = function () {
    if (smartparam.exists(parentObject, "childObject")) {
        bl.success("childObject is a child of parentObject at this time. " +
            "Perfect!");
    }
    else {
        bl.error("childObject should be a child of parentObject at this time. " +
            "It seems something is wrong");
        process.exit(1);
    }
    ;
};
existsTest2();
bl.ok("No more tests!");
bl.success("Tests completed successfully!");
