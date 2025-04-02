import { VAR_OFF, VAR_ON } from "./constants";
import {
  To,
  KeyCode,
  Manipulator,
  Rule,
  Parameters,
  Conditions,
} from "./types";

/**
 * Modify and track a keypress
 */
export function createTrackedKey({
  name,
  description,
  fromKey,
  toIfAloneKey,
  toIfHeldKey,
  parameters,
}: {
  name: string;
  description: string;
  fromKey: KeyCode;
  toIfAloneKey?: KeyCode;
  toIfHeldKey?: KeyCode;
  parameters?: Parameters;
}): { description: string; manipulators: Manipulator[] } {
  return {
    description,
    manipulators: [
      {
        description: `${fromKey} -> ${name}`,
        from: {
          key_code: fromKey,
          modifiers: { optional: ["any"] },
        },
        to: [
          {
            set_variable: {
              name: generateVariableName(name),
              value: VAR_ON,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: generateVariableName(name),
              value: VAR_OFF,
            },
          },
        ],
        ...(toIfAloneKey && { to_if_alone: [{ key_code: toIfAloneKey }] }),
        ...(toIfHeldKey && { to_if_held_down: [{ key_code: toIfHeldKey }] }),
        parameters,
        type: "basic",
      },
    ],
  };
}

/**
 * Custom way to describe a command in a layer
 */
interface LayerCommand {
  to: To[];
  description?: string;
}

type LayerKeySublayer = Partial<Record<KeyCode, LayerCommand>>;

/**
 * Create a sublayer where every command is prefixed with a trackedVar
 * e.g. LAYER + O ("Open") is the "open applications" layer, I can press
 * e.g. LAYER + O + G ("Google Chrome") to open Chrome
 */
export function createSubLayer(
  parentLayerName: string,
  sublayer_key: KeyCode,
  commands: LayerKeySublayer,
  allSubLayerVariables: string[]
): Manipulator[] {
  const parentVariableName = generateVariableName(parentLayerName);
  const subLayerVariableName = generateVariableName(sublayer_key);

  return [
    // When LAYER + sublayer_key is pressed, set the variable to 1; on key_up, set it to 0 again
    {
      description: `Toggle ${parentLayerName} sublayer ${sublayer_key}`,
      type: "basic",
      from: {
        key_code: sublayer_key,
        modifiers: {
          optional: ["any"],
        },
      },
      to_after_key_up: [
        {
          set_variable: {
            name: subLayerVariableName,
            // The default value of a variable is 0: https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/variable/
            // That means by using 0 and 1 we can filter for "0" in the conditions below and it'll work on startup
            value: VAR_OFF,
          },
        },
      ],
      to: [
        {
          set_variable: {
            name: subLayerVariableName,
            value: VAR_ON,
          },
        },
      ],
      // This enables us to press other sublayer keys in the current sublayer
      // (e.g. LAYER + O > M even though LAYER + M is also a sublayer)
      // basically, only trigger a sublayer if no other sublayer is active
      conditions: [
        ...allSubLayerVariables
          .filter(
            (subLayerVariable) => subLayerVariable !== subLayerVariableName
          )
          .map((subLayerVariable) => ({
            type: "variable_if" as const,
            name: subLayerVariable,
            value: VAR_OFF,
          })),
        {
          type: "variable_if",
          name: parentVariableName,
          value: VAR_ON,
        },
      ],
    },
    // Define the individual commands that are meant to trigger in the sublayer
    ...(Object.keys(commands) as (keyof typeof commands)[]).map(
      (command_key): Manipulator => ({
        ...commands[command_key],
        type: "basic" as const,
        from: {
          key_code: command_key,
          modifiers: {
            optional: ["any"],
          },
        },
        // Only trigger this command if the variable is 1 (i.e., if LAYER + sublayer is held)
        conditions: [
          {
            type: "variable_if",
            name: subLayerVariableName,
            value: VAR_ON,
          },
        ],
      })
    ),
  ];
}

/**
 * Create sublayers for a given parent layer. This needs to be a single function, as we'll need to
 * have all the variable names in order to filter them and make sure only one activates at a time
 */
export function createSubLayers(
  parentLayerName: string,
  subLayers: Partial<Record<KeyCode, LayerKeySublayer | LayerCommand>>
): Rule[] {
  const parentVariableName = generateVariableName(parentLayerName);
  const allSubLayerVariables = (
    Object.keys(subLayers) as (keyof typeof subLayers)[]
  ).map((sublayer_key) => generateVariableName(sublayer_key));

  return Object.entries(subLayers).map(([key, value]) =>
    "to" in value
      ? {
          description: `${parentLayerName} + ${key}`,
          manipulators: [
            {
              ...value,
              type: "basic" as const,
              from: {
                key_code: key as KeyCode,
                modifiers: {
                  optional: ["any"],
                },
              },
              conditions: [
                {
                  type: "variable_if",
                  name: parentVariableName,
                  value: VAR_ON,
                },
                ...allSubLayerVariables.map((subLayerVariable) => ({
                  type: "variable_if" as const,
                  name: subLayerVariable,
                  value: VAR_OFF,
                })),
              ],
            },
          ],
        }
      : {
          description: `${parentLayerName} sublayer "${key}"`,
          manipulators: createSubLayer(
            parentLayerName,
            key as KeyCode,
            value,
            allSubLayerVariables
          ),
        }
  );
}

function generateVariableName(keyOrName: KeyCode | string) {
  return `${keyOrName}_pressed`;
}

export function trackedKeyActive(name: string): Conditions[] {
  return [
    {
      name: generateVariableName(name),
      type: "variable_if",
      value: VAR_ON,
    },
  ];
}

/**
 * Shortcut for "open" shell command
 */
export function open(...what: string[]): LayerCommand {
  return {
    to: what.map((w) => ({
      shell_command: `open ${w}`,
    })),
    description: `Open ${what.join(" & ")}`,
  };
}

/**
 * Utility function to create a LayerCommand from a tagged template literal
 * where each line is a shell command to be executed.
 */
export function shell(
  strings: TemplateStringsArray,
  ...values: string[]
): LayerCommand {
  const commands = strings.reduce((acc, str, i) => {
    const value = i < values.length ? values[i] : "";
    const lines = (str + value)
      .split("\n")
      .filter((line) => line.trim() !== "");
    acc.push(...lines);
    return acc;
  }, [] as string[]);

  return {
    to: commands.map((command) => ({
      shell_command: command.trim(),
    })),
    description: commands.join(" && "),
  };
}

/**
 * Shortcut for managing window sizing with Windex
 */
export function windex(key: KeyCode, name?: string): LayerCommand {
  return {
    description: `Window Split ${
      name ||
      key
        .split("_")[0]
        .split("")
        .map((char, i) => (i ? char : char.toUpperCase()))
        .join("")
    }`,
    to: [
      {
        key_code: key,
        modifiers: ["left_control", "left_alt", "left_gui"],
      },
    ],
  };
}

/**
 * Simple remap from one key to another for sublayers
 */
export function to(keyCode: KeyCode): LayerCommand {
  return {
    description: `To ${keyCode}`,
    to: [{ key_code: keyCode }],
  };
}

/**
 * Shortcut for "Open an app" command (of which there are a bunch)
 */
export function app(name: string): LayerCommand {
  return open(`-a '${name}.app'`);
}
