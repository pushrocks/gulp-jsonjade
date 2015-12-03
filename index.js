/// <reference path="typings/tsd.d.ts" />
var gutil = require("gulp-util");
var through = require("through2");
var path = require("path");
var smartparam = require("smartparam");
module.exports = function (vinylFileArg, fileAttributeName) {
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
        file.data[fileAttributeName] = JSON.parse(jsonString); //make data available for jade through data.[fileAttributeName]
        file.contents = new Buffer(vinylFileArg.content); //replace file.contents
        // for jade to work properly we also have to update the file.path so that
        // extends and includes from the template will work.
        localNameStore = path.parse(file.path).name;
        file.base = vinylFileArg.base;
        file.path = vinylFileArg.base + "/" + localNameStore;
        return cb(null, file); //run callback to signal end of plugin process.
    });
};
