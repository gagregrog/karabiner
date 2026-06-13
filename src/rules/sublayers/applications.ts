import { isIntelCondition, isNotIntelCondition } from "../../conditions";
import {
  app,
  LayerKeySublayer,
  openDefaultBrowser,
  withConditions,
} from "../../utils";

/**
 * Activate various applications
 */
export const applicationsLayer: LayerKeySublayer = {
  c: withConditions(app("Conductor"), isNotIntelCondition),
  p: app("1Password"),
  t: app("Alacritty"),
  d: withConditions(app("DBeaver"), isNotIntelCondition),
  l: app("Logseq"),
  b: openDefaultBrowser(),
  e: withConditions(app("ExpressVPN"), isIntelCondition),
  f: app("Finder"),
  g: withConditions(app("Granola"), isNotIntelCondition),
  m: withConditions(app("Messages"), isIntelCondition),
  n: withConditions(app("Notion"), isNotIntelCondition),
  q: app("QuickTime Player"),
  s: withConditions(app("Slack"), isNotIntelCondition),
  h: withConditions(app("Tuple"), isNotIntelCondition),
  v: app("Visual Studio Code"),
  y: app("YT Music"),
  z: app("zoom.us"),
};
