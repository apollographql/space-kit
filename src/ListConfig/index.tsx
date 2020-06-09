import React from "react";
import { colors, ShadedColor } from "../colors";

/**
 * Enumeration of all icon sizes
 *
 * This uses string literals instead of a TypeScript union so we can use
 * strings, like `"small"`, for props instead of `IconSize.small`
 */
type IconSize = "small" | "normal";

interface ListConfig {
  /**
   * Color of the list. This will be used to programtically alter hover,
   * selected, and text colors
   *
   * @default "inherit"
   */
  color: ShadedColor;

  /**
   * Icon size to use for all descendents
   */
  iconSize: IconSize;
}

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

interface withlistIconSizeProps {
  /**
   * Render prop function. Calls the callback in the shape of
   *
   * ```jsx
   * { iconSize: IconSize }
   * ```
   */
  children: (
    renderPropValues: Pick<ListConfig, "iconSize">
  ) => ReturnType<React.FC>;
}

/**
 * Extract `IconSize` from context.
 *
 * *Avoid this component.* Use `useListIconSize` instead. This is intended to be
 * used _only_ in the case where you can't use hooks because you're rendering
 * something under another render prop component.
 */
export const WithlistIconSize: React.FC<withlistIconSizeProps> = ({
  children,
}) => (
  <ListConfigContext.Consumer>
    {(config) => children({ iconSize: config?.iconSize ?? "normal" })}
  </ListConfigContext.Consumer>
);

function useListConfig() {
  return React.useContext(ListConfigContext);
}

/**
 * Extract color from list config context
 *
 * Uses a reasonable default as we don't require any consumer to use
 * `ListConfigProvider`
 */
export function useListColor(): ListConfig["color"] {
  return useListConfig()?.color ?? colors.blue.base;
}

/**
 * Extract `IconSize` from context
 *
 * Uses a reasonable default as we don't require any consumer to use
 * `IconSizeProvider`
 */
export function useListIconSize(): ListConfig["iconSize"] {
  return useListConfig()?.iconSize ?? "normal";
}
