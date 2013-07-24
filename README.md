css-deps
========

Walks CSS and LESS files and outputs paths to any url() dependencies found.

e.g.

    $ ./bin/cssdeps.js examples/test.css 
    /Users/RandomEtc/css-deps/examples/foo.png
    /Users/RandomEtc/css-deps/examples/bar.gif

Useful if you have a build script that inlines images as data uris or adds asset-pipeline style 
hashes to file names based on content.
