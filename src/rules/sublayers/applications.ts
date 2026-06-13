import { app, LayerKeySublayer, openDefaultBrowser } from "../../utils";
import { personalOnly, workOnly } from "../../machine";

/**
 * Activate various applications
 */
export const applicationsLayer: LayerKeySublayer = {
  p: app("1Password"),
  t: app("Ghostty"),
  l: app("Logseq"),
  b: openDefaultBrowser(),
  f: app("Finder"),
  q: app("QuickTime Player"),
  v: app("Visual Studio Code"),
  y: app("YT Music"),
  z: app("zoom.us"),
  ...workOnly({
    c: app("Conductor"),
    d: app("DBeaver"),
    g: app("Granola"),
    n: app("Notion"),
    s: app("Slack"),
    h: app("Tuple"),
  }),
  ...personalOnly({
    m: app("Messages"),
  }),
};
