import * as React from "react";
import { assertUnreachable } from "./assertUnreachable";

export type As = React.ReactElement | keyof JSX.IntrinsicElements;

/**
 * Take an `as` value and make it into a `React.ReactElement`
 */
export function createElementFromAs(as: As): React.ReactElement {
  return React.isValidElement(as)
    ? as
    : typeof as === "string"
    ? React.createElement(as)
    : assertUnreachable(as);
}
