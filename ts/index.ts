/// <reference path="typings/tsd.d.ts" />
var plugins = {
    gutil: require("gulp-util"),
    through: require("through2"),
    path: require("path"),
    smartparam:require("smartparam")
};

module.exports = (vinylFileArg,fileAttributeName:string = "undefined") => {

    return plugins.through.obj((file, enc, cb) => {
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
        plugins.smartparam.smartAdd(file,'data'); //create file.data in case it doesn't exist

        if (fileAttributeName != "undefined") {
            file.data[fileAttributeName] = JSON.parse(jsonString); //make data available for jade through data.[fileAttributeName]
        } else {
            file.data = JSON.parse(jsonString);
        }

        if (Buffer.isBuffer(file.contents)){
            file.contents = vinylFileArg.contents;
        } else {
            file.contents = new Buffer(vinylFileArg.content); //replace file.contents
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
