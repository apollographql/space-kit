/** @jsx jsx */
/** @jsxFrag React.Fragment */
import * as React from "react";
import * as typography from "../typography";
import { colors } from "../colors";
import { css, jsx } from "@emotion/core";
import { IconInfo } from "../icons/IconInfo";
import { useFormControlInternalContext } from "../shared/FormControlContext";

interface Props {
  children: React.ReactNode;
  className?: string;
  /**
   * Indicates to show the blue (i) icon
   */
  showIcon?: boolean;
}

/**
 * Component to render a helper text
 *
 * This is intended to be rendered below `<FormControl>`. If this is rendered on
 * it's own; it will render `children` without any modification.
 */
export const FormHelperText: React.FC<Props> = ({
  children,
  className,
  showIcon = false,
}) => {
  const { setHelper } = useFormControlInternalContext();

  const element = React.useMemo(() => {
    return (
      <div
        className={className}
        css={css({
          ...typography.base.small,
          color: colors.grey.base,
          display: "flex",
        })}
      >
        {showIcon ? (
          <IconInfo
            css={{
              height: 15,
              marginRight: 8,
              position: "relative",
              top: 2,
              width: 15,
            }}
          />
        ) : null}

        <div>{children}</div>
      </div>
    );
  }, [className, showIcon, children]);

  React.useLayoutEffect(() => {
    // This will cause a bug if you change the `error` prop
    setHelper?.(element);

    return () => setHelper?.(null);
  }, [element, setHelper]);

  // If `setHelper` exists then we're rendering this under the form control
  // context provider. `FormControl` will pull that element from the context and
  // insert into the layout, so return `null`.
  return setHelper ? null : element;
};
