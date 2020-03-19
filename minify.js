
const minify = require('@node-minify/core')
const uglifyjs = require('@node-minify/uglify-js')
const babelMinify = require('@node-minify/babel-minify')

const { code, map } = minify("input code", {
    mangle: {
        keepClassName: true
    }
});

// Using UglifyJS
minify({
    compressor: babelMinify,
    input: 'src/**/*.js',
    output: 'public/',
    options: {
        presets: ['env']
    },
    callback: function (err, min) { }
});
