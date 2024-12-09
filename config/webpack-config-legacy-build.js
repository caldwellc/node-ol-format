const path = require('path');

module.exports = {
  entry: './build/index.js',
  devtool: 'source-map',
  mode: 'production',
  target: ['node'],
  externals: [
    {
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    },
  ],
  resolve: {
    alias: {
      ol: path.resolve('./build/ol'),
    },
  },
  output: {
    path: path.resolve('./build/legacy'),
    filename: 'ol.js',
    library: 'ol',
    libraryTarget: 'commonjs',
    libraryExport: 'default',
  },
};
