import { isIntelCondition, isNotIntelCondition } from "../../conditions";
import { app, LayerKeySublayer, withConditions } from "../../utils";

/**
 * Activate various applications
 */
export const applicationsLayer: LayerKeySublayer = {
  p: app("1Password"),
  t: app("Alacritty"),
  b: [
    withConditions(app("Arc"), isNotIntelCondition),
    withConditions(app("Brave Browser"), isIntelCondition),
  ],
  e: withConditions(app("ExpressVPN"), isIntelCondition),
  f: app("Finder"),
  m: withConditions(app("Messages"), isIntelCondition),
  n: withConditions(app("Notion"), isNotIntelCondition),
  q: app("QuickTime Player"),
  s: withConditions(app("Slack"), isIntelCondition),
  v: app("Visual Studio Code"),
  y: app("YT Music"),
  z: app("zoom.us"),
};
