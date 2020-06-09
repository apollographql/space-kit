import React from "react";
import { ListConfigProvider, useListConfig } from "../ListConfig";

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

  return (
    <ListConfigProvider {...listConfig}>
      <div className={className} style={style}>
        {children}
      </div>
    </ListConfigProvider>
  );
};
