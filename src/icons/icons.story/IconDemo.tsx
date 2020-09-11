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
    {({ css, cx }) => (
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
            display: "inline-flex",
            textAlign: "center",

            ".sbdocs &": {
              display: "block",
              width: 76,
              height: 76,
              margin: -8,
            },
          })}
          title={name}
        >
          <div
            className={css({
              display: "flex",
              justifyContent: "space-between",

              ".sbdocs &": {
                justifyContent: "center",
              },
            })}
          >
            <IconDemoItem label="normal">
              <Component
                className={css({
                  width: 20,
                  height: 20,

                  ".sbdocs &": {
                    width: 20,
                    height: 20,
                  },
                })}
              />
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
          <div
            className={css({
              ...typography.base.xsmall,
              color: colors.grey.lighter,
              marginBottom: 8,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",

              display: "none",
              ".sbdocs &": {
                display: "block",
              },
            })}
          >
            {name}
          </div>
        </div>
      )}
    </ClassNames>
  );
};
