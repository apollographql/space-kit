/*
 * Ignore tests preset
 *
 * Modify webpack configuration to exclude all files with `.spec` or `.test` in
 * them. We use webpack's dynamic require to generate stories for Icons; which
 * inadvertantly causes `Icons.spec.tx` to be included. This causes storybook to
 * fail to load because `Icons.spec.tsx` can't be transpiled because it uses
 * node-only `fs`.
 */

module.exports.webpackFinal = function webpackFinal(config) {
  config.module.rules.forEach(rule => {
    if (!rule.exclude) {
      rule.exclude = [];
    } else if (!Array.isArray(rule.exclude)) {
      rule.exclude = [rule.exclude];
    }

    rule.exclude.push(/\.(?:spec|test)/);
  });

  return config;
};
