const { NODE_ENV, BABEL_ENV } = process.env
const cjs = NODE_ENV === 'test' || BABEL_ENV === 'commonjs'

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    esmodules: true,
                },
                // Use the equivalent of `babel-preset-modules`
                bugfixes: true,
                modules: false,
                loose: true,
            },
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/transform-react-jsx',
        cjs && ['@babel/transform-modules-commonjs'],
        // Evaluate if adding '@babel/transform-runtime' is necessary for working builds
        // [
        //     '@babel/transform-runtime',
        //     {
        //         useESModules: !cjs,
        //         version: require('./package.json').devDependencies[
        //             '@babel/runtime'
        //             ].replace(/^[^0-9]*/, ''),
        //     },
        // ],
    ].filter(Boolean),
}
