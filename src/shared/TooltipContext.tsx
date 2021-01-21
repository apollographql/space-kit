import * as React from "react";

interface State {
  descendsFromTooltip: boolean;
}

const defaultState: State = {
  descendsFromTooltip: false,
};

const TooltipContext = React.createContext<State | undefined>(undefined);

/**
 * Component to indicate to descentent components that they are wrapped by a
 * `Tooltip`.
 */
export const TooltipContextProvider: React.FC<Partial<State>> = ({
  children,
  descendsFromTooltip,
}) => {
  const state = React.useMemo(
    () => ({
      descendsFromTooltip:
        descendsFromTooltip ?? defaultState.descendsFromTooltip,
    }),
    [descendsFromTooltip],
  );

  return (
    <TooltipContext.Provider value={state}>{children}</TooltipContext.Provider>
  );
};

/**
 * Hook to extract values of `TooltipContext` with defaults applied.
 *
 * This will _not_ `throw` if used outside of a `TooltipContextProvider`.
 */
export function useTooltipContext(): State {
  return React.useContext(TooltipContext) ?? defaultState;
}
