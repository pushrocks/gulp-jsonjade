/// <reference path="../typings/tsd.d.ts" />
var path, through;

through = require("through2");
path = require("path");
module.exports = (mojo, gulp, plugins, jadeTemplate) => {
    /* -------------------------------------------------------------------------
    ------------------------- helper functions ----------------------------------
    --------------------------------------------------------------------------
    */

    var sourcemap;
    mojo.log("now prepocessing blog");
    sourcemap = [];

    /*--------------------------------------------------------------------------
    ---------------------- returned stream --------------------------------------
    --------------------------------------------------------------------------
    */

    return through.obj((file, enc, cb) => {
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
        //create file.data
        file.data = {};
        //make mojo settings available for jade through mojo.something
        file.data.mojo = mojo.settings;
        //make blog data available for jade through data.blog
        file.data.blog = JSON.parse(jsonString);
        file.data.blog.markdown = file.data.blog.body;

        // now that we have the original json moved to file.data we replace file.contents
        file.contents = new Buffer(jadeTemplate.content);

        // for jade to work properly we also have to update the file.path so that
        // extends and includes from the template will work.
        localNameStore = plugins.path.parse(file.path).name;
        file.base = jadeTemplate.base;
        file.path = jadeTemplate.base + "/" + localNameStore;
        //run callback function to signal end of plugin process.
        return cb(null, file);
    });
};
