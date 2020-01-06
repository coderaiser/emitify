'use strict';

const {run} = require('madrun');

module.exports = {
    'test': () => 'tape test/*.js',
    'lint': () => 'putout lib test .madrun.js',
    'fix:lint': () => run('lint', '--fix'),
    'coverage': () => 'nyc npm test',
    'report': () => 'nyc report --reporter=text-lcov | coveralls',
    'watcher': () => 'nodemon -w test -w lib --exec',
    'watch:test': () => run('watcher', 'npm test'),
    'watch:lint': () => run('watcher', 'npm run lint'),
    'watch:coverage': () => run('watcher', 'npm run coverage'),
};

