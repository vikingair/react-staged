import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';

const config = {
    input: { index: 'src/staged/index.tsx' },
    plugins: [
        typescript({ tsconfigOverride: { compilerOptions: { jsx: 'react' } } }),
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

export default config;
