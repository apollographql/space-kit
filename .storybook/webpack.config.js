module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("ts-loader"),
        options: {
          compilerOptions: {
            declaration: false,
            module: "esnext",
            target: "esnext",
          },
        },
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

  return config;
};
