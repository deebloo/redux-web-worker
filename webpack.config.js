module.exports = {
  entry: './src',
  output: {
    libraryTarget: 'var',
    library: 'Rw',
    filename: 'bundles/bundle.min.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: /node_modules/ }
    ]
  }
}