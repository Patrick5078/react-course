const path = require('path')



module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        // Run it for all the JS files except those in node modules
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }]
    },
    // Gives us the filename when we get errors
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        // Tell the server which directory to run
        contentBase: path.join(__dirname, 'public')
    }
}

// Loader
