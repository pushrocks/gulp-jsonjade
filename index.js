/// <reference path="typings/tsd.d.ts" />
var gutil = require("gulp-util");
var through = require("through2");
var path = require("path");
var smartparam = require("smartparam");
module.exports = function (jadeTemplate, jsonObjectName) {
    return through.obj(function (file, enc, cb) {
        var jsonString, localNameStore;
        if (file.isNull() === true) {
            cb(null, file);
            return;
        }
        if (file.isStream()) {
            console.log("streaming not supported");
            return;
        }
        jsonString = String(file.contents); //store current file contents as string
        smartparam.smartAdd(file, 'data'); //create file.data in case it doesn't exist
        file.data[jsonObjectName] = JSON.parse(jsonString); //make data available for jade through data.[jsonObjectName]
        file.contents = new Buffer(jadeTemplate.content); //replace file.contents
        // for jade to work properly we also have to update the file.path so that
        // extends and includes from the template will work.
        localNameStore = path.parse(file.path).name;
        file.base = jadeTemplate.base;
        file.path = jadeTemplate.base + "/" + localNameStore;
        return cb(null, file); //run callback to signal end of plugin process.
    });
};
