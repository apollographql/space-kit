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
   * Icon size to use for all descendents
   */
  iconSize: IconSize;

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
  iconSize: "normal",
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
 *
 * This value is immutable; it's defined when instantiated
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
