/// <reference path="typings/tsd.d.ts" />
var through = require("through2");
var path = require("path");
var smartparam = require("smartparam");
var mojoActive = true;
module.exports = function (jadeTemplate, jsonObjectName, mojo) {
    /* -------------------------------------------------------------------------
    ------------------------- helper functions ----------------------------------
    --------------------------------------------------------------------------
    */
    if (mojo === void 0) { mojo = undefined; }
    if (mojo != undefined) {
        mojo.log("now prepocessing blog");
        mojoActive = true;
    }
    else {
        console.log('you do not seem to use mojo.io');
        mojo = {};
        mojo.log = function (logthis) {
            console.log(logthis);
        };
    }
    /*--------------------------------------------------------------------------
    ---------------------- returned stream --------------------------------------
    --------------------------------------------------------------------------
    */
    return through.obj(function (file, enc, cb) {
        var jsonString, localNameStore;
        if (file.isNull() === true) {
            cb(null, file);
            return;
        }
        if (file.isStream()) {
            mojo.log("streaming not supported");
            return;
        }
        //make sure we make the json data available through the file.data object
        jsonString = String(file.contents);
        //create file.data in case it doesn't exist
        smartparam(file, 'data');
        //make mojo settings available for jade through mojo.something
        if (mojoActive) {
            file.data.mojo = mojo.settings;
        }
        //make blog data available for jade through data.blog
        mojo.log('jsondata will be appended to file.data.' + jsonObjectName);
        file.data[jsonObjectName] = JSON.parse(jsonString);
        // now that we have the original json moved to file.data we replace file.contents
        file.contents = new Buffer(jadeTemplate.content);
        // for jade to work properly we also have to update the file.path so that
        // extends and includes from the template will work.
        localNameStore = path.parse(file.path).name;
        file.base = jadeTemplate.base;
        file.path = jadeTemplate.base + "/" + localNameStore;
        //run callback function to signal end of plugin process.
        return cb(null, file);
    });
};
