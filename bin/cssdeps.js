#!/usr/bin/env node
/* jshint globalstrict: true, node: true, unused:false */
"use strict";

var rework = require('rework'),
    less = require('less'),
    path = require('path'),
    fs = require('fs');

if (process.argv.length < 3) {
    console.error('usage: cssdeps <file.css>');
    console.error('');
    console.error('Walks CSS and LESS files and outputs paths to any url() dependencies found.');
    process.exit(1);
}

var filename = path.resolve(process.argv[2]);
var root = path.dirname(filename);
var data = fs.readFileSync(filename, 'utf8');

if (path.extname(filename) === '.less') {
    try {
        var parser = new(less.Parser)({
            color: true,
            silent: false,
            paths: [path.dirname(filename)],
            filename: filename // for better error messages
        });
        parser.parse(data, function (e, tree) {
            if (e) {
                console.error(e.stack);
                process.exit(1);
            }
            var css = tree.toCSS({ compress: true }); // removes redundant things that otherwise break rework
            printDeps(css);
        });
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
} else {
    printDeps(data);
}

function rewrite(url) {
    if (!url) return url;
    if (url.indexOf('http') === 0) return url;
    console.log(path.resolve(path.join(root,url)));
    return url;
}

function printDeps(css) {
    rework(css)
      .use(rework.url(rewrite))
      .toString();
}
