import fs from "fs";
import { profiles } from "./src/profiles/index";

const OUTFILE = "karabiner.json";

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
