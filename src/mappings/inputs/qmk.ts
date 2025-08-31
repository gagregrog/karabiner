import { KeyCode } from "../../types";

export const QMK = {
  // expected chording inputs from QMK keyboards
  chords: {
    shift: "f24",
    command: "f23",
    alt: "f22",
  } satisfies Record<string, KeyCode>
}
