/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useEffect } from "react";
import * as typography from "../typography";
import { colors } from "../colors";
import * as CSS from "csstype";
import { EmotionCacheProvider } from "../shared/EmotionCacheProvider";

interface Props {
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

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
  }
`;

function assertUnreachable(value: never): never {
  throw new TypeError(`Unreachable value reached ${value}`);
}

type TLength = string | 0 | number;

const getModalWidth = (size: Props["size"]): CSS.WidthProperty<TLength> => {
  switch (size) {
    case "small":
      return 460;
    case "medium":
      return 600;
    case "large":
      return 800;
    default:
      throw assertUnreachable(size);
  }
};

export function Modal({
  title,
  description,
  children,
  onClose,
  size,
  bottomLeftText,
  primaryAction,
  secondaryAction,
}: Props): ReturnType<React.FC> {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "Escape" && onClose) {
        onClose();
      }
    }

    // add an event listener for all clicks
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <EmotionCacheProvider>
      <div onClick={onClose} css={modalBackdrop}>
        <div
          onClick={event => event.stopPropagation()}
          css={{
            backgroundColor: "white",
            borderRadius: 12,
            boxShadow: `0 16px 32px 0 rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(18, 21, 26, 0.04)`,
            left: "50%",
            maxHeight: "100%",
            minWidth: 400,
            opacity: 1,
            overflowY: "scroll",
            padding: size === "large" ? "40px" : "32px",
            position: "absolute",
            top: "20%",
            transform: "translate(-50%)",
            width: getModalWidth(size),
            zIndex: 11,
          }}
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
              <div css={{ ...typography.base.base, color: colors.black.base }}>
                {description}
              </div>
            )}
          </div>
          <div
            css={{
              marginTop: size === "large" ? 24 : size === "medium" ? 16 : 12,
            }}
          >
            {children}
          </div>
          {(primaryAction || secondaryAction || bottomLeftText) && (
            <div
              css={{
                alignItems: "baseline",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 24,
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
        </div>
      </div>
    </EmotionCacheProvider>
  );
}
