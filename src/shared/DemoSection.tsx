/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import { colors } from "../colors";
import * as typography from "../typography";

export const DemoSection: React.FC<{
  children: React.ReactNode;
  description?: string;
  title?: string;
}> = ({ children, description, title, ...otherProps }) => (
  <div {...otherProps} css={{ margin: 42 }}>
    <div css={{ ...typography.base.xxlarge, marginBottom: ".5em" }}>
      {title}
    </div>
    <div css={{ maxWidth: "50%", marginBottom: "5em" }}>{description}</div>
    <div css={{ display: "flex", flexWrap: "wrap", margin: "0 -20px" }}>
      {children}
    </div>
  </div>
);

export interface DemoGroupProps {
  children: JSX.Element | JSX.Element[];
  title: string;
  description?: string;
  width?: number;
}

export const DemoGroup: React.FC<DemoGroupProps> = ({
  children,
  description,
  title,
  width,
  ...otherProps
}) => (
  <div {...otherProps} css={{ margin: "0 20px", width: width || 300 }}>
    <hr
      style={{
        height: 1,
        borderWidth: 0,
        backgroundColor: colors.silver.dark,
        marginBottom: 24,
      }}
    />
    <div
      css={{
        ...typography.base.base,
        textTransform: "uppercase",
        fontWeight: 600,
        margin: 6,
      }}
    >
      {title}
    </div>
    {description && (
      <div
        css={{
          ...typography.base.small,
          margin: 6,
        }}
      >
        {description}
      </div>
    )}
    <div css={{ display: "flex", flexWrap: "wrap" }}>{children}</div>
  </div>
);
