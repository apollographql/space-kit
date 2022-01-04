import React from "react";
import {
  useHasSpaceKitProvider,
  useSingletonComponent,
} from "../../SpaceKitProvider";

/**
 * Indicates that we have already warned the user of needing a
 * `SpaceKitProvider` once so we don't do it multiple times.
 */
let spaceKitProviderWarningIssued = false;

/**
 * Indicates that we have already warned the user of changing `children` on
 * re-renders
 */
let childrenChangedWarningIssued = false;

/**
 * Component used to communicate with SpaceKitProvider to ensure that instances
 * of this component rendered with the same `identity` will always result in a
 * single element in the DOM.
 *
 * If there is no SpaceKitProvider, print a warning and passthrough the
 * `children`
 *
 * This will assume that you don't actually care where the element is rendered
 * in the DOM.
 *
 * All changes to `children` will be ignored. A warning will be logged if
 * `children` changes. You should memoize `children` to avoid this warning.
 */
export const SingletonComponent: React.FC<{
  children: ReturnType<React.FC>;
  identity: string;
}> = ({ children, identity }) => {
  const hasSpaceKitProvider = useHasSpaceKitProvider();
  const { show, hide } = useSingletonComponent();
  const initialChildren = React.useRef(children);

  React.useEffect(() => {
    show({ identity, element: initialChildren.current });

    return () => {
      hide({ identity });
    };
  }, [initialChildren, hide, identity, show]);

  if (!hasSpaceKitProvider && !spaceKitProviderWarningIssued) {
    // eslint-disable-next-line no-console
    console.warn(
      "You must wrap your application with SpaceKitProvider to prevent repeated `<style />` tags being injected into the DOM.",
    );
    spaceKitProviderWarningIssued = true;
  }

  if (children !== initialChildren.current && !childrenChangedWarningIssued) {
    // eslint-disable-next-line no-console
    console.error(
      "All changes to `children` of `SingletonComponent` will be ignored. You should memoize the input.",
    );
    childrenChangedWarningIssued = true;
  }

  initialChildren.current = children;

  return hasSpaceKitProvider ? null : children;
};
