var fs = require('fs');
var path = require('path');
var browserify = require('browserify');

var b = browserify({ standalone: 'smrq-ui-view-loader' });
b.require('./src', { expose: 'smrq-ui-view-loader', entry: true });
b.require('./typings/tsd.d.ts');
b.plugin('tsify', { noImplicitAny: true });
b.plugin('derequire/plugin');

b.bundle().pipe(fs.createWriteStream(path.join(__dirname, 'index.js')));