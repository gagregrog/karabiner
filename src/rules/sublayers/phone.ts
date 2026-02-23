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
  t: phoneTimerPrompt(),
};

function phoneTimerPrompt(): LayerCommand {
  const dialog = `osascript -e 'set t to text returned of (display dialog "Enter timer duration (e.g. 5m, 1h30m):" default answer "" with title "Phone Timer")'`;
  return showOutput(
    `T=$(${dialog}) && ${phoneCurl("timer/$T", true)}`,
    "Set a custom timer"
  );
}

function phonePostWithDisplay(
  endpoint: string,
  description: string
): LayerCommand {
  return showOutput(phoneCurl(endpoint, true), description);
}

function phonePost(endpoint: string, description: string): LayerCommand {
  return {
    to: [{ shell_command: phoneCurl(endpoint, true) }],
    description,
  };
}

function phoneGet(endpoint: string, description: string): LayerCommand {
  return showOutput(phoneCurl(endpoint), description);
}

function phoneCurl(endpoint: string, post = false): string {
  const method = post ? "-X POST " : "";
  return `curl -s ${method}http://${PHONE_HOST}/${endpoint}`;
}
