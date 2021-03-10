/** @jsx jsx */
/** @jsxFrag React.Fragment */
import * as React from "react";
import * as typography from "../typography";
import { colors } from "../colors";
import { css, jsx } from "@emotion/react";
import { useFormControlInternalContext } from "../shared/FormControlContext";
import { IconWarningSolid } from "../icons/IconWarningSolid";

interface Props {
  children: React.ReactNode;
  className?: string;
}

/**
 * Component to render a form's error message
 *
 * This is intended to be rendered below `<FormControl>`. If this is rendered on
 * it's own; it will render `children` without any modification.
 */
export const FormErrorMessage: React.FC<Props> = ({ children, className }) => {
  const {
    feedbackId,
    setErrorMessageElement,
  } = useFormControlInternalContext();

  const element = React.useMemo(() => {
    return (
      <div
        className={className}
        css={css({
          ...typography.base.small,
          color: colors.red.base,
          display: "flex",
        })}
        aria-live="polite"
        id={feedbackId}
      >
        <IconWarningSolid
          css={{
            height: 15,
            marginRight: 8,
            position: "relative",
            top: 2,
            width: 15,
          }}
        />

        <div>{children}</div>
      </div>
    );
  }, [className, feedbackId, children]);

  React.useLayoutEffect(() => {
    setErrorMessageElement?.(element);

    return () => {
      // Clear the element to clean up after ourself. If we are merely changing,
      // then another `set` will be called quickly enough where this won't
      // flicker the content.
      setErrorMessageElement?.(null);
    };
  }, [setErrorMessageElement, element]);

  // If `setErrorMessageElement` exists then we're rendering this under the form control
  // context provider. `FormControl` will pull that element from the context and
  // insert into the layout, so return `null`.
  return setErrorMessageElement ? null : element;
};
