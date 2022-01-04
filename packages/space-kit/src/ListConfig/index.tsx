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
   * Override the the default element used to render `endIcon`
   *
   * All props provided will be merged with props that this component adds,
   * including `className`s being merged.
   *
   * @default <div />
   */
  endIconAs: React.ReactElement;

  /**
   * Background color of the hovered item in a menu
   *
   * The text color will be determined automatically. `null` indicates we don't
   * want to show any different styling on hover.
   */
  hoverColor: ShadedColor | null;

  /**
   * Icon size to use for all descendents
   */
  iconSize: IconSize;

  /**
   * The margin to place around list items between the edge of the `List` and
   * other `ListItem`s. Using "none" will indicate that there is no margin for
   * an edge-to-edge feel.
   *
   * @default "auto"
   */
  margin: "auto" | "none";

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

  /**
   * Override the the default element used to render `startIcon`
   *
   * All props provided will be merged with props that this component adds,
   * including `className`s being merged.
   *
   * @default <div />
   */
  startIconAs: React.ReactElement;

  /**
   * Indicates if text should be truncated when it will overflow the boundary.
   * `true` incidates use an ellipsis and `false` indicates to allow line
   * breaks.
   *
   * @default true
   */
  truncate: boolean;
}

/**
 * Default values for each property
 */
export const defaults: ListConfig = {
  endIconAs: <div />,
  hoverColor: colors.silver.light,
  iconSize: "normal",
  margin: "auto",
  padding: "normal",
  selectedColor: colors.blue.base,
  startIconAs: <div />,
  truncate: true,
};

/**
 * Context holding all configuration options for lists
 */
const ListConfigContext = React.createContext<Partial<ListConfig> | undefined>(
  undefined,
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
