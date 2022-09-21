const fs = require('fs-extra')
var path = require('path');

const { readFileSync, fstat, writeFileSync } = require('fs')

const posthtml = require('posthtml')
const include = require('posthtml-include')

let LocalFolderPath = "src\\posthtml";
let LocalDestinationPath = "resources";

var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

walk(LocalFolderPath, function (err, results) {
    if (err) throw err;

    results.forEach(element => {
        const html = readFileSync(element);
        //console.log("html : ", html);

        posthtml([include({ encoding: 'utf8' })])
            .process(html)
            .then((result) => {
                if (fs.existsSync(element.replace(LocalFolderPath, LocalDestinationPath)) === false) {
                    // fs.writeFileSync(element.replace(LocalFolderPath, LocalDestinationPath), result.html);
                    fs.createFileSync(element.replace(LocalFolderPath, LocalDestinationPath));
                };

                fs.writeFileSync(element.replace(LocalFolderPath, LocalDestinationPath), result.html);
            });
    });
});