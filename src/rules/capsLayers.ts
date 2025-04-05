import { Rule } from "../types";
import {
  app,
  open,
  createTrackedKey,
  createSubLayers,
  windex,
  to,
} from "../utils";

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
      1: app("1Password"),
      a: app("Arc"),
      s: app("Slack"),
      n: app("Notion"),
      t: app("Alacritty"),
      z: app("zoom.us"),
      f: app("Finder"),
      y: app("YT Music"),
    },

    // w = "Window"
    w: {
      u: windex("up_arrow"),
      n: windex("left_arrow"),
      e: windex("down_arrow"),
      i: windex("right_arrow"),
      f: windex("return_or_enter", "Fullscreen"),
      return_or_enter: windex("return_or_enter", "Fullscreen"),
      y: windex("f15", "Upper Right"),
      o: windex("f16", "Lower Right"),
      l: windex("f17", "Upper Left"),
      m: windex("f18", "Lower Left"),
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
