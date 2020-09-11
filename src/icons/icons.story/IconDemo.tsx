import * as typography from "../../typography";
import React from "react";
import { ClassNames } from "@emotion/core";
import { colors } from "../../colors";

interface Props {
  name: string;
  Component: React.ComponentType<any>;
}

const IconDemoItem: React.FC<{ label: string }> = ({ children, label }) => (
  <ClassNames>
    {({ css }) => (
      <div
        className={css({
          textAlign: "center",
          width: 40,
        })}
      >
        <div>{children}</div>
        <div
          className={css({
            ...typography.base.xsmall,
            color: colors.grey.light,
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
            backgroundColor: colors.silver.light,
            borderRadius: 8,
            margin: 4,
            padding: 8,
            textAlign: "center",
            whiteSpace: "nowrap",
            width: 165,
          })}
        >
          <div
            className={css({
              ...typography.mono.xsmall,
              marginBottom: 8,
            })}
          >
            &lt;{name} /&gt;
          </div>
          <div
            className={css({
              display: "flex",
              justifyContent: "space-between",
            })}
          >
            <IconDemoItem label="normal">
              <Component className={css({ width: 20, height: 20 })} />
            </IconDemoItem>
            <IconDemoItem label="thin">
              <Component
                className={css({ width: 20, height: 20 })}
                weight="thin"
              />
            </IconDemoItem>
            <IconDemoItem label="colored">
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
