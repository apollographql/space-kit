import "../../node_modules/tippy.js/animations/shift-away.css";
import React from "react";
import { AbstractTooltip, AbstractTooltipProps } from "../AbstractTooltip";

type Props = Pick<
  React.ComponentProps<typeof AbstractTooltip>,
  "children" | "content" | "disabled"
> &
  AbstractTooltipProps;

/**
 * Display a non-interactive tooltip after an element is clicked on and then
 * remove the tooltip after a short period of time
 */
export const ConfirmationTooltip: React.FC<Props> = ({
  children,
  ...props
}) => {
  /**
   * Store result of `useTimeout` so we can cancel the timeout if this component
   * is unmounted before the timeout fires
   */
  const timeoutRef = React.useRef<number | null>(null);

  // When this component is being unmounted, remove the timeout if one exists.
  // This will prevent trying to call methods on destroyed components
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <AbstractTooltip
      trigger="click"
      {...props}
      onShow={(instance) => {
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
          instance.hide();
        }, 3000);
      }}
      onHide={() => {
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = null;
      }}
    >
      {children}
    </AbstractTooltip>
  );
};
