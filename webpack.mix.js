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
    });

// mix.browserSync ('http://dev.4science.net/');
// mix.browserSync (process.env.APP_URL);
mix.disableNotifications();
mix.browserSync({
    proxy: '127.0.0.1:8000',
    files: [
        'app/**/*',        
        'resources/**/*',
        'routes/**/*'
    ],
});