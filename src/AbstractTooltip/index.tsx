import "../../node_modules/tippy.js/animations/shift-away.css";
import React from "react";
import Tippy from "@tippyjs/react";
import { Placement } from "tippy.js";
import { TippyStyles } from "./abstractTooltip/TippyStyles";
import { useSpaceKitProvider } from "../SpaceKitProvider";
import { matchTriggerWidth as matchTriggerWidthModifier } from "./abstractTooltip/matchTriggerWidth";
import classnames from "classnames";

type TippyProps = React.ComponentProps<typeof Tippy>;

export interface AbstractTooltipProps {
  /**
   * Fallback placements to use if the default placement clips the content.
   *
   * @see https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements
   */
  fallbackPlacements?: readonly Placement[];

  /**
   * Force the tooltip to be visible. Only use this for testing purposes; don't
   * use this to programatically control the component
   */
  forceVisibleForTestingOnly?: boolean;

  /**
   * Relaxed is intended for when your tooltip has a header and you need some
   * more space
   */
  padding?: "normal" | "relaxed";

  /**
   * Indicates that the popup list should match the width of the trigger
   * compoonent
   *
   * @default false
   */
  matchTriggerWidth?: boolean;
}

type Props = TippyProps &
  AbstractTooltipProps &
  ({ visible?: undefined } | { visible: boolean; trigger?: undefined });

export const AbstractTooltip: React.FC<Props> = ({
  animation = "shift-away",
  children,
  className,
  fallbackPlacements,
  forceVisibleForTestingOnly,
  padding = "normal",
  trigger,
  hideOnClick,
  matchTriggerWidth = false,
  popperOptions = {},
  visible,
  ...props
}) => {
  const {
    disableAnimations: disableAnimationsFromProvider,
  } = useSpaceKitProvider();
  const disableAnimations =
    disableAnimationsFromProvider || forceVisibleForTestingOnly;

  return (
    <>
      <TippyStyles />
      <Tippy
        animation={disableAnimations ? false : animation}
        arrow={false}
        hideOnClick={forceVisibleForTestingOnly ? false : hideOnClick}
        trigger={forceVisibleForTestingOnly ? "manual" : trigger}
        visible={forceVisibleForTestingOnly ? true : visible}
        theme="space-kit"
        popperOptions={{
          ...popperOptions,
          modifiers: [
            {
              name: "computeStyles",
              options: {
                gpuAcceleration: false,
              },
            },
            {
              name: "flip",
              options: {
                fallbackPlacements,
              },
            },
            {
              ...matchTriggerWidthModifier,
              enabled: matchTriggerWidth,
            },
            // This must be at the end because later modifiers override earlier
            // ones. @see
            // https://popper.js.org/docs/v2/faq/#how-do-i-set-modifier-defaults-and-allow-them-to-be-overridden
            ...(popperOptions.modifiers || []),
          ],
        }}
        {...props}
        className={classnames(className, {
          "space-kit-relaxed": padding === "relaxed",
        })}
      >
        {children}
      </Tippy>
    </>
  );
};
