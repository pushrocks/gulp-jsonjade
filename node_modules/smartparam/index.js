/// <reference path="typings/tsd.d.ts" />
var bl = require("beautylog")("os");
/**
 * takes a parent object and a child object and adds it in smart ways.
 * @param parentObject parent Object
 * @param childParam child object to add
 * @param action defines the way in which the param is added
 * @param logBool {boolean} turns on logging
 * @returns {boolean} return true if something changes (like param is added), returns false in case nothing changes
 */
var smartparam = {};
/**
 * adds an obejct to the parent object if it doesn't exists
 * @param parentObject
 * @param childParam
 * @param logBool
 * @returns {boolean}
 */
smartparam.smartAdd = function (parentObject, childParam, logBool) {
    if (parentObject.hasOwnProperty(childParam)) {
        if (logBool)
            bl.log("param " + childParam + " exists! Nothing changes!");
        return false;
    }
    else {
        if (logBool)
            bl.log('param does not exist, so we make it!');
        parentObject[childParam] = {};
        return true;
    }
};
/**
 * checks if in object has a parameter with a given key name, returns true if yes.
 * @param parentObject
 * @param childParam
 * @returns {boolean}
 */
smartparam.exists = function (parentObject, childParam) {
    if (parentObject.hasOwnProperty(childParam)) {
        return true;
    }
    return false;
};
module.exports = smartparam;
