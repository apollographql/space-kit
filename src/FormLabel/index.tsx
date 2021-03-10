/** @jsx jsx */
/** @jsxFrag React.Fragment */
import * as React from "react";
import * as typography from "../typography";
import { css, jsx } from "@emotion/react";
import { useFormControlInternalContext } from "../shared/FormControlContext";

interface Props
  extends Pick<
    React.DetailedHTMLProps<
      React.LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >,
    "aria-invalid" | "className" | "style" | "id" | "htmlFor"
  > {
  children: React.ReactNode;
}

/**
 * Component to render a form label.
 *
 * If this component is rendered in the children of `FormControl`, then
 * `FormControl` will render this element in it's layout. Otherwise, it's
 * rendered as-is.
 */
export const FormLabel: React.FC<Props> = ({
  "aria-invalid": ariaInvalid,
  children,
  className,
  htmlFor,
  id,
  style,
}) => {
  const {
    errorMessageElement,
    setLabel,
    labelId,
    id: inputId,
    description,
  } = useFormControlInternalContext();

  const element = React.useMemo(
    () => (
      <label
        aria-invalid={ariaInvalid ?? (errorMessageElement ? true : undefined)}
        id={id ?? labelId}
        htmlFor={htmlFor ?? inputId}
        style={style}
        className={className}
        css={css({
          ...typography.base.base,
          display: "inline-block",
          marginBottom: description ? 4 : 0,
          fontWeight: 600,
        })}
      >
        {children}
      </label>
    ),
    [
      ariaInvalid,
      children,
      className,
      description,
      errorMessageElement,
      htmlFor,
      id,
      inputId,
      labelId,
      style,
    ],
  );

  React.useLayoutEffect(() => {
    setLabel?.(element);

    return () => setLabel?.(null);
  }, [element, setLabel]);

  return setLabel ? null : element;
};
