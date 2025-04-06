import { KeyCode, ModifiersKeys } from "./types";
import { LayerCommand } from "./utils";

/**
 * Modify a keypress to include left_control, left_alt, and left_gui
 */
export function lcag(key: KeyCode, description?: string): LayerCommand {
  const modifiers: ModifiersKeys[] = ["left_control", "left_alt", "left_gui"];
  return addMods(key, modifiers, description);
}

/**
 * Modify a keypress to include left_control
 */
export function control(key: KeyCode, description?: string): LayerCommand {
  const modifiers: ModifiersKeys[] = ["left_control"];
  return addMods(key, modifiers, description);
}

/**
 * Modify a keypress to include left_alt
 */
export function alt(key: KeyCode, description?: string): LayerCommand {
  const modifiers: ModifiersKeys[] = ["left_alt"];
  return addMods(key, modifiers, description);
}

/**
 * Modify a keypress to include left_gui
 */
export function gui(key: KeyCode, description?: string): LayerCommand {
  const modifiers: ModifiersKeys[] = ["left_gui"];
  return addMods(key, modifiers, description);
}

/**
 * Modify a keypress to include left_alt and left_shift
 */
export function altShift(key: KeyCode, description?: string): LayerCommand {
  const modifiers: ModifiersKeys[] = ["left_alt", "left_shift"];
  return addMods(key, modifiers, description);
}

/**
 * Modify a keypress to include left_alt, left_shift, and left_control
 */
export function meh(key: KeyCode, description?: string): LayerCommand {
  const modifiers: ModifiersKeys[] = ["left_alt", "left_shift", "left_control"];
  return addMods(key, modifiers, description);
}

/**
 * Modify a keypress to include specified modifiers
 */
export function addMods(
  key: KeyCode,
  modifiers: ModifiersKeys[],
  description?: string
): LayerCommand {
  return {
    description: description || describeMods(key, modifiers),
    to: [
      {
        key_code: key,
        modifiers,
      },
    ],
  };
}

function describeMods(key: KeyCode, modifiers: ModifiersKeys[]) {
  return `${key} -> ${key} + ${modifiers.join(" + ")}`;
}
