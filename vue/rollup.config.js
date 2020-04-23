import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import { eslint } from 'rollup-plugin-eslint';
export default {
    input: './src/index.js',
    output: {
        format: 'umd', // 模块化类型
        file: 'dist/umd/vue.js',
        name: 'Vue', // 打包后的全局变量的名字
        sourcemap: true
    },
    plugins: [
        eslint({
            include: ['src/**/*.js'] // 需要检查的部分
        }),
        babel({
            exclude: 'node_modules/**'
        }),
        process.env.ENV === 'development'?serve({
            open: true,
            openPage: '/public/index.html',
            port: 3000,
            contentBase: ''
        }):null
    ]
}
