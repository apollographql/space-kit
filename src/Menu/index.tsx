/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import { AbstractTooltip } from "../AbstractTooltip";
import { TippyMenuStyles } from "./menu/TippyMenuStyles";
import { MenuConfigProvider, useMenuIconSize } from "../MenuConfig";
import {
  MenuItemClickListenerProvider,
  useMenuItemClickListener,
} from "../MenuItemClickListener";
import { sizeModifier } from "./menu/sizeModifier";
import { ShadedColor } from "../colors";

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
    Omit<React.ComponentProps<typeof MenuConfigProvider>, "children"> {
  className?: string;

  /**
   * Close menu automatically when a `MenuItem` is clicked
   *
   * @default true
   */
  closeOnMenuItemClick?: boolean;

  /**
   * Color to use for the selected state of a menu item. Hover state will be
   * programatically calculated depending on the theme.
   */
  color?: ShadedColor;

  style?: React.CSSProperties;

  /**
   * Theme of the menu
   *
   * This will be used to calculate the shade of the hover color for menu items.
   */
  theme?: "light" | "dark";
}

/**
 * Menu element
 */
export const Menu: React.FC<Props> = ({
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
  const inheritedIconSize = useMenuIconSize();

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
    <MenuConfigProvider
      color={color}
      iconSize={iconSize ?? inheritedIconSize}
      theme={theme}
    >
      <TippyMenuStyles />
      <AbstractTooltip
        appendTo="parent"
        offset={[0, 2]}
        onCreate={(instance) => {
          instanceRef.current = instance;
        }}
        content={
          <MenuItemClickListenerProvider onClick={onMenuItemClick}>
            {content}
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
    </MenuConfigProvider>
  );
};
