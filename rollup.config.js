import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

const extensions = ['.ts', '.tsx'];

const config = {
    input: { index: 'src/staged/index.tsx' },
    plugins: [
        nodeResolve({
            extensions,
        }),
        // typescript({ tsconfigOverride: { compilerOptions: { jsx: 'react' } } }),
        babel({
            extensions,
            include: 'src/**/*',
            exclude: '**/node_modules/**',
            babelHelpers: 'bundled',
            comments: false,
            presets: [
                ['@babel/preset-env', { modules: false, bugfixes: true, loose: true, targets: { esmodules: true } }],
                '@babel/preset-typescript',
                '@babel/preset-react',
            ],
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
