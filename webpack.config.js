'use strict';

const path = require('path');
const webpack = require('webpack');
const {optimize} = webpack;
const {UglifyJsPlugin} = optimize;

const dir = './lib';

const {env} = process;
const isDev = env.NODE_ENV === 'development';

const dist = path.resolve(__dirname, 'dist');
const devtool = 'source-map';

const notEmpty = (a) => a;
const clean = (array) => array.filter(notEmpty);

const plugins = clean([
    !isDev && new UglifyJsPlugin({
        sourceMap: true,
        comments: false,
    }),
]);

const loaders = [{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
}];

const filename = `[name]${!isDev ? '.min' : ''}.js`;

module.exports = {
    devtool,
    entry: {
        emitify: `${dir}/emitify.js`,
    },
    output: {
        library: 'Emitify',
        filename,
        path: dist,
        pathinfo: true,
        libraryTarget: 'var',
        devtoolModuleFilenameTemplate,
    },
    plugins,
    module: {
        loaders,
    },
};

function devtoolModuleFilenameTemplate(info) {
    const resource = info.absoluteResourcePath.replace(__dirname + path.sep, '');
    return `file://emitify/${resource}`;
}

