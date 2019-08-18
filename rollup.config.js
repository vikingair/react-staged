import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';

export default {
    input: { index: 'src/staged/index.tsx' },
    plugins: [
        typescript(),
        babel({
            comments: false,
            exclude: 'node_modules/**',
            presets: [['@babel/preset-env', { modules: false, targets: { node: '8' } }]],
        }),
        resolve(),
        commonjs(),
    ],
    external: ['react'],
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
