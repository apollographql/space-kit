const colors = require('./colors');

exports.colors = colors;
exports.tailwindColors = getTailwindColors(colors);

function getTailwindPalette(color, object) {
  return Object.keys(object).reduce((acc, key) => {
    const name = key === 'base' ? color : `${color}-${key}`;
    return {
      ...acc,
      [name]: object[key]
    };
  }, {});
}

function getTailwindColors(object) {
  Object.keys(object).reduce((acc, key) => {
    const value = object[key];
    if (typeof value === 'string') {
      return {
        ...acc,
        [key]: value
      };
    }

    const palette = getTailwindPalette(key, value);
    return {
      ...acc,
      ...palette
    };
  }, {});
}
