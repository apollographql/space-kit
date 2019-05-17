import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  require('../reset.css');
  require('../font.css');
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
