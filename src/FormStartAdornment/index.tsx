/** @jsx jsx */
/** @jsxFrag React.Fragment */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { useFormControlInternalContext } from "../shared/FormControlContext";

/**
 * Component to render a start adornment.
 *
 * This is intended to be rendered below `<FormControl>`. If this is rendered on
 * it's own; it will render `children` without any modification.
 */
export function FormStartAdornment({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): React.ReactNode {
  const { setStartAdornment } = useFormControlInternalContext();

  const element = React.useMemo(
    () => (
      <div
        css={css({
          position: "absolute",
          display: "inline-flex",
          left: 12,
          top: "50%",
          transform: "translateY(-50%)",
        })}
        className={className}
      >
        {children}
      </div>
    ),
    [children, className],
  );

  React.useLayoutEffect(() => {
    setStartAdornment?.(element);
  }, [element, setStartAdornment]);

  return setStartAdornment ? null : element;
}
