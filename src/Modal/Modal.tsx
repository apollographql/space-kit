/** @jsx jsx */
import { jsx, css, ClassNames } from "@emotion/core";
import React, { useEffect } from "react";
import { motion, MotionProps } from "framer-motion";
import * as typography from "../typography";
import { colors } from "../colors";
import type { Property } from "csstype";
import { useSpaceKitProvider } from "../SpaceKitProvider";
import { assertUnreachable } from "../shared/assertUnreachable";

interface Props {
  /**
   * Class name that will be applied to the content `div`, or the component
   * passed as the `as` prop.
   */
  className?: string;

  /**
   * Override the the default element used to content of the modal
   *
   * All props provided will be merged with props that this component adds,
   * including `className`s being merged. You can use this to make the modal a
   * `<form>`
   *
   * @default `<div />`
   */
  as?: React.ReactElement<any, keyof typeof motion>;

  /**
   * Override the outermost
   *
   * All props provided will be merged with props that `Button` adds, including
   * `className`s being merged.
   *
   * @default <button />
   */
  containerAs?: React.ReactElement;

  /**
   * Optional primary action, usually a button
   *
   * Do not apply any layout via css; this will be handled internally for consistency
   */
  primaryAction?: React.ReactNode;

  /**
   * Optional secondary action, usually a button
   *
   * Do not apply any layout via css; this will be handled internally for consistency
   */
  secondaryAction?: React.ReactNode;

  children?: React.ReactNode;

  /**
   * Limit vertical overflow to children or let the entire modal scroll.
   *
   * Defaults to "modal".
   */
  verticalScrollMode?: "modal" | "children";

  /**
   * Optional description to show of the modal
   */
  description?: React.ReactNode;

  /**
   * Text to display in the bottom left of a modal/dialog
   */
  bottomLeftText?: React.ReactNode;

  /**
   * Callback to call when the modal is closed
   */
  onClose?: () => void;

  /**
   * Size to show the modal at
   */
  size: "small" | "medium" | "large";

  /**
   * Title of the modal
   */
  title: React.ReactNode;
}

const modalBackdrop = css`
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  &:after {
    position: fixed;
    z-index: 10;
    content: "";
    background-color: ${colors.grey.lighter};
    opacity: 0.7;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    height: 100vh;
    width: 100vw;
  }
`;

type TLength = string | 0 | number;

function getModalWidth(size: Props["size"]): Property.Width<TLength> {
  switch (size) {
    case "small":
      return 460;
    case "medium":
      return 600;
    case "large":
      return 800;
    /* istanbul ignore next */
    default:
      throw assertUnreachable(size);
  }
}

export const Modal: React.FC<Props> = ({
  as = <div />,
  className,
  containerAs = <div />,
  title,
  description,
  children,
  verticalScrollMode = "modal",
  onClose,
  size,
  bottomLeftText,
  primaryAction,
  secondaryAction,
}) => {
  const { disableAnimations } = useSpaceKitProvider();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "Escape" && onClose) {
        onClose();
      }
    }

    // add an event listener for all clicks
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const type: keyof typeof motion =
    as.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__ || as.type;
  if (!type || type === "custom") {
    // TypeScript will give us some protection here, but we need to guarantee
    // that `as` is an element that `motion` supports
    throw new TypeError(
      "`as` must be an element with a corresponding element in `Framer.motion`",
    );
  } else if (!motion[type] && !React.isValidElement(as)) {
    throw new TypeError(
      "Could not determine the type of `as` to clone that element using Framer. This is most likely because it's a ref forwarding component and we don't have any way of determining what type it will render to.",
    );
  }

  /**
   * Framer motion component to render. The type will be taken from the `as`
   * prop.
   *
   * We have to strip the type because we'll get an error about the union being
   * too complex to model because `motion` has over 100 options.
   */
  const MotionComponent: React.ComponentType<MotionProps> = motion[type];

  return (
    <ClassNames>
      {({ css, cx }) => {
        return React.cloneElement(
          containerAs,
          {
            onClick: onClose,
            ...containerAs.props,
            className: cx(css(modalBackdrop), containerAs.props.className),
          },
          <MotionComponent
            {...as.props}
            ref={(as as any).ref}
            animate={{ opacity: 1, scale: 1 }}
            initial={disableAnimations ? false : { opacity: 0, scale: 0.9 }}
            transition={{
              scale: {
                type: "spring",
                stiffness: 150,
                damping: 200,
                mass: 0.2,
                velocity: 8,
              },
            }}
            onClick={(event: React.MouseEvent<any>) => {
              event.stopPropagation();

              as.props.onClick?.(event);
            }}
            className={cx(
              css(
                {
                  backgroundColor: "white",
                  borderRadius: 12,
                  boxShadow: `0 16px 32px 0 rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(18, 21, 26, 0.04)`,
                  maxHeight: "80%",
                  minWidth: 400,
                  opacity: 1,
                  overflowY: verticalScrollMode === "modal" ? "auto" : "hidden",
                  padding: size === "large" ? "40px" : "32px",
                  position: "absolute",
                  width: getModalWidth(size),
                  zIndex: 11,
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                },
                verticalScrollMode === "children" && {
                  display: "flex",
                  flexDirection: "column",
                },
              ),
              className,
              as.props.className,
              // If the parent component is using emotion with the jsx pragma, we
              // have to get fancy and intercept the styles to use with the
              // `ClassNames` wrapper.
              as.props.css ? css(as.props.css.styles) : null,
            )}
          >
            <div>
              {title && (
                <div>
                  <div
                    css={{
                      color: colors.black.base,
                      marginBottom: 10,
                      ...(size === "small"
                        ? { ...typography.base.large, fontWeight: 600 }
                        : typography.base.xxlarge),
                    }}
                  >
                    {title}
                  </div>
                </div>
              )}
              {description && (
                <div
                  css={{ ...typography.base.base, color: colors.black.base }}
                >
                  {description}
                </div>
              )}
            </div>
            <div
              css={css(
                {
                  marginTop:
                    size === "large" ? 24 : size === "medium" ? 16 : 12,
                },
                verticalScrollMode === "children" && {
                  overflowY: "auto",
                },
              )}
            >
              {children}
            </div>
            {(primaryAction || secondaryAction || bottomLeftText) && (
              <div
                css={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: size === "medium" ? 32 : 24,
                }}
              >
                {bottomLeftText && (
                  <div css={{ marginRight: "auto" }}>{bottomLeftText}</div>
                )}
                {secondaryAction && (
                  <div css={{ marginRight: 12 }}>{secondaryAction}</div>
                )}
                {primaryAction && <div>{primaryAction}</div>}
              </div>
            )}
          </MotionComponent>,
        );
      }}
    </ClassNames>
  );
};
