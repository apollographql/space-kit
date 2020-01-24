/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import { AbstractTooltip } from "../AbstractTooltip";
import { TippyMenuStyles } from "./menu/TippyMenuStyles";
import {
  IconSize,
  MenuIconSizeProvider,
  useMenuIconSize,
} from "../MenuIconSize";
import { Instance, ReferenceElement } from "tippy.js";

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
  > {
  className?: string;

  /**
   * Optionally set the icon size to use for all `MenuItem` descendents. This
   * value will automatically be passed down via context and can be overriden by
   * child `Menu` components
   *
   * Is inherited by antecedent definitions
   *
   * @default "normal"
   */
  iconSize?: IconSize;

  /**
   * Popper instance reference
   *
   * You'll need this to be able to call methods on the popper instance itself,
   * such as wishing to hide the menu when a user clicks something.
   *
   * When using TypeScript, use this to create your own refs:
   *
   * ```tsx
   * const menuInstanceRef = React.useRef<
   *   NonNullable<React.ComponentProps<typeof Menu>['instanceRef']>['current']
   * >()
   * ```
   */
  instanceRef?: React.MutableRefObject<
    | Parameters<
        NonNullable<React.ComponentProps<typeof AbstractTooltip>["onCreate"]>
      >[0]
    | undefined
  >;

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
  iconSize,
  instanceRef,
  scrollableContent = false,
  ...props
}) => {
  const inheritedIconSize = useMenuIconSize();

  return (
    <MenuIconSizeProvider iconSize={iconSize ?? inheritedIconSize}>
      <TippyMenuStyles />
      <AbstractTooltip
        appendTo="parent"
        onCreate={instance => {
          if (instanceRef) {
            instanceRef.current = instance;
          }
        }}
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
              fn: data => {
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
    </MenuIconSizeProvider>
  );
};
