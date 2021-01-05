/** @jsx jsx */
/** @jsxFrag React.Fragment */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import { useFormControlInternalContext } from "../shared/FormControlContext";

/**
 * Component to render a end adornment.
 *
 * This is intended to be rendered below `<FormControl>`. If this is rendered on
 * it's own; it will render `children` without any modification.
 */
export function FormEndAdornment({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): React.ReactNode {
  const { setEndAdornment } = useFormControlInternalContext();

  const element = React.useMemo(
    () => (
      <div
        css={css({
          display: "inline-flex",
          position: "absolute",
          right: 12,
          textAlign: "right",
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
    setEndAdornment?.(element);
  }, [element, setEndAdornment]);

  return setEndAdornment ? null : element;
}
