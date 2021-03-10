import React from "react";
import { Switch } from "../../Switch";
import { ClassNames } from "@emotion/react";
import { colors } from "../../colors";
import { mergeProps } from "@react-aria/utils";
import { assertUnreachable } from "../../shared/assertUnreachable";

export const Wrapper: React.FC<React.ComponentProps<typeof Switch>> = (
  props,
) => {
  return (
    <ClassNames>
      {({ css, cx }) => (
        <Switch
          {...mergeProps(props, {
            className: cx(
              props.className,
              css({
                paddingLeft: 12,
                paddingRight: 12,
                width: 260,
                whiteSpace: "nowrap",
              }),
              !props.theme || props.theme === "light"
                ? null
                : props.theme === "dark"
                ? css({
                    backgroundColor: colors.midnight.darkest,
                    color: colors.white,
                  })
                : assertUnreachable(props.theme),
            ),
          })}
        />
      )}
    </ClassNames>
  );
};
