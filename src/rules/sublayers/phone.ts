import { LayerCommand, LayerKeySublayer, showOutput } from "../../utils";

const PHONE_HOST = "phone.home";

/**
 * Phone shortcuts
 */
export const phoneLayer: LayerKeySublayer = {
  return_or_enter: phonePost("ring/us", "Ring the phone"),
  delete_or_backspace: phonePost("ring/stop", "Stop the phone ringing"),
  5: phonePostWithDisplay("timer/5m", "Set a 5 minute timer"),
  s: phoneGet("ring/status", "Show ring status"),
  l: phonePost("ring/chirp/1", "Chirp the phone"),
  c: phonePostWithDisplay("timer/cancel", "Cancel running timer"),
};

function phonePost(endpoint: string, description: string): LayerCommand {
  return {
    to: [{ shell_command: `curl -X POST http://${PHONE_HOST}/${endpoint}` }],
    description,
  };
}

function phonePostWithDisplay(endpoint: string, description: string): LayerCommand {
  return showOutput(`curl -s -X POST http://${PHONE_HOST}/${endpoint}`, description);
}

function phoneGet(endpoint: string, description: string): LayerCommand {
  return showOutput(`curl -s http://${PHONE_HOST}/${endpoint}`, description);
}
