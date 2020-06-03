/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import { AbstractTooltip } from "../AbstractTooltip";
import { TippyPopupMenuStyles } from "./popupMenu/TippyPopupMenuStyles";
import {
  MenuItemClickListenerProvider,
  useMenuItemClickListener,
} from "../MenuItemClickListener";
import { sizeModifier } from "./popupMenu/sizeModifier";
import { Menu } from "../Menu";

interface Props
  extends Pick<
      React.ComponentProps<typeof AbstractTooltip>,
      | "children"
      | "content"
      | "maxWidth"
      | "placement"
      | "trigger"
      | "fallbackPlacements"
      | "popperOptions"
    >,
    Omit<React.ComponentProps<typeof Menu>, "children"> {
  /**
   * `className` to apply to the
   * [`tippyjs-react`](https://github.com/atomiks/tippyjs-react) tooltip. @see
   * https://github.com/atomiks/tippyjs-react#classname-string
   */
  className?: string;
  style?: React.CSSProperties;

  /**
   * Close menu automatically when a `MenuItem` is clicked
   *
   * @default true
   */
  closeOnMenuItemClick?: boolean;
}

/**
 * Component that wraps `Menu` and adds popup functionality
 *
 * All props of `Menu` are included as a convenience and not required. You can
 * choose to wrap `content` with `Menu` if you'd like because `Menu` does not
 * add anything to the DOM and `Menu` does not have any defaults, so nested
 * `Menu`s do not override values unless they are explicitly set.
 */
export const PopupMenu: React.FC<Props> = ({
  children,
  closeOnMenuItemClick = true,
  color,
  fallbackPlacements,
  iconSize,
  content,
  popperOptions,
  theme,
  ...props
}) => {
  const instanceRef = React.useRef<
    Parameters<
      NonNullable<React.ComponentProps<typeof AbstractTooltip>["onCreate"]>
    >[0]
  >();
  const inheritedMenuItemClickListener = useMenuItemClickListener();

  /**
   * Callback to handle descendeant `MenuItem` clicks.
   *
   * When we have nested menus and toggle menus we might need to change how this
   * behaves.
   */
  const onMenuItemClick = React.useCallback<React.MouseEventHandler>(
    (event) => {
      if (inheritedMenuItemClickListener) {
        inheritedMenuItemClickListener(event);
      }

      if (closeOnMenuItemClick) {
        instanceRef.current?.hide();
      }
    },
    [closeOnMenuItemClick, inheritedMenuItemClickListener, instanceRef]
  );

  return (
    <>
      <TippyPopupMenuStyles />
      <AbstractTooltip
        appendTo="parent"
        offset={[0, 2]}
        onCreate={(instance) => {
          instanceRef.current = instance;
        }}
        content={
          <MenuItemClickListenerProvider onClick={onMenuItemClick}>
            <Menu color={color} iconSize={iconSize} theme={theme}>
              {content}
            </Menu>
          </MenuItemClickListenerProvider>
        }
        hideOnClick
        theme="space-kit-menu"
        trigger="mousedown"
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
        {children}
      </AbstractTooltip>
    </>
  );
};
