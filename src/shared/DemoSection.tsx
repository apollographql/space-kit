/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import * as typography from "../typography";

export const DemoSection: React.FC<{
  children: React.ReactNode;
  description: string;
  title: string;
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
