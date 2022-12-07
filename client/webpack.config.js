const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'app.tsx',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
  },
  mode: 'development',
};
