import React from "react";
import { ShadedColor, colors } from "../colors";

/**
 * Enumeration of all icon sizes
 *
 * This uses string literals instead of a TypeScript union so we can use
 * strings, like `"small"`, for props instead of `IconSize.small`
 */
type IconSize = "small" | "normal" | "large";

interface ListConfig {
  /**
   * Background color of the hovered item in a menu
   *
   * The text color will be determined automatically
   */
  hoverColor: ShadedColor;

  /**
   * Icon size to use for all descendents
   */
  iconSize: IconSize;

  /**
   * Padding level on menu items
   */
  padding: "normal" | "relaxed";

  /**
   * Background color of the selected item in a menu
   *
   * The text color will be determined automatically
   */
  selectedColor: ShadedColor;
}

/**
 * Default values for each property
 */
export const defaults: ListConfig = {
  hoverColor: colors.silver.light,
  iconSize: "normal",
  padding: "normal",
  selectedColor: colors.blue.base,
};

/**
 * Context holding all configuration options for lists
 */
const ListConfigContext = React.createContext<Partial<ListConfig> | undefined>(
  undefined
);

/**
 * Provider to set list config on the context
 */
export const ListConfigProvider: React.FC<Partial<ListConfig>> = ({
  children,
  ...props
}) => {
  return (
    <ListConfigContext.Provider value={props}>
      {children}
    </ListConfigContext.Provider>
  );
};

export function useListConfig(): ListConfig {
  return {
    ...defaults,
    ...(React.useContext(ListConfigContext) || {}),
  };
}
