function getTailwindPalette(color, object) {
  return Object.keys(object).reduce((acc, key) => {
    const name = key === 'base' ? color : `${color}-${key}`;
    return {
      ...acc,
      [name]: object[key]
    };
  }, {});
}

// if we export Tailwind config one day, this function might come in handy
function getTailwindColors(object) {
  return Object.keys(object).reduce((acc, key) => {
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

exports.getTailwindColors = getTailwindColors;
