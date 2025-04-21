import { VAR_OFF, VAR_ON } from "./constants";
import {
  To,
  KeyCode,
  Manipulator,
  Rule,
  Parameters,
  Condition,
  ModifierKey,
} from "./types";

/**
 * Create a set of nested layers with commands
 */
export function makeLayers(
  /**
   * name is used to track the topmost layer activator
   */
  name: string,
  /**
   * activatedBy indicates which key will be pressed first to engage the sublayers
   */
  activatedBy: KeyCode | KeyCode[],
  /**
   * sublayers allow you to map individual key behavior or create a layer of functionality one level deeper
   */
  sublayers: Sublayers,
  /**
   * conditions allows you to set rules for when the topmost layer should be activated
   */
  conditions: Condition[]
): Rule[] {
  const activators = Array.isArray(activatedBy) ? activatedBy : [activatedBy];
  return [
    ...activators.map((fromKey) =>
      createTrackedKey({
        name,
        description: `Primary ${name} activator`,
        fromKey,
        toIfAloneKey: fromKey,
        conditions,
      })
    ),
    ...createSubLayers(name, sublayers),
  ];
}

/**
 * Modify and track a keypress
 */
export function createTrackedKey({
  name,
  description,
  fromKey,
  toKey,
  toIfAloneKey,
  toIfHeldKey,
  parameters,
  conditions,
  manipulators = [],
}: {
  name: string;
  description: string;
  fromKey: KeyCode;
  toKey?: KeyCode;
  toIfAloneKey?: KeyCode;
  toIfHeldKey?: KeyCode;
  parameters?: Parameters;
  conditions?: Condition[];
  manipulators?: Manipulator[];
}): { description: string; manipulators: Manipulator[] } {
  const variableName = generateVariableName(name);
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
              name: variableName,
              value: VAR_ON,
            },
          },
          // the toKey must be triggered *after* the variable is set, as
          // the "to" events are cancelled as a new event is encountered
          ...(toKey ? to(toKey).to : []),
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: variableName,
              value: VAR_OFF,
            },
          },
        ],
        ...(toIfAloneKey && { to_if_alone: [{ key_code: toIfAloneKey }] }),
        ...(toIfHeldKey && { to_if_held_down: [{ key_code: toIfHeldKey }] }),
        parameters,
        conditions: [
          ...(conditions || []),
          // make sure we only override the key if the tracked variable that is activated by the key is not active
          // this is useful if you have more than one key that tracks the same name
          ...trackedKeyInactive(name),
        ],
        type: "basic",
      },
      ...manipulators,
    ],
  };
}

/**
 * Duplicate a command layer across multiple activation keys
 */
export function duplicateLayer(
  keyCodes: KeyCode[],
  layerCommands: LayerKeySublayer
) {
  return keyCodes.reduce(
    (acc, keyCode) => ({
      ...acc,
      [keyCode]: layerCommands,
    }),
    {} as Partial<Record<KeyCode, LayerKeySublayer>>
  );
}

/**
 * Custom way to describe a command in a layer
 */
export interface LayerCommand {
  to: To[];
  description?: string;
  conditions?: Condition[];
}

export type LayerKeySublayer = Partial<
  Record<KeyCode, LayerCommand | LayerCommand[]>
>;

export type Sublayers = Partial<
  Record<KeyCode, LayerKeySublayer | LayerCommand>
>;

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
    ...Object.entries(commands)
      .map(([command_key, sublayerConfig]): Manipulator[] => {
        // support passing multiple commands to a single key, ie with conditions
        const subLayerCommands: LayerCommand[] = Array.isArray(sublayerConfig)
          ? sublayerConfig
          : [sublayerConfig];

        return subLayerCommands.map((subLayerCommand) => ({
          ...subLayerCommand,
          type: "basic" as const,
          from: {
            key_code: command_key as KeyCode,
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
            // additional filtering criteria passed in config
            ...(subLayerCommand?.conditions || []),
          ],
        }));
      })
      .flat(),
  ];
}

/**
 * Create sublayers for a given parent layer. This needs to be a single function, as we'll need to
 * have all the variable names in order to filter them and make sure only one activates at a time
 */
export function createSubLayers(
  parentLayerName: string,
  subLayers: Sublayers
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

export function generateVariableName(keyOrName: KeyCode | string) {
  return `${keyOrName}_pressed`;
}

export function trackedKeyActive(name: string): Condition[] {
  return [
    {
      name: generateVariableName(name),
      type: "variable_if",
      value: VAR_ON,
    },
  ];
}

export function trackedKeyInactive(name: string): Condition[] {
  return [
    {
      name: generateVariableName(name),
      type: "variable_if",
      value: VAR_OFF,
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
 * Simple remap from one key to another
 */
export function to(keyCode: KeyCode, modifiers?: ModifierKey[]): LayerCommand {
  return {
    description: `To ${keyCode}`,
    to: [{ key_code: keyCode, modifiers }],
  };
}

/**
 * Shortcut for "Open an app" command (of which there are a bunch)
 */
export function app(name: string): LayerCommand {
  return open(`-a '${name}.app'`);
}

/**
 * Wrap a LayerCommand to include a specified
 */
export function withConditions<T extends Manipulator | LayerCommand>(
  commandOrManipulator: T,
  conditions: Condition[]
) {
  return {
    ...commandOrManipulator,
    conditions: [...(commandOrManipulator.conditions || []), ...conditions],
  };
}

export type Mapping = {
  toKey: KeyCode;
  description?: string;
  toIfAloneKey?: KeyCode;
  toIfHeldKey?: KeyCode;
  toModifiers?: ModifierKey[];
  fromModifiers?: ModifierKey[];
  parameters?: Parameters;
  conditions?: Condition[];
};

/**
 * Map from one key action to another
 */
export function remap(
  from: KeyCode | KeyCode[],
  {
    description,
    toKey,
    toIfAloneKey,
    toIfHeldKey,
    toModifiers = [],
    fromModifiers,
    parameters,
    conditions,
  }: Mapping
): Manipulator {
  const isChord = Array.isArray(from);
  return {
    description:
      description ||
      `${asArray<string>(from)
        .concat(fromModifiers || [])
        .join(" + ")} -> ${[toKey, ...toModifiers].join(" + ")}`,
    from: {
      ...(isChord
        ? {
            simultaneous: from.map((key_code) => ({ key_code })),
          }
        : { key_code: from }),
      modifiers: {
        optional: ["any"],
        mandatory: fromModifiers,
      },
    },
    to: [{ key_code: toKey, modifiers: toModifiers }],
    ...(toIfAloneKey && { to_if_alone: [{ key_code: toIfAloneKey }] }),
    ...(toIfHeldKey && { to_if_held_down: [{ key_code: toIfHeldKey }] }),
    parameters: isChord
      ? {
          "basic.simultaneous_threshold_milliseconds": 25,
          ...parameters,
        }
      : parameters,
    conditions,
    type: "basic",
  };
}

function asArray<T>(thingOrThings: T | T[]): T[] {
  return Array.isArray(thingOrThings) ? thingOrThings : [thingOrThings];
}
