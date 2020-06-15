/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { ListConfigProvider, useListConfig } from "../ListConfig";
import { verticalListMarginFromPadding } from "../shared/verticalListMarginFromPadding";

interface Props
  extends Omit<React.ComponentProps<typeof ListConfigProvider>, "children">,
    Pick<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      "style" | "className"
    > {}

export const List: React.FC<Props> = ({
  children,
  className,
  style,
  ...props
}) => {
  /**
   * Combination of inherited configuration and new configuration passed via
   * props
   */
  const listConfig: ReturnType<typeof useListConfig> = {
    ...useListConfig(),
    ...props,
  };

  const verticalMargin = -verticalListMarginFromPadding(listConfig.padding) / 2;

  return (
    <ListConfigProvider {...listConfig}>
      <div
        className={className}
        style={style}
        css={css({
          marginTop: verticalMargin,
          marginBottom: verticalMargin,
        })}
      >
        {children}
      </div>
    </ListConfigProvider>
  );
};
