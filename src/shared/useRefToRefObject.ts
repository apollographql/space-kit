import React from "react";

type Maybe<T> = T | null;

/**
 * Accept a `React.Ref` and return a `React.RefObject`
 *
 * `react-spectrum` requires
 * `ref` to be a `RefObject` (not a `MutableRefObject`, FYI), and forward ref
 * components accept both ref functions and ref objects. This will pass through
 * a ref object, create a ref object with a `set` function and use that to
 * capture `current` being set and call the ref function, and lastly just return
 * a new `RefObject` if there was no passed `ref`.
 */
export function useRefToRefObject<T extends HTMLElement>(
  /**
   * Source ref
   *
   * This must match the type of the `ref` argument in the `forwardRef` function.
   */
  ref: React.Ref<T>
): React.RefObject<T> {
  return React.useMemo(() => {
    let value: Maybe<T> = null;

    if (ref && typeof ref === "object") {
      // `ref` is a `RefObject`, just return it.
      return ref;
    }

    // Create a simulated `RefObject` that will intercept setting `current` and
    // forward calls to a `ref` function.
    return {
      set current(current: Maybe<T>) {
        value = current;

        if (typeof ref === "function") {
          ref(current);
        }
      },
      get current(): Maybe<T> {
        return value;
      },
    };
  }, [ref]);
}
