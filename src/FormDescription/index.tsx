/** @jsx jsx */
/** @jsxFrag React.Fragment */
import * as React from "react";
import * as typography from "../typography";
import { css, jsx } from "@emotion/core";
import { colors } from "../colors";
import { useFormControlInternalContext } from "../shared/FormControlContext";

interface Props
  extends Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "className" | "style" | "id"
  > {
  children: React.ReactNode;
}

/**
 * Component to render a form description.
 *
 * If this component is rendered in the children of `FormControl`, then
 * `FormControl` will render this element in it's layout. Otherwise, it's
 * rendered as-is.
 */
export const FormDescription: React.FC<Props> = ({
  children,
  className,
  id,
  style,
}) => {
  const { descriptionId, setDescription } = useFormControlInternalContext();

  const element = React.useMemo(
    () => (
      <div
        className={className}
        css={css({
          ...typography.base.small,
          color: colors.black.base,
          fontWeight: "normal",
        })}
        id={descriptionId || id}
        style={style}
      >
        {children}
      </div>
    ),
    [children, className, descriptionId, id, style],
  );

  React.useLayoutEffect(() => {
    setDescription?.(element);
  }, [element, setDescription]);

  return setDescription ? null : element;
};
