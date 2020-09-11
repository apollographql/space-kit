import * as typography from "../../typography";
import React from "react";
import { ClassNames } from "@emotion/core";
import { colors } from "../../colors";

interface Props {
  name: string;
  Component: React.ComponentType<any>;
}

const IconDemoItem: React.FC<{ className?: string; label: string }> = ({
  children,
  className,
  label,
}) => (
  <ClassNames>
    {({ cx, css }) => (
      <div
        className={cx(
          css({
            textAlign: "center",
            width: 40,
          }),
          className
        )}
      >
        <div>{children}</div>
        <div
          className={css({
            ...typography.base.xsmall,
            color: colors.grey.light,
            lineHeight: 1,
            marginTop: 4,
            ".sbdocs &": {
              display: "none",
            },
          })}
        >
          {label}
        </div>
      </div>
    )}
  </ClassNames>
);

export const IconDemo: React.FC<Props> = ({ name, Component }) => {
  return (
    <ClassNames>
      {({ css }) => (
        <div
          className={css({
            alignItems: "center",
            display: "inline-flex",
            ".sbdocs &": {
              dipsplay: "flex",
              width: 220,
            },
          })}
        >
          <div
            className={css({
              ...typography.mono.xsmall,
              flex: 1,
              display: "none",

              ".sbdocs &": {
                display: "block",
              },
            })}
          >
            &lt;{name} /&gt;
          </div>
          <div
            className={css({
              display: "flex",
              justifyContent: "space-between",
              flex: "none",
            })}
          >
            <IconDemoItem label="normal">
              <Component className={css({ width: 20, height: 20 })} />
            </IconDemoItem>
            <IconDemoItem
              label="thin"
              className={css({
                ".sbdocs &": {
                  display: "none",
                },
              })}
            >
              <Component
                className={css({ width: 20, height: 20 })}
                weight="thin"
              />
            </IconDemoItem>
            <IconDemoItem
              label="colored"
              className={css({
                ".sbdocs &": {
                  display: "none",
                },
              })}
            >
              <Component
                className={css({
                  width: 20,
                  height: 20,
                  color: colors.teal.base,
                })}
              />
            </IconDemoItem>
          </div>
        </div>
      )}
    </ClassNames>
  );
};
