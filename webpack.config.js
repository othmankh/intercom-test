module.exports = {
    entry: ["./src/index.ts"],
    target: 'node',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      path: `${process.cwd()}/dist`,
      filename: 'index.js',
      libraryTarget: 'commonjs'
    },
    resolveLoader: {
      modules: [__dirname + '/node_modules']
    }
  };
  