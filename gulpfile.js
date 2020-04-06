const {src,dest,parallel} = require('gulp')
const webpack =require('webpack-stream')
const named= require('vinyl-named')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function html(){
    return src('src/*.html')
        .pipe(dest('public/'))
}

function vue(){
    return src('node_modules/vue/dist/vue.min.js')
        .pipe(dest('public/assets/js/'))
}

function image(){
    return src('src/assets/img/*.*')
        .pipe(dest('public/assets/img'))
}

function js(){
    return src('src/assets/js/index.js')
        .pipe(named())
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'assets/js/[name].js'
            },
            module:{
                rules: [
                    {
                        test:/\.vue$/,
                        loader:'vue-loader'
                    },
                    {
                        test:/\.js$/,
                        loader: 'babel-loader'
                    },
                    {
                        test: /\.css$/,
                        use: ['vue-style-loader','css-loader']
                    },
                    {
                        test: /\.(png|jpeg|jpg|gif|svg)$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: 'assets/img/[name].[ext]'
                                }
                            }
                        ]
                    }
                ]
            },
            plugins:[
                new VueLoaderPlugin()
            ],
            resolve: {
                alias:{
                    'vue$':'vue/dist/vue.esm.js'
                },
                extensions: ['*','.js','.vue','.json']
            }
        }))
        .pipe(dest('public/'))
}

exports.default = parallel(html,js,vue,image)