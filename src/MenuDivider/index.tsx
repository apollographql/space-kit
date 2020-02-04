/* eslint-disable @typescript-eslint/no-empty-interface */
/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { colors } from "../colors";

/**
 * Divider between sections in a menu
 */
export const MenuDivider: React.FC = () => {
  return (
    <hr
      css={css({
        marginLeft: -8,
        marginRight: -8,
        marginTop: 8,
        marginBottom: 8,
        borderTopColor: colors.silver.base,
        borderTopWidth: 1,
        borderTopStyle: "solid",
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
      })}
    />
  );
};
