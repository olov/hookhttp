const sync_request = require('sync-request');
const Module = require("module");

const basedir = "/hook"; // provide as config and don't be so hacky

const old_load = Module._load;
// based on https://github.com/nodejs/node/blob/master/lib/module.js 6ad458b
Module._load = function(request, parent, isMain) {
    // REPL is a special case, because it needs the real require.
    if (request === 'internal/repl' || request === 'repl') {
        return old_load(request, parent, isMain);
    }

    if (request === "fs") { // TODO you know what
        return old_load(request, parent, isMain);
    }
    const parentFullPath = parent.filename || parent.parent.filename; // TODO you know what
    const idx0 = parentFullPath.indexOf(basedir) + basedir.length;
    const idx1 = parentFullPath.lastIndexOf("/");
    const path = parentFullPath.slice(idx0, idx1);
    const url = "http://127.0.0.1:9876" + path + "/" + request;

    console.log('DEBUG require("' + request + '") => GET ' + url);
    const res = sync_request('GET', url);
    const str = String(res.getBody());
    const id = "TODO"; // TODO fetch id from GET response header?
    const module = new Module(id, parent);
    module._compile(str, id);

    return module.exports;
};
