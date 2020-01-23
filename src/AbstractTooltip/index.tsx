import "../../node_modules/tippy.js/animations/shift-away.css";
import React from "react";
import Tippy from "@tippy.js/react";
import { TippyStyles } from "./abstractTooltip/TippyStyles";
import { useSpaceKitProvider } from "../SpaceKitProvider";
import classnames from "classnames";

type TippyProps = React.ComponentProps<typeof Tippy>;

export interface AbstractTooltipProps {
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
}

type Props = TippyProps & AbstractTooltipProps;

export const AbstractTooltip: React.FC<Props> = ({
  children,
  className,
  forceVisibleForTestingOnly,
  padding = "normal",
  trigger,
  hideOnClick,
  ...props
}) => {
  const { disableAnimations } = useSpaceKitProvider();

  // TODO: Change cursor to
  return (
    <>
      <TippyStyles />
      <Tippy
        animation={!disableAnimations ? "shift-away" : undefined}
        arrow={false}
        hideOnClick={forceVisibleForTestingOnly ? false : hideOnClick}
        trigger={forceVisibleForTestingOnly ? "manual" : trigger}
        visible={forceVisibleForTestingOnly ? true : undefined}
        theme="space-kit"
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
