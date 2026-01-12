import { KeyCode } from "../types";
import { to, duplicateLayer, makeLayers, trackedKeyInactive } from "../utils";
import { applicationsLayer } from "./sublayers/applications";
import { browseLayer } from "./sublayers/browse";
import { deskLayer } from "./sublayers/desk";
import { raycastLayer } from "./sublayers/raycast";
import { systemLayer } from "./sublayers/system";
import { windexLayer } from "./sublayers/windex";
import { yabaiLayer } from "./sublayers/yabai";
import { yabaiMovementLayer } from "./sublayers/yabaiMovement";
import { LAYERS_NAME, SHIFT_MOD } from "./variableNames";

const activators: KeyCode[] = ["spacebar", "delete_or_backspace"];

export const spaceLayers = makeLayers(
  LAYERS_NAME,
  activators,
  {
    // movement keys for right hand
    m: to("left_arrow"),
    n: to("down_arrow"),
    e: to("up_arrow"),
    i: to("right_arrow"),
    t: to("tab", ["command"]),

    d: deskLayer,
    b: browseLayer,
    ...duplicateLayer(["a", "o"], applicationsLayer),
    w: windexLayer,
    ...duplicateLayer(
      [
        // return_or_enter/caps_lock useful on builtin keyboard
        "return_or_enter",
        "caps_lock",
        // activators useful on external keyboard for mirrored layout
        ...activators,
      ],
      yabaiMovementLayer
    ),
    y: yabaiLayer,
    s: systemLayer,
    r: raycastLayer,
  },
  trackedKeyInactive(SHIFT_MOD)
);
