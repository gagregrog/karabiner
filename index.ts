import fs from "fs";
import { profiles } from "./src/profiles/index";
import { IS_WORK } from "./src/machine";

const OUTFILE = "karabiner.json";

console.log(`Building ${OUTFILE} for ${IS_WORK ? "work" : "personal"} machine`);

fs.writeFileSync(
  OUTFILE,
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: true,
      },
      profiles,
    },
    null,
    2
  )
);
