/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { Card, CardSeperator, CardProps } from "../Card";
import { IconErrorSolid } from "../icons/IconErrorSolid";
import { IconInfoSolid } from "../icons/IconInfoSolid";
import { IconWarningSolid } from "../icons/IconWarningSolid";
import { IconSuccessSolid } from "../icons/IconSuccessSolid";
import { IconClose } from "../icons/IconClose";
import { colors } from "../colors";

type AlertLevel = "info" | "warn" | "error" | "success";

interface AlertProps extends Omit<CardProps, "size" | "description"> {
  level: AlertLevel;
  /**
   * callback for handling the clicks on the close button.
   */
  onClose: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  level,
  heading,
  onClose,
  children,
  actions,
  ...cardProps
}) => {
  const { Icon, color } = useMemo(() => {
    switch (level) {
      case "info":
        return { color: colors.blue, Icon: IconInfoSolid };
      case "warn":
        return { color: colors.orange, Icon: IconWarningSolid };
      case "error":
        return { color: colors.red, Icon: IconErrorSolid };
      case "success":
        return { color: colors.green, Icon: IconSuccessSolid };
      default:
        return {};
    }
  }, [level]);

  return (
    <Card
      {...cardProps}
      heading={
        <div css={{ display: "flex", width: "100%" }}>
          {Icon && (
            <Icon
              css={{
                width: 20,
                height: 20,
                color: color?.base,
                marginRight: 13,
              }}
            />
          )}
          <div css={{ width: "100%", fontSize: 15, color: color?.darker }}>
            {heading}
          </div>
          <IconClose
            onClick={onClose}
            css={{
              color: colors.grey.lighter,
              cursor: "pointer",
              width: 10,
              height: 10,
            }}
          />
        </div>
      }
      css={{
        borderRadius: 4,
        padding: 15,
        "& > div:first-child": { marginBottom: 14 },
      }}
    >
      <CardSeperator
        css={css`
          margin-bottom: 14px;
          margin-top: 14px;
        `}
      />
      <div
        css={{
          fontSize: 13,
          lineHeight: "1.5",
          marginBottom: actions ? 13 : 0,
        }}
      >
        {children}
      </div>
      {actions}
    </Card>
  );
};

Alert.propTypes = {
  level: PropTypes.oneOf(["info", "warn", "error", "success"] as AlertLevel[])
    .isRequired,
  onClose: PropTypes.func.isRequired,
};
