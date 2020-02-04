import React from "react";

/**
 * Enumeration of all icon sizes
 *
 * This uses string literals instead of a TypeScript union so we can use
 * strings, like `"small"`, for props instead of `IconSize.small`
 */
export type IconSize = "small" | "normal";

const MenuIconSizeContext = React.createContext<IconSize | undefined>(
  undefined
);

interface Props {
  /**
   * Icon size to use for all descendents
   */
  iconSize: IconSize;
}

/**
 * Provider to set `IconSize` on the context
 *
 * This value is immutable; it's defined when instantiated
 */
export const MenuIconSizeProvider: React.FC<Props> = ({
  children,
  iconSize,
}) => {
  return (
    <MenuIconSizeContext.Provider value={iconSize}>
      {children}
    </MenuIconSizeContext.Provider>
  );
};

interface withMenuIconSizeProps {
  /**
   * Render prop function. Calls the callback in the shape of `{ iconSize:
   * IconSize }`
   */
  children: (renderPropValues: { iconSize: IconSize }) => ReturnType<React.FC>;
}

/**
 * Extract `IconSize` from context.
 *
 * *Avoid this component.* This is intended to be used _only_ in the case where
 * you can't use hooks because you're rendering something under another render
 * prop component.
 */
export const WithMenuIconSize: React.FC<withMenuIconSizeProps> = ({
  children,
}) => (
  <MenuIconSizeContext.Consumer>
    {iconSize => children({ iconSize: iconSize || "normal" })}
  </MenuIconSizeContext.Consumer>
);

/**
 * Extract `IconSize` from context
 *
 * Uses a reasonable default as we don't require any consumer to use
 * `IconSizeProvider`
 */
export function useMenuIconSize(): IconSize {
  const iconSize = React.useContext(MenuIconSizeContext);

  return iconSize ?? "normal";
}
