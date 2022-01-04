import React from "react";
import { assertUnreachable } from "./assertUnreachable";
import { ListConfigProvider } from "../ListConfig";

export function verticalListMarginFromPadding(
  padding: NonNullable<
    React.ComponentProps<typeof ListConfigProvider>["padding"]
  >,
): number {
  return padding === "normal"
    ? 0
    : padding === "relaxed"
    ? 10
    : assertUnreachable(padding);
}
