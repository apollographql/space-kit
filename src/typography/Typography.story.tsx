import React from "react";
import { storiesOf } from "@storybook/react";
import * as typographyDefinitions from "./index";
import * as colors from "../colors";
import { string } from "prop-types";

function round(number: number, digits: number): number {
  const multiplier = Math.pow(10, digits);

  return Math.round(number * multiplier) / multiplier;
}

const TypographyDefinitions: React.FC<{
  definitions: Record<string, React.CSSProperties>;
}> = ({ definitions }) => (
  <React.Fragment>
    {Object.entries(definitions).map(([name, properties]) => (
      <div key={name} style={{ margin: "15px 0" }}>
        <div style={properties}>{name}</div>
        <div style={typographyDefinitions.base.small}>
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

const TypographyDefinitionsContainer: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, style, ...otherProps }) => (
  <div
    style={{
      ...style,
      display: "inline-block",
      paddingTop: 36,
      paddingBottom: 36,
      width: "50%",
      margin: "24px 0"
    }}
    {...otherProps}
  >
    {children}
  </div>
);

const TypographySection: React.FC<{
  title: string;
  description?: string;
  children: React.ReactNode;
}> = ({ title, description, children }) => (
  <div>
    <div style={typographyDefinitions.base.xlarge}>{title}</div>
    {description && <div style={{ maxWidth: "50%" }}>{description}</div>}
    <hr
      style={{
        height: 1,
        borderWidth: 0,
        backgroundColor: colors.silver.dark,
        marginBottom: 24,
        marginTop: 80
      }}
    />
    <div>{children}</div>
  </div>
);
storiesOf("Space Kit/Typography", module)
  .addParameters({
    options: {
      showPanel: false
    }
  })
  .add("Source Sans Pro", () => {
    return (
      <div style={{ margin: 42, ...typographyDefinitions.base.base }}>
        <TypographySection
          title="Source Sans Pro"
          description="Source Sans Pro is used for nearly all interface type. The typographic scale is a 1.2 (minor third) with a base font size of 15px.  You can preview the type scale at https://bit.ly/2ZCUS8V."
        >
          <TypographyDefinitionsContainer
            style={{
              color: colors.black.base
            }}
          >
            <TypographyDefinitions definitions={typographyDefinitions.base} />
          </TypographyDefinitionsContainer>
          <TypographyDefinitionsContainer
            style={{
              backgroundColor: colors.black.base,
              color: colors.silver.light,
              paddingLeft: 80,
              paddingRight: 80
            }}
          >
            <TypographyDefinitions definitions={typographyDefinitions.base} />
          </TypographyDefinitionsContainer>
        </TypographySection>
      </div>
    );
  })
  .add("Source Code Pro", () => {
    return (
      <div style={{ margin: 42, ...typographyDefinitions.base.base }}>
        <TypographySection
          title="Source Code Pro"
          description="Source Code Pro is primiarly used for representing data, operations, GitHub branch names, or other technically oriented information."
        >
          <TypographyDefinitionsContainer
            style={{
              color: colors.black.base
            }}
          >
            <TypographyDefinitions definitions={typographyDefinitions.mono} />
          </TypographyDefinitionsContainer>
          <TypographyDefinitionsContainer
            style={{
              backgroundColor: colors.black.base,
              color: colors.silver.light,
              paddingLeft: 80,
              paddingRight: 80
            }}
          >
            <TypographyDefinitions definitions={typographyDefinitions.mono} />
          </TypographyDefinitionsContainer>
        </TypographySection>
      </div>
    );
  });
