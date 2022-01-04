/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { colors } from "../colors";
import { ListItem } from "../ListItem";
import { useListConfig, ListConfigProvider } from "../ListConfig";
import { listPadding } from "../List";
import { assertUnreachable } from "../shared/assertUnreachable";

/**
 * Divider between sections in a list
 */
export const ListDivider: React.FC = (props) => {
  const listConfig = useListConfig();

  // Stop click events so we don't try to close the list when clicking something
  // non-interactive
  const handleClick = React.useCallback<React.MouseEventHandler<HTMLHRElement>>(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
    },
    [],
  );

  /**
   * Indicates how much negative space we need to take to make sure the divider
   * goes edge-to-edge
   */
  const horizontalOffset =
    listConfig.margin === "auto"
      ? -listPadding
      : listConfig.margin === "none"
      ? 0
      : assertUnreachable(listConfig.margin);

  return (
    <ListConfigProvider truncate={false}>
      <ListItem
        interactive={false}
        css={css({
          alignItems: "stretch",
          justifyItems: "center",
          paddingLeft: 0,
          paddingRight: 0,
          position: "relative",
          height: 17,
        })}
      >
        <hr
          {...props}
          onClick={handleClick}
          css={{
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopColor: colors.silver.base,
            borderTopStyle: "solid",
            borderTopWidth: 1,
            bottom: 0,
            left: horizontalOffset,
            margin: 0,
            position: "absolute",
            right: horizontalOffset,
            top: 8,
          }}
        />
      </ListItem>
    </ListConfigProvider>
  );
};
