const path = require('path');
const {
    ProvidePlugin,
    DefinePlugin,
} = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const tsconfigAliases = require('./tsconfig.json').compilerOptions.paths;

module.exports = (env, argv) => {
    const mode = argv.mode ?? 'development';
    const projectName = mode === 'production' ? '/YOUR_PROJECT_NAME' : '';

    return {
        devtool: 'source-map',
        mode: mode,
        output: {
            path: path.resolve(__dirname, 'docs'),
            assetModuleFilename: pathData => {
                const filepath = path
                    .dirname(pathData.filename)
                    .split('/')
                    .slice(1)
                    .join('/');
                return `${filepath}/[name].[hash][ext][query]`;
            },
            clean: true,
            publicPath: '/'
        },
        performance: {
            hints: false,
        },
        devServer: {
            open: true,
            port: 8080,
            historyApiFallback: true,
        },
        resolve: {
            modules: ['src', 'node_modules'],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: Object.keys(tsconfigAliases).reduce((result, key) => {
                result[key.slice(0, -2)] = tsconfigAliases[key].map(value => path.resolve(__dirname, value.slice(0, -2)));

                return result;
            }, {})
        },
        stats: {
            loggingDebug: ['sass-loader'],
        },
        module: {
            rules: [
                {
                    test: /\.(js|ts)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-react',
                                '@babel/preset-env',
                                '@babel/preset-typescript',
                            ],
                            plugins: ['@babel/plugin-transform-runtime'],
                        },
                    },
                },
                {
                    test: /\.module\.s?css$/,
                    exclude: /node_modules/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    namedExport: false,
                                    localIdentName: '[path][name]__[local]--[hash:base64:8]',
                                },
                            },
                        },
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.s?css$/,
                    exclude: /(node_modules|(\.module\.s?css$))/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: './public/index.html',
            }),
            // new HTMLWebpackPlugin({
            // 	template: './public/404.html',
            // 	filename: '404.html',
            // 	inject: false,
            // }),
            new ProvidePlugin({
                React: 'react',
            }),
            // new DefinePlugin({
            // 	PROJECT_NAME: `"${projectName}"`,
            // 	ASSETS_PATH: `"${projectName}/assets"`,
            // }),
            // new CopyWebpackPlugin({
            // 	patterns: [
            // 		{
            // 			from: './public/assets/images',
            // 			to: 'assets/images'
            // 		}
            // 	]
            // })
        ],
    }
}