const fs = require('fs');
const less = require('less');
const fonts = require('./fonts');

less
  .render(fs.readFileSync('./reset.less').toString(), {
    modifyVars: {
      fontBase: fonts.base,
      fontCode: fonts.code
    }
  })
  .then(output => {
    fs.writeFileSync('reset.css', output.css);
  });
