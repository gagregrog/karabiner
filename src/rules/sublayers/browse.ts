import { open, LayerKeySublayer } from "../../utils";

/**
 * Launch websites
 */
export const browseLayer: LayerKeySublayer = {
  8: open("https://localhost:8000"),
  9: open("https://localhost:9000"),
  g: open("https://github.com"),
  m: open("https://developer.mozilla.org/en-US/"),
};
