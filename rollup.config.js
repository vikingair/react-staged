import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';

export default {
    input: { index: 'src/staged/index.tsx' },
    plugins: [
        typescript(),
        babel({
            comments: false,
            exclude: 'node_modules/**',
            presets: [['@babel/preset-env', { modules: false, targets: { node: '8' } }]],
        }),
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
