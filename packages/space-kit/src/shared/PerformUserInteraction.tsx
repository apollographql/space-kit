import React from "react";

interface PerformUserInteractionProps {
  /**
   * Callback to call with `setImmediate`. Rendering will always be async, so
   * you should not expect your dom to be rendered when the callback is fired.
   * Use async
   * [`findBy*`](https://testing-library.com/docs/dom-testing-library/api-queries#findby)
   * methods in
   * [`@testing-library/dom`](https://github.com/testing-library/dom-testing-library)
   * to find elements you want to interact with
   */
  callback: () => Promise<void>;
}

/**
 * Test component to execute a callback after rendering has begun.
 *
 * Renders will always be async, so you should use the async
 * [`findBy*`](https://testing-library.com/docs/dom-testing-library/api-queries#findby)
 * methods in
 * [`@testing-library/dom`](https://github.com/testing-library/dom-testing-library)
 */
export const PerformUserInteraction: React.FC<PerformUserInteractionProps> = ({
  callback,
  children,
}) => {
  React.useEffect(() => {
    setImmediate(callback);
  });

  return <>{children}</>;
};
