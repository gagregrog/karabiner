import fs from "fs";
import { rules } from "./src/rules";

const OUTFILE = "karabiner2.json";

fs.writeFileSync(
  OUTFILE,
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: true,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
