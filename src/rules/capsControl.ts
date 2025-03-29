import { Rule } from "../types";
import { createTrackedKey } from "../utils";

const trackedControl = createTrackedKey({
  description:
    "Change capslock to left_ctrl. Post escape if pressed alone, backspace with space, MNEI to HJKL when caps_lock held, n to command+shift+delete when left shift held",
  name: "caps_control",
  fromKey: "caps_lock",
  toIfAloneKey: "escape",
  toIfHeldKey: "left_control",
  parameters: {
    "basic.to_if_alone_timeout_milliseconds": 100,
    "basic.to_if_held_down_threshold_milliseconds": 100,
  },
});

export const capsControl: Rule = {
  ...trackedControl,
  manipulators: [
    ...trackedControl.manipulators,
    {
      conditions: [
        {
          name: "caps_lock_pressed",
          type: "variable_if",
          value: 1,
        },
      ],
      from: {
        key_code: "n",
        modifiers: { mandatory: ["left_control", "left_shift"] },
      },
      to: [
        {
          key_code: "delete_or_backspace",
          modifiers: ["left_shift", "left_command"],
        },
      ],
      type: "basic",
    },
    {
      conditions: [
        {
          name: "caps_lock_pressed",
          type: "variable_if",
          value: 1,
        },
      ],
      from: {
        key_code: "spacebar",
        modifiers: { mandatory: ["left_control"] },
      },
      to: [{ key_code: "delete_or_backspace" }],
      type: "basic",
    },
    {
      conditions: [
        {
          name: "caps_lock_pressed",
          type: "variable_if",
          value: 1,
        },
      ],
      from: {
        key_code: "m",
        modifiers: { mandatory: ["left_control"] },
      },
      to: [{ key_code: "h" }],
      type: "basic",
    },
    {
      conditions: [
        {
          name: "caps_lock_pressed",
          type: "variable_if",
          value: 1,
        },
      ],
      from: {
        key_code: "n",
        modifiers: { mandatory: ["left_control"] },
      },
      to: [{ key_code: "j" }],
      type: "basic",
    },
    {
      conditions: [
        {
          name: "caps_lock_pressed",
          type: "variable_if",
          value: 1,
        },
      ],
      from: {
        key_code: "e",
        modifiers: { mandatory: ["left_control"] },
      },
      to: [{ key_code: "k" }],
      type: "basic",
    },
    {
      conditions: [
        {
          name: "caps_lock_pressed",
          type: "variable_if",
          value: 1,
        },
      ],
      from: {
        key_code: "i",
        modifiers: { mandatory: ["left_control"] },
      },
      to: [{ key_code: "l" }],
      type: "basic",
    },
  ],
};
