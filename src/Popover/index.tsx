import React from "react";
import { AbstractTooltip } from "../AbstractTooltip";
import { TippyPopoverStyles } from "./popover/TippyPopoverStyles";
import { sizeModifier } from "./popover/sizeModifier";

interface Props
  extends Pick<
    React.ComponentProps<typeof AbstractTooltip>,
    | "children"
    | "content"
    | "maxWidth"
    | "placement"
    | "fallbackPlacements"
    | "popperOptions"
  > {
  className?: string;
  style?: React.CSSProperties;

  /**
   * Don't use `children`, use `trigger` instead
   */
  children?: never;
  /**
   * Element that will be monitored to trigger the popover
   */
  trigger: React.ComponentProps<typeof AbstractTooltip>["children"];
  /**
   * Events used to know when to trigger the popover
   *
   * @see https://atomiks.github.io/tippyjs/v6/all-props/#trigger
   */
  triggerEvents?: React.ComponentProps<typeof AbstractTooltip>["trigger"];
}

export const Popover: React.FC<Props> = ({
  fallbackPlacements,
  content,
  popperOptions,
  trigger,
  triggerEvents = "mousedown",
  ...props
}) => {
  const instanceRef = React.useRef<
    Parameters<
      NonNullable<React.ComponentProps<typeof AbstractTooltip>["onCreate"]>
    >[0]
  >();

  /**
   * Callback to handle descendent `ListItem` clicks.
   *
   * When we have nested lists and toggle lists we might need to change how this
   * behaves.
   */
  const handleClick = React.useCallback<React.MouseEventHandler>(
    (element) => {
      if (element.target === element.currentTarget) {
        // We're listening for clicks on descendents so ignore events that come
        // from the element with the listener.
        return;
      }

      // how do we know if we want to hide the list?
      instanceRef.current?.hide();
    },
    [instanceRef]
  );

  return (
    <>
      <TippyPopoverStyles />
      <AbstractTooltip
        appendTo="parent"
        offset={[0, 2]}
        onCreate={(instance) => {
          instanceRef.current = instance;
        }}
        content={<span onClick={handleClick}>{content}</span>}
        hideOnClick
        theme="space-kit-list"
        trigger={triggerEvents}
        popperOptions={{
          strategy: "fixed",
          ...popperOptions,
          modifiers: [
            // Disable `flip` because we're using our new version
            { name: "flip", enabled: false },
            {
              name: "findTippyBox",
              phase: "read",
              enabled: true,
              fn({ name, state }) {
                const element = state.elements.popper.querySelector<
                  HTMLElement
                >(".tippy-box");

                state.modifiersData[name].boxElement = element;
              },
            },
            sizeModifier,
            {
              name: "maxSize",
              requires: ["findTippyBox"],
              options: { padding: 7, fallbackPlacements },
            },
            {
              name: "applyMaxSize",
              enabled: true,
              phase: "beforeWrite",
              requires: ["maxSize", "findTippyBox"],
              fn({ state }) {
                const maxHeight = state.modifiersData.maxSize.height;

                /**
                 * We read this element in the `findTippyBox` phase. We need to
                 * use some custom logic here to apply the style to the tippy
                 * box because usually that's not made available. We _could_
                 * apply these styles directly to the `popper` element and, but
                 * then the border will be swallowed by the overflow. If we put
                 * the border on `popper`, then the border will not be animated
                 * because animations are applied to `.tippy-box`.
                 */
                const element: HTMLElement | null =
                  state.modifiersData.findTippyBox.boxElement;

                if (element) {
                  element.style.maxHeight = `${maxHeight}px`;
                  element.style.overflow = "auto";
                }
              },
            },
            // Modifiers later in the list override modifiers earlier in the
            // list, so we have to place this at the end so user-defined
            // modifiers can override space kit defined modifier configurations.
            ...(popperOptions?.modifiers || []),
          ],
        }}
        {...props}
        interactive
      >
        {trigger}
      </AbstractTooltip>
    </>
  );
};
