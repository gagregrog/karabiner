import { addMods, alt, lcag } from "../mods";
import { Rule } from "../types";
import { app, open, createTrackedKey, createSubLayers, to } from "../utils";

const LAYERS = "layers";

export const capsLayers: Rule[] = [
  createTrackedKey({
    name: LAYERS,
    description: "Layers",
    fromKey: "spacebar",
    toIfAloneKey: "spacebar",
  }),
  ...createSubLayers(LAYERS, {
    // movement keys for right hand
    m: to("left_arrow"),
    n: to("down_arrow"),
    e: to("up_arrow"),
    i: to("right_arrow"),
    // b = "B"rowse
    b: {
      8: open("https://localhost:8000"),
      9: open("https://localhost:9000"),
      g: open("https://github.com"),
    },
    // o = "Open" applications
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

    // w = "Window"
    w: {
      // ** keybinds/functions managed by hammerspoon.Windex
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
      // ** keybinds managed by skhd
      // ** functions managed by yabai and yabai.sh
      delete_or_backspace: alt("t", "Yabai toggle float"),
      m: addMods("t", ["left_alt", "left_shift"], "Yabai toggle managed mode"),
      p: alt("p", "Yabai focus previous window"),
      f: alt("n", "Yabai focus next window"),
      j: alt("f", "Yabai focus next managed window"),
      k: addMods(
        "f",
        ["left_alt", "left_shift"],
        "Yabai focus previous managed window"
      ),
    },

    // d = "Digits" = numpad
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

    // s = "System"
    s: {
      l: {
        description: "Lock the computer with spacebar + s + l",
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      m: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      e: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      n: {
        to: [
          {
            key_code: "rewind",
          },
        ],
      },
    },

    // r = "Raycast"
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
