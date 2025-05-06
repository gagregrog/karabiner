import { LayerCommand, LayerKeySublayer } from "../../utils";

const UP = "4" as const;
const DOWN = "1" as const;

const JARVIS_SERIAL_LOCAL = "jarvis.home";

/**
 * Desk shortcuts via jarviasSerial adapter
 */
export const deskLayer: LayerKeySublayer = {
  n: deskGoToPreset(DOWN),
  e: deskGoToPreset(UP),
};

function deskGoToPreset(preset: typeof UP | typeof DOWN): LayerCommand {
  return {
    to: [{ shell_command: `curl -d "" ${JARVIS_SERIAL_LOCAL}/goto/${preset}` }],
    description: `Move Jarvis Desck ${preset === UP ? "up" : "down"}`,
  };
}
