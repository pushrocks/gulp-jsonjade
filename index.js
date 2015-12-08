/// <reference path="typings/tsd.d.ts" />
var plugins = {
    beautylog: require("beautylog")("os"),
    gutil: require("gulp-util"),
    through: require("through2"),
    path: require("path"),
    smartparam: require("smartparam"),
    vinyl: require("vinyl")
};
module.exports = function (vinylFileArg, fileAttributeName, debugArg) {
    if (fileAttributeName === void 0) { fileAttributeName = "undefined"; }
    if (debugArg === void 0) { debugArg = false; }
    return plugins.through.obj(function (file, enc, cb) {
        var jsonString, localNameStore;
        if (file.isNull() === true) {
            cb(null, file);
            return;
        }
        if (file.isStream()) {
            plugins.beautylog.error("gulp-jsonjade: streaming not supported");
            return;
        }
        if (!plugins.vinyl.isVinyl(vinylFileArg)) {
            plugins.beautylog.error("gulp-jsonjade: vinylFileArg is not a vinyl file");
            return;
        }
        jsonString = String(file.contents); //store current file contents as string
        plugins.smartparam.smartAdd(file, 'data'); //create file.data in case it doesn't exist
        if (fileAttributeName != "undefined") {
            file.data[fileAttributeName] = JSON.parse(jsonString); //make data available for jade through data.[fileAttributeName]
        }
        else {
            file.data = JSON.parse(jsonString);
        }
        if (Buffer.isBuffer(file.contents)) {
            file.contents = vinylFileArg.contents; //if file.contents already is Buffer
        }
        else {
            file.contents = new Buffer(vinylFileArg.content); // if file.contents is String
        }
        // for jade to work properly we also have to update the file.path so that
        // extends and includes from the template will work.
        // file.base and file.path only defer by the addtion of the filename.
        // This results in a flat folder hierarchy.
        localNameStore = plugins.path.parse(file.path).name;
        file.base = vinylFileArg.base;
        file.path = vinylFileArg.base + "/" + localNameStore;
        return cb(null, file); //run callback to signal end of plugin process.
    });
};
