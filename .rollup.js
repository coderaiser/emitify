import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';

const noop = () => {};
const onlyIf = (a, plugin) => a ? plugin : noop;

const {NODE_ENV} = process.env;
const isProd = NODE_ENV === 'production';

export default {
    entry: 'lib/emitify.js',
    moduleName: 'Emitify',
    plugins: [
        babel(),
        onlyIf(isProd, uglify()),
        onlyIf(isProd, filesize()),
    ]
};

