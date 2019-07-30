const pink = {
  title: "Apollo Pink",
  description:
    "Can be used as an accent color or potentially used within data visualizations.",
  options: {
    darkest: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    darker: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    dark: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    base: {
      flag: "base",
      text: 0,
      flags: [0, 0, 1, 1],
    },
    light: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lighter: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lightest: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
  },
};

const teal = {
  title: "Apollo Teal",
  description:
    "Can be used as an accent color or potentially used within data visualizations.",
  options: {
    darkest: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    darker: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    dark: {
      text: 0,
      flags: [0, 1, 1, 1],
    },
    base: {
      flag: "base",
      text: 0,
      flags: [0, 0, 1, 1],
    },
    light: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lighter: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lightest: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
  },
};

const indigo = {
  title: "Apollo Indigo",
  description:
    "Used for default button color when no other context is needing to be conveyed.",
  options: {
    darkest: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    darker: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    dark: {
      flag: "base",
      text: 1,
      flags: [1, 1, 0, 0],
    },
    base: {
      text: 1,
      flags: [1, 1, 0, 1],
    },
    light: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lighter: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lightest: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
  },
};

const black = {
  title: "Black",
  description: "Mostly used for typography and occasionally for backgrounds.",
  options: {
    darker: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    dark: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    base: {
      flag: "default type color",
      text: 1,
      flags: [1, 1, 0, 0],
    },
    light: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    lighter: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
  },
};

const grey = {
  title: "Grey",
  description:
    "Mostly used for borders and typography, but we'll fill this space just for fun.",
  options: {
    darker: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    dark: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    base: {
      text: 0,
      flags: [1, 0, 0, 0],
    },
    light: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lighter: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
  },
};

const silver = {
  title: "Silver",
  description:
    "Used mostly for backgrounds and containers to create separation from the background.",
  options: {
    darker: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    dark: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    base: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    light: {
      flag: "default bg color",
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lighter: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
  },
};

const red = {
  title: "Red",
  description:
    "Primarily used for buttons, toast messages, or other pieces of UI that need to convey destructive actions.",
  options: {
    darkest: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    darker: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    dark: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    base: {
      flag: "base",
      text: 1,
      flags: [1, 1, 0, 0],
    },
    light: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lighter: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lightest: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
  },
};

const green = {
  title: "Green",
  description:
    "Primarily used for buttons, toast messages, or other messages conveying success or confirmation.",
  options: {
    darkest: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    darker: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    dark: {
      text: 1,
      flags: [1, 1, 0, 1],
    },
    base: {
      flag: "base",
      text: 0,
      flags: [0, 0, 1, 1],
    },
    light: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lighter: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lightest: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
  },
};

const blue = {
  title: "Blue",
  description:
    "Primarily used in messages conveying information that may not have a critical context as part of the message.",
  options: {
    darkest: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    darker: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    dark: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    base: {
      flag: "base",
      text: 1,
      flags: [1, 1, 0, 0],
    },
    light: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lighter: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lightest: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
  },
};

const orange = {
  title: "Orange",
  options: {
    darkest: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    darker: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    dark: {
      text: 1,
      flags: [1, 1, 0, 1],
    },
    base: {
      flag: "base",
      text: 0,
      flags: [0, 0, 1, 1],
    },
    light: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lighter: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lightest: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
  },
};

const yellow = {
  title: "Yellow",
  options: {
    darkest: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    darker: {
      text: 1,
      flags: [1, 1, 0, 1],
    },
    dark: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    base: {
      flag: "base",
      text: 0,
      flags: [0, 0, 1, 1],
    },
    light: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lighter: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lightest: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
  },
};

const purple = {
  title: "Purple",
  options: {
    darkest: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    darker: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    dark: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    base: {
      flag: "base",
      text: 1,
      flags: [1, 1, 0, 1],
    },
    light: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lighter: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lightest: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
  },
};

const blilet = {
  title: "Blue-Violet",
  options: {
    darkest: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    darker: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    dark: {
      text: 1,
      flags: [1, 1, 0, 0],
    },
    base: {
      flag: "base",
      text: 1,
      flags: [1, 1, 0, 1],
    },
    light: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lighter: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
    lightest: {
      text: 0,
      flags: [0, 0, 1, 1],
    },
  },
};

module.exports = {
  // brand colors
  pink,
  teal,
  indigo,
  // neutrals
  grey,
  black,
  silver,
  // interface colors
  red,
  green,
  blue,
  // // alternate colors
  orange,
  yellow,
  purple,
  blilet,
};
