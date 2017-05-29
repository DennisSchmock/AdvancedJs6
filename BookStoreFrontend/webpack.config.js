var path = require('path'); 

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename: "bundle.js",
        publicPath: "assets"
    },
    devServer: {
        inline: true,
        contentBase: './dist',
        port: 3000
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                query:{
                    presets: ["latest", "stage-0", "react"],
                    plugins: [
                            "transform-decorators-legacy",
                            "transform-class-properties"]
                }
            },
            {
                test: /\.json$/,
                exclude: /(node_modules)/,
                loader: "json-loader"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'
            },
					 { 
                test: /\.scss$/, 
                loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
					 }
                        
			
        ]
    }
}