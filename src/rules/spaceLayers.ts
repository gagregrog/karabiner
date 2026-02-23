import { KeyCode } from "../types";
import { duplicateLayer, makeLayers, trackedKeyInactive } from "../utils";
import { applicationsLayer } from "./sublayers/applications";
import { browseLayer } from "./sublayers/browse";
import { deskLayer } from "./sublayers/desk";
import { homerowMovementKeys } from "./sublayers/homerowMovement";
import { phoneLayer } from "./sublayers/phone";
import { raycastLayer } from "./sublayers/raycast";
import { systemLayer } from "./sublayers/system";
import { windexLayer } from "./sublayers/windex";
import { yabaiLayer } from "./sublayers/yabai";
import { LAYERS_NAME, SHIFT_MOD } from "./variableNames";

const activators: KeyCode[] = ["spacebar", "delete_or_backspace"];

export const spaceLayers = makeLayers(
  LAYERS_NAME,
  activators,
  {
    // mnei to arrows, caps modified to command arrows, t for cmd+tab
    ...homerowMovementKeys,
    d: deskLayer,
    p: phoneLayer,
    b: browseLayer,
    ...duplicateLayer(["a", "o"], applicationsLayer),
    w: windexLayer,
    // ...duplicateLayer(
    //   [
    //     // return_or_enter/caps_lock useful on builtin keyboard
    //     "return_or_enter",
    //     "caps_lock",
    //     // activators useful on external keyboard for mirrored layout
    //     ...activators,
    //   ],
    //   yabaiMovementLayer
    // ),

    y: yabaiLayer,
    s: systemLayer,
    r: raycastLayer,
  },
  trackedKeyInactive(SHIFT_MOD)
);
