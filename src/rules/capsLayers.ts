import { alt, altShift, lcag } from "../mods";
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

    // "B"rowse
    b: {
      8: open("https://localhost:8000"),
      9: open("https://localhost:9000"),
      g: open("https://github.com"),
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

    // Yabai
    delete_or_backspace: {
      //  keybinds managed by skhd
      //  functions managed by yabai and yabai.sh
      b: alt("b", "Yabai balance splits"),
      f: alt("t", "Yabai toggle float"),
      t: altShift("t", "Yabai toggle managed mode"),
      p: alt("p", "Yabai focus previous window"),
      s: alt("n", "Yabai focus next window"),
      o: alt("f", "Yabai focus next managed window"),
      a: altShift("f", "Yabai focus previous managed window"),
      m: altShift("m", "Yabai focus managed window west"),
      n: altShift("n", "Yabai focus managed window south"),
      e: altShift("e", "Yabai focus managed window north"),
      i: altShift("i", "Yabai focus managed window east"),
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
