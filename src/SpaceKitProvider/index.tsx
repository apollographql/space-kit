import React from "react";

interface State {
  /**
   * Disable all JavaScript based animations
   *
   * This includes Framer Motion animations and manual css values.
   *
   * @default false
   */
  disableAnimations: boolean;

  singletonComponents: Record<
    string,
    {
      element: ReturnType<React.FC>;
      instanceCount: React.MutableRefObject<number>;
    }
  >;

  theme: "light" | "dark";
}

const defaultState: State = {
  disableAnimations: false,
  singletonComponents: {},
  theme: "light",
};

// This implementation is based on the excellent blog post by Kent C. Dodds on
// How to use React Context effectively:
// https://kentcdodds.com/blog/how-to-use-react-context-effectively

const SpaceKitStateContext = React.createContext<State | undefined>(undefined);
const SpaceKitSetContext = React.createContext<
  React.Dispatch<React.SetStateAction<State | undefined>> | undefined
>(undefined);

/**
 * Provider to set options on all Space Kit components
 *
 * This is completely optional; components will not have issues if this is
 * missing from the context.
 *
 * A good place to use this would be in your storybook configuration as a
 * decorator applied to all components if we're running inside of chromatic.
 */
export const SpaceKitProvider: React.FC<Partial<State>> = ({
  children,
  ...stateProps
}) => {
  const [state, setState] = React.useState<State | undefined>({
    ...defaultState,
    ...stateProps,
  });

  return (
    <SpaceKitStateContext.Provider value={state}>
      <SpaceKitSetContext.Provider value={setState}>
        {Object.entries(state?.singletonComponents ?? {}).map(
          ([identity, { element }]) => {
            return <React.Fragment key={identity}>{element}</React.Fragment>;
          },
        )}
        {children}
      </SpaceKitSetContext.Provider>
    </SpaceKitStateContext.Provider>
  );
};

/**
 * Hook to indicate if the current component is being rendered inside of a
 * `SpaceKitProvider`
 */
export function useHasSpaceKitProvider(): boolean {
  return !!React.useContext(SpaceKitStateContext);
}

/**
 * Hook to get the values from the Space Kit Provider with sensible defaults for
 * all the values.
 *
 * This component does _not_ require us to be wrapped with `SpaceKitProvider`
 */
export function useSpaceKitProvider(): Readonly<State> {
  const context = React.useContext(SpaceKitStateContext);

  if (context == null) {
    // Provide a default because consumers are not required to wrap their
    // components with our providers
    return defaultState;
  }

  return context;
}

/**
 * Hook intended to be used internally to communicate with `SpaceKitProvider`
 * indicating singleton components being mounted and unmounted.
 *
 * Use `show` to track when you show a component.
 *
 * Use `hide` to track when you remove a component.
 */
export function useSingletonComponent(): {
  hide: ({ identity }: { identity: string }) => void;
  show: ({
    identity,
    element,
  }: {
    identity: string;
    element: ReturnType<React.FC>;
  }) => void;
} {
  const setSpaceKitContext = React.useContext(SpaceKitSetContext);

  const hide = React.useCallback(
    ({ identity }: { identity: string }) => {
      setSpaceKitContext?.((state = defaultState) => {
        if (!state.singletonComponents[identity]) {
          // This should never happen; we should never be trying to decrement
          // something that isn't rendered.
          return state;
        }

        if (state.singletonComponents[identity].instanceCount.current === 1) {
          // This is the last instance; delete it from the component and return
          // a new state to trigger a re-render.
          const singletonComponentsCopy = { ...state.singletonComponents };
          delete singletonComponentsCopy[identity];

          return {
            ...state,
            singletonComponents: singletonComponentsCopy,
          };
        }

        // Decrement the instance count and return the original `state` so this
        // won't trigger a re-render.
        state.singletonComponents[identity].instanceCount.current -= 1;
        return state;
      });
    },
    [setSpaceKitContext],
  );

  const show = React.useCallback(
    ({
      identity,
      element,
    }: {
      identity: string;
      element: ReturnType<React.FC>;
    }) => {
      setSpaceKitContext?.((previousState = defaultState) => {
        if (!previousState.singletonComponents[identity]) {
          // This is the first time ths identity is being rendered. Create the
          // entry in `singletonComponents` and modify `state` to trigger a
          // re-render.
          return {
            ...previousState,
            singletonComponents: {
              ...previousState.singletonComponents,
              [identity]: { element, instanceCount: { current: 1 } },
            },
          };
        }

        // This identity exists. Increment the instanceCount and return the
        // original state to avoid a re-render.
        previousState.singletonComponents[identity].instanceCount.current += 1;
        return previousState;
      });
    },
    [setSpaceKitContext],
  );

  return { hide, show };
}
