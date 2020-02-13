/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

const MenuItemClickListenerContext = React.createContext<
  React.MouseEventHandler | undefined
>(undefined);

interface Props {
  onClick: React.MouseEventHandler;
}

export const MenuItemClickListenerProvider: React.FC<Props> = ({
  children,
  onClick,
}) => {
  return (
    <MenuItemClickListenerContext.Provider value={onClick}>
      {children}
    </MenuItemClickListenerContext.Provider>
  );
};

interface withMenuItemClickListenerProps {
  /**
   * Render prop function. Calls the callback in the shape of `{ iconSize:
   * IconSize }`
   */
  children: (renderPropValues: {
    onClick: React.MouseEventHandler | undefined;
  }) => ReturnType<React.FC>;
}

/**
 * Extract `IconSize` from context.
 *
 * *Avoid this component.* This is intended to be used _only_ in the case where
 * you can't use hooks because you're rendering something under another render
 * prop component.
 */
export const WithMenuIconSize: React.FC<withMenuItemClickListenerProps> = ({
  children,
}) => (
  <MenuItemClickListenerContext.Consumer>
    {onClick => children({ onClick })}
  </MenuItemClickListenerContext.Consumer>
);

/**
 * Extract menu item click handler from context
 */
export function useMenuItemClickListener():
  | React.MouseEventHandler
  | undefined {
  const onClick = React.useContext(MenuItemClickListenerContext);

  return onClick;
}
