const camelcase = require("camelcase");

module.exports.formatComponentName = function formatComponentName(basename) {
  return camelcase(basename.replace(/@\d+x\d+/, "").replace(/-sl$/, ""), {
    pascalCase: true
  });
};
