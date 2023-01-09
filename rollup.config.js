import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external'


const PackageJson = require('./package.json')

export default [
    {
        input: 'src/components/index.ts',
        output: [
            {
                file: PackageJson.main,
                format: 'cjs',
                sourcemap: true
            },
            {
                file: PackageJson.module,
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: [
            PeerDepsExternalPlugin(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            terser()
        ],
        external: ["react", "react-dom", "styled-components"]
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: 'esm' }],
        plugins: [dts.default()]
    }
]