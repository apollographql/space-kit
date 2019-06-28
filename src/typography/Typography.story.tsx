import React from "react";
import { storiesOf } from "@storybook/react";
import * as typographyDefinitions from "./index";
import * as colors from "../colors";

function round(number: number, digits: number): number {
  const multiplier = Math.pow(10, digits);

  return Math.round(number * multiplier) / multiplier;
}

const TypographyDefinitions: React.FC<{
  definitions: Record<string, React.CSSProperties>;
}> = ({ definitions }) => (
  <React.Fragment>
    {Object.entries(definitions).map(([name, properties]) => (
      <div key={name} style={{ margin: ".5rem" }}>
        <div style={properties}>{name}</div>
        <div>
          {typeof properties.fontSize === "number"
            ? round(properties.fontSize / 15, 4)
            : properties.fontSize}
          em • {properties.fontSize}
          {typeof properties.fontSize === "number" &&
          typeof properties.lineHeight === "number"
            ? ` / ${Math.round(properties.fontSize * properties.lineHeight)}`
            : ""}{" "}
          • {properties.fontWeight}
        </div>
      </div>
    ))}
  </React.Fragment>
);

storiesOf("Space Kit", module).add("Typography", () => {
  return (
    <React.Fragment>
      <div>
        <div
          style={{
            border: `1px solid ${colors.silver.dark}`,
            color: colors.black.base,
            display: "inline-block",
            margin: "2rem",
            padding: "2rem"
          }}
        >
          <TypographyDefinitions definitions={typographyDefinitions.base} />
        </div>
        <div
          style={{
            backgroundColor: colors.black.base,
            border: `1px solid ${colors.black.base}`,
            color: colors.silver.light,
            display: "inline-block",
            margin: "2rem",
            padding: "2rem"
          }}
        >
          <TypographyDefinitions definitions={typographyDefinitions.base} />
        </div>
      </div>
      <div>
        <div
          style={{
            border: `1px solid ${colors.silver.dark}`,
            color: colors.black.base,
            display: "inline-block",
            margin: "2rem",
            padding: "2rem"
          }}
        >
          <TypographyDefinitions definitions={typographyDefinitions.mono} />
        </div>
        <div
          style={{
            backgroundColor: colors.black.base,
            border: `1px solid ${colors.black.base}`,
            color: colors.silver.light,
            display: "inline-block",
            margin: "2rem",
            padding: "2rem"
          }}
        >
          <TypographyDefinitions definitions={typographyDefinitions.mono} />
        </div>
      </div>
    </React.Fragment>
  );
});
