const mix = require('laravel-mix');
const path = require("path");

mix.js('resources/js/app.js', 'public/js')
    .vue()
    .sass('resources/sass/app.scss', 'public/css')
    .webpackConfig({
        resolve: {
            extensions: [".js", ".vue"],
            alias: {
                "@": path.resolve("resources/js"),
            }
        },
        watchOptions: {
            ignored: /node_modules/
        },
        devServer: {
            host: "0.0.0.0",
            port: 8000,
        },
        // output: {
            // path: path.resolve(__dirname, 'public'),
            // publicPath: 'public',
            // filename: '[name].[chunkhash:8].js',  //이부분을 수정
            
            // chunkFilename: '[name].js?id=[chunkhash]',
        // },
    })
    .version();


mix.browserSync ('https://4science.net/');
// mix.disableNotifications();
// mix.browserSync({
//     // proxy: 'localhost:3000',
//     proxy: '127.0.0.1:8000',
//     files: [
//         'app/**/*',        
//         'resources/**/*',
//         'routes/**/*'
//     ],
// });