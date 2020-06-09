import React from "react";
import { ListConfigProvider } from "../ListConfig";

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
  return (
    <ListConfigProvider {...props}>
      <div className={className} style={style}>
        {children}
      </div>
    </ListConfigProvider>
  );
};
