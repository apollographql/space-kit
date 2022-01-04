import React from "react";
import { colors } from "../src/colors";

export const Column: React.FC<{
  title?: string;
  description?: string;
}> = ({ title, description, children }) => (
  <div
    style={{
      marginRight: 20,
      borderTop: `1px solid ${colors.silver.dark}`,
      width: 300,
    }}
  >
    {title && (
      <div
        style={{
          marginTop: 24,
          marginBottom: 4,
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: 0.75,
        }}
      >
        {title}
      </div>
    )}
    {description && (
      <div className="font-sm" style={{ marginBottom: 24 }}>
        {description}
      </div>
    )}
    {children}
  </div>
);
