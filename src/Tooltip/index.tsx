import React from "react";
import { mouseRest } from "./tooltip/mouseRestPlugin";
import { AbstractTooltip, AbstractTooltipProps } from "../AbstractTooltip";

type Props = Pick<
  React.ComponentProps<typeof AbstractTooltip>,
  "children" | "content" | "interactive" | "className"
> &
  AbstractTooltipProps;

/**
 * Tooltip
 *
 * Intended to show non-essential, non-interactive information after a short
 * delay when hovering on an element. We also wait for the user's cursor to rest
 * on the element; meaning we won't show a Tooltip while the cursor is moving
 */
export const Tooltip: React.FC<Props> = ({ children, ...props }) => {
  return (
    <AbstractTooltip
      delay={150}
      trigger="mouseenter"
      plugins={[mouseRest]}
      {...props}
    >
      {children}
    </AbstractTooltip>
  );
};
