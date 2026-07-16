import fs from 'fs';
import path from 'path';

function walk(dir, done) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
}

walk('src', function (err, results) {
    if (err) throw err;
    const files = ['server.ts', 'src/index.css', ...results.filter(f => f.endsWith('.ts') || f.endsWith('.tsx'))];
    let uniqueFiles = [...new Set(files)];

    uniqueFiles.forEach(file => {
        try {
            let code = fs.readFileSync(file, 'utf-8');

            const noComments = code.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*|('.*?'|".*?"|`[\s\S]*?`)/g, function (match, p1) {
                if (/^['"`]/.test(match)) { return match; }
                if (p1 != null) { return p1; }
                return '';
            });

            const noBlankLines = noComments.replace(/^\s*\n/gm, '');
            fs.writeFileSync(file, noBlankLines);
        } catch (e) {
            console.log("Error reading file", file, e);
        }
    });
    console.log('Removed comments and blank lines from ' + uniqueFiles.length + ' files');
});
