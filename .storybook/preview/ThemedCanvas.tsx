import React from "react";
import { ClassNames } from "@emotion/core";
import { colors } from "../../src/colors";
import { assertUnreachable } from "../../src/shared/assertUnreachable";
import { Canvas } from "@storybook/addon-docs/dist/blocks/Canvas";

interface ThemedCanvasProps extends React.ComponentProps<typeof Canvas> {
  noFlexbox?: boolean;

  /**
   * Space Kit specific theme to render the preview with.
   *
   * Remember, this will only affect the preview pane, not the storybook
   * stories. Stories must also include themed backgrounds
   */
  theme?: "light" | "dark";
}

/**
 * Component wrapping the built-in Storybook Addons Plugin Canvas so we can add
 * a theme-specific className.
 */
export const ThemedCanvas: React.FC<ThemedCanvasProps> = ({
  noFlexbox = false,
  theme = "light",
  ...props
}) => {
  return (
    <ClassNames>
      {({ css, cx }) => (
        <Canvas
          {...props}
          className={cx(
            props.className,
            theme === "light"
              ? null
              : theme === "dark"
              ? css({
                  backgroundColor: colors.midnight.darkest,
                  color: colors.white,
                })
              : assertUnreachable(theme),
            noFlexbox &&
              css({
                "> * > * > *": {
                  display: "block !important",
                  // These margins counteract the forced 10 pixel border added
                  marginTop: -10,
                  marginBottom: -10,
                },
              })
          )}
        />
      )}
    </ClassNames>
  );
};
