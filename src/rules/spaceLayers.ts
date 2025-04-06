import { addMods, alt, altShift, lcag, meh } from "../mods";
import { Rule } from "../types";
import {
  app,
  open,
  createTrackedKey,
  createSubLayers,
  to,
  duplicateLayer,
} from "../utils";

export const LAYERS_NAME = "layers";

export const spaceLayers: Rule[] = [
  createTrackedKey({
    name: LAYERS_NAME,
    description: "Layers",
    fromKey: "spacebar",
    toIfAloneKey: "spacebar",
  }),
  ...createSubLayers(LAYERS_NAME, {
    // movement keys for right hand
    m: to("left_arrow"),
    n: to("down_arrow"),
    e: to("up_arrow"),
    i: to("right_arrow"),

    // "B"rowse
    b: {
      8: open("https://localhost:8000"),
      9: open("https://localhost:9000"),
      g: open("https://github.com"),
      m: open("https://developer.mozilla.org/en-US/"),
    },

    // "O"pen applications
    o: {
      p: app("1Password"),
      a: app("Arc"),
      b: app("Brave Browser"),
      s: app("Slack"),
      n: app("Notion"),
      t: app("Alacritty"),
      z: app("zoom.us"),
      f: app("Finder"),
      y: app("YT Music"),
    },

    // "W"indow / "W"index
    // keybinds/functions managed by hammerspoon.Windex
    w: {
      u: lcag("up_arrow", "Upper Half"),
      n: lcag("left_arrow", "Left Half"),
      comma: lcag("down_arrow", "Lower Half"),
      i: lcag("right_arrow", "Right Half"),
      e: lcag("return_or_enter", "Fullscreen"),
      return_or_enter: lcag("return_or_enter", "Fullscreen"),
      y: lcag("f15", "Upper Right"),
      period: lcag("f16", "Lower Right"),
      l: lcag("f17", "Upper Left"),
      h: lcag("f18", "Lower Left"),
    },

    // Yabai - Widnow controls
    ...duplicateLayer(["return_or_enter", "caps_lock", "delete_or_backspace"], {
      //  keybinds managed by skhd
      //  functions managed by yabai and yabai.sh
      m: altShift("m", "Yabai focus managed window west"),
      n: altShift("n", "Yabai focus managed window south"),
      e: altShift("e", "Yabai focus managed window north"),
      i: altShift("i", "Yabai focus managed window east"),
      r: meh("m", "Yabai swap managed window west"),
      t: meh("n", "Yabai swap managed window south"),
      s: meh("e", "Yabai swap managed window north"),
      g: meh("i", "Yabai swap managed window east"),
    }),

    // "Y"abai - General control
    y: {
      //  keybinds managed by skhd
      //  functions managed by yabai and yabai.sh
      b: alt("b", "Yabai balance splits"),
      f: alt("t", "Yabai toggle float"),
      t: altShift("t", "Yabai toggle managed mode"),
      p: alt("p", "Yabai focus previous window"),
      s: alt("n", "Yabai select next window"),
      g: alt("f", "Yabai focus next managed window"),
      a: altShift("f", "Yabai focus previous managed window"),
      r: alt("r", "Yabai rotate splits"),
      c: alt("c", "Yabai cycle split"),
    },

    // "D"igits / numpad
    d: {
      period: to("0"),
      k: to("1"),
      h: to("2"),
      comma: to("3"),
      n: to("4"),
      e: to("5"),
      i: to("6"),
      l: to("7"),
      u: to("8"),
      y: to("9"),
    },

    // "S"ystem
    s: {
      l: addMods(
        "q",
        ["right_control", "right_command"],
        "Lock the computer with spacebar + s + l"
      ),
      m: to("play_or_pause"),
      u: to("volume_increment"),
      e: to("volume_decrement"),
      i: to("fastforward"),
      n: to("rewind"),
    },

    // "R"aycast
    r: {
      y: open("raycast://confetti"),
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      n: open("raycast://script-commands/dismiss-notifications"),
      f: open("raycast://script-commands/copy-focused-finder-window-path"),
      j: open("raycast://script-commands/decode-jwt"),
      a: open("raycast://script-commands/view-scripting-dictionary"),
      m: open("raycast://script-commands/toggle-mic"),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
    },
  }),
];
