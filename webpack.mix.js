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
        optimization: {
            moduleIds: 'deterministic',
            chunkIds: 'deterministic',
        },
    })
    .version();
//  BrowserSync - npm run watch 때만 켜짐 (npm run prod 빌드에는 영향 없음)
mix.disableNotifications();
mix.browserSync({
    proxy: '127.0.0.1:8000',
    ghostMode: false,      //  여러 탭이 서로의 클릭·스크롤·입력을 따라 하지 않게
    files: [
        'app/**/*',
        'resources/**/*',
        'routes/**/*'
    ],
});