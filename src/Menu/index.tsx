/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import { AbstractTooltip } from "../AbstractTooltip";
import { TippyMenuStyles } from "./menu/TippyMenuStyles";
import { MenuConfigProvider, useMenuIconSize } from "../MenuConfig";
import { Instance, ReferenceElement } from "tippy.js";
import {
  MenuItemClickListenerProvider,
  useMenuItemClickListener,
} from "../MenuItemClickListener";

interface Props
  extends Pick<
      React.ComponentProps<typeof AbstractTooltip>,
      | "children"
      | "content"
      | "flip"
      | "flipBehavior"
      | "flipOnUpdate"
      | "maxWidth"
      | "placement"
      | "trigger"
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
   * Determines if the content should be given a max-height so it can be
   * scrolled
   */
  scrollableContent?: boolean;

  style?: React.CSSProperties;
}

/**
 * Given an popper `Instance`, calculate the maximum height popper can take
 */
function calculateMaxHeight(instance: Instance) {
  const parentHeight =
    instance.props.appendTo === "parent"
      ? (instance.reference as any).offsetParent.offsetHeight
      : document.body.clientHeight;

  const {
    height: referenceHeight,
    top: referenceTop,
  } = instance.reference.getBoundingClientRect();

  const {
    height: arrowHeight,
  } = instance.popperChildren.arrow?.getBoundingClientRect() ?? { height: 0 };

  const { distance } = instance.props;

  return (
    parentHeight -
    referenceTop -
    referenceHeight -
    arrowHeight -
    parseFloat(getComputedStyle(instance.popperChildren.tooltip).paddingTop) -
    parseFloat(
      getComputedStyle(instance.popperChildren.tooltip).paddingBottom
    ) -
    (typeof distance === "number" ? distance : 0) -
    // Margin from bottom of the page
    5
  );
}

function isReferenceObject(reference: any): reference is ReferenceElement {
  return typeof (reference as ReferenceElement)._tippy !== "undefined";
}

/**
 * Menu element
 */
export const Menu: React.FC<Props> = ({
  children,
  closeOnMenuItemClick = true,
  iconSize,
  scrollableContent = false,
  content,
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
    <MenuConfigProvider iconSize={iconSize ?? inheritedIconSize}>
      <TippyMenuStyles />
      <AbstractTooltip
        appendTo="parent"
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
          positionFixed: true,
          modifiers: {
            preventOverflow: {
              boundariesElement: "window",
              // This will ensure that the menu is correctly placed when a
              // parent is using an overflow container @see
              // https://github.com/popperjs/popper-core/issues/535#issuecomment-361628222
              escapeWithReference: true,
            },
            setMaxHeight: {
              enabled: scrollableContent,
              order: 0,
              fn: (data) => {
                const reference = data.instance.reference;
                if (isReferenceObject(reference) && reference._tippy) {
                  const tippy = reference._tippy;
                  const calculatedMaxHeight = calculateMaxHeight(tippy);
                  tippy.popperChildren.content.style.maxHeight = `${calculatedMaxHeight}px`;
                }
                return data;
              },
            },
          },
        }}
        {...props}
        interactive
      >
        {children}
      </AbstractTooltip>
    </MenuConfigProvider>
  );
};
