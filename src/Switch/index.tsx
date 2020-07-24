import React from "react";
import { ClassNames } from "@emotion/core";
import { ShadedColor, colors } from "../colors";
import { useFocusRing } from "@react-aria/focus";
import { useSwitch } from "@react-aria/switch";
import { useToggleState } from "@react-stately/toggle";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { assertUnreachable } from "../shared/assertUnreachable";
import { motion } from "framer-motion";
import { useSpaceKitProvider } from "../SpaceKitProvider";
import { Label } from "./switch/Label";

type SwitchProps = {
  /**
   * `className` to apply to the bounding `label`
   */
  className?: string;
  /**
   * `style` to apply to the bounding `label`
   */
  style?: React.CSSProperties;

  /**
   * Color to use for the checkbox itself. The check color and the border color
   * will be automatically calculated.
   *
   * @default colors.blue.base
   */
  color?: ShadedColor;

  /**
   * Force the focused styling
   *
   * This prop is typed as `never` so you can never legally pass it. This is
   * intended only for testing because there's no other way to test a focus
   * ring. The only place we're actually using this is in an `mdx` file, which
   * doesn't check props with TypeScript.
   *
   * There's got to be a better way to do this; I just don't know what it is
   * :shrug:
   */
  isFocusVisible?: never;

  /**
   * Size to display the toggle at
   *
   * @default "normal"
   */
  size?: "normal" | "large";

  /**
   * Show the "ON" or "OFF" textual state
   *
   * @default `true`
   */
  showTextualState?: boolean;

  theme?: "light" | "dark";
} & Parameters<typeof useSwitch>[0] &
  Parameters<typeof useFocusRing>[0];

export const Switch: React.FC<SwitchProps> & { Label: typeof Label } = ({
  className,
  style,
  color = colors.blue.base,
  isFocusVisible: isFocusVisibleFromProps,
  showTextualState = true,
  size = "normal",
  theme: propsTheme,
  ...props
}) => {
  const state = useToggleState(props);
  const ref = React.useRef<HTMLInputElement | null>(null);
  const { inputProps } = useSwitch(props, state, ref);
  const {
    isFocusVisible: isFocusVisibleFromFocusRing,
    focusProps,
  } = useFocusRing(props);
  // FYI: Hooks can't be called conditionally, so we must call the hook and then
  // use the `||` in the subseuent line instead of combining them.
  const { theme: providerTheme } = useSpaceKitProvider();
  const theme = propsTheme || providerTheme;

  const isFocusVisible =
    (!props.isDisabled && isFocusVisibleFromProps) ||
    isFocusVisibleFromFocusRing;

  /** Size, in pixels, of the dot that will be the switch */
  const dotSize =
    size === "normal" ? 12 : size === "large" ? 18 : assertUnreachable(size);
  const borderSize =
    size === "normal" ? 2 : size === "large" ? 3 : assertUnreachable(size);

  return (
    <ClassNames>
      {({ css, cx }) => (
        <Label
          className={cx(
            css({
              opacity: props.isDisabled ? 0.5 : undefined,
            }),
            className
          )}
          style={style}
        >
          <VisuallyHidden>
            <input {...inputProps} {...focusProps} ref={ref} />
          </VisuallyHidden>

          <div
            className={css({
              flex: 1,
              marginRight: showTextualState
                ? 12
                : size === "large"
                ? 30
                : size === "normal"
                ? undefined
                : assertUnreachable(size),
            })}
          >
            {props.children}
          </div>

          {showTextualState && (
            <div
              aria-hidden
              className={css({
                color:
                  theme === "light"
                    ? props.isDisabled
                      ? undefined
                      : state.isSelected
                      ? undefined
                      : colors.grey.base
                    : theme === "dark"
                    ? props.isDisabled
                      ? undefined
                      : state.isSelected
                      ? colors.white
                      : colors.midnight.lighter
                    : assertUnreachable(theme),
                fontWeight: state.isSelected ? 600 : 400,
                marginRight: 8,
              })}
            >
              {state.isSelected ? "ON" : "OFF"}
            </div>
          )}

          <div
            aria-hidden
            key={props.isDisabled ? "disabled" : "enabled"}
            className={css({
              backgroundColor: state.isSelected ? color : colors.grey.light,
              borderRadius: dotSize / 2 + borderSize,
              boxShadow: [
                isFocusVisible && `0 0 0 2px ${colors.blue.lighter}`,
                !props.isDisabled && "inset 0 0 1px 0 rgba(18, 21, 26, 0.4)",
              ]
                // The generic attached to the filter return type will indicate
                // to TypeScript that we're stripping out all non-strings,
                // meaning the booleans.
                .filter((value): value is string => !!value)
                .join(", "),
              cursor: !props.isDisabled ? "pointer" : undefined,
              height: dotSize + borderSize * 2,
              padding: borderSize,
              position: "relative",
              width: (8 / 3) * dotSize,
            })}
          >
            <motion.div
              animate={{
                x: state.isSelected ? dotSize + borderSize * 2 : 0,
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 200,
                mass: 0.2,
                velocity: 8,
              }}
              className={css({
                backgroundColor: colors.white,
                borderRadius: "100%",
                height: dotSize,
                position: "absolute",
                top: borderSize,
                width: dotSize,
              })}
            />
          </div>
        </Label>
      )}
    </ClassNames>
  );
};

Switch.Label = Label;
