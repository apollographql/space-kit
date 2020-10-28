import { Modifier } from "@popperjs/core";

export const matchTriggerWidth: Modifier<"matchTriggerWidth", unknown> = {
  name: "matchTriggerWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  requiresIfExists: ["flip", "maxSize"],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }) => {
    state.elements.popper.style.width = `${
      (state.elements.reference as HTMLElement).offsetWidth
    }px`;
    const tippyBox = state.elements.popper.querySelector<HTMLElement>(
      ".tippy-box"
    );
    if (tippyBox) {
      tippyBox.style.minWidth = "0";
    }
  },
};
