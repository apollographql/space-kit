module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        // loader: require.resolve("ts-loader"),
        loader: require.resolve("awesome-typescript-loader"),
        options: {
          declaration: false,
          useCache: true,
        },
        // options: {
        //   compilerOptions: {
        //     declaration: false,
        //     module: "umd",
        //     target: "es5",
        //   },
        // },
      },
    ],
  });

  config.resolve.extensions.push(".ts", ".tsx");
  config.performance = {
    ...config.performance,
    // This isn't a production app so disable size limit warnings
    maxAssetSize: Infinity,
    maxEntrypointSize: Infinity,
  };

  // Disable terser. DOn't merge this
  config.optimization.minimizer = [];

  config.stats = {
    ...config.stats,
    warningsFilter: /export .* was not found in/,
  };

  return config;
};
