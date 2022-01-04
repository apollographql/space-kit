import { Plugin } from "tippy.js";

// @see https://atomiks.github.io/tippyjs/misc/#onmouserest-implementation

export const mouseRest: Plugin = {
  name: "mouseRest",
  defaultValue: false,
  fn(instance) {
    const { reference } = instance;
    const DEBOUNCE_MS = 80;

    let timeout: number | undefined;

    // If the `trigger` isn't `"mouseenter"`, then this plugin doesn't apply.
    function getIsEnabled() {
      const isEnabled =
        !instance.props.interactive &&
        instance.props.trigger.indexOf("mouseenter") !== -1;

      return isEnabled;
    }

    return {
      onCreate() {
        if (!getIsEnabled()) {
          return;
        }

        const triggerWithoutMouseEnter = instance.props.trigger
          .replace("mouseenter", "")
          .trim();

        instance.setProps({ trigger: triggerWithoutMouseEnter });

        reference.addEventListener("mousemove", () => {
          clearTimeout(timeout);
          timeout = window.setTimeout(() => instance.show(), DEBOUNCE_MS);
        });

        reference.addEventListener("mouseleave", () => {
          clearTimeout(timeout);
          instance.hide();
        });
      },
      onDestroy() {
        clearTimeout(timeout);
      },
    };
  },
};
