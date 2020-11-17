import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

export default {
    input: { index: 'src/staged/index.tsx' },
    plugins: [
        typescript(),
        babel({
            babelHelpers: 'bundled',
            comments: false,
            exclude: 'node_modules/**',
            presets: [['@babel/preset-env', { modules: false, targets: { node: '12' } }]],
        }),
    ],
    external: ['react', 'react-dom'],
    output: [
        {
            dir: 'dist/cjs',
            format: 'cjs',
        },
        {
            dir: 'dist/esm',
            format: 'esm',
        },
    ],
};
