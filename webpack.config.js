const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'build'), // Output directory
    filename: 'bundle.js' // Output bundle file name
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Include .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel loader for transpiling JavaScript files
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // Babel presets for React and modern JavaScript
          }
        }
      },
      {
        test: /\.scss$/, // Include .scss files
        use: ['style-loader', 'css-loader', 'sass-loader'] // Use style, css, and sass loaders for processing styles
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // File extensions to resolve
  },
  devServer: {
    contentBase: './build', // Serve files from the 'build' directory
    port: 3000, // Port to run the development server on
    historyApiFallback: true // Enable history API fallback for React Router
  }
};
