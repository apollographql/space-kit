import * as fonts from "./src/fonts";
import fs from "fs";
import less from "less";

less
  .render(fs.readFileSync("./reset.less", "utf-8"), {
    modifyVars: {
      fontBase: fonts.base,
      fontCode: fonts.code
    }
  })
  .then(output => {
    fs.writeFileSync("reset.css", output.css);
  });
