/* eslint-disable prefer-destructuring */
import React from "react";
import { storiesOf } from "@storybook/react";
import * as typographyDefinitions from "./index";
import { colors } from "../colors";
import { Page } from "../../components-util/Page";
import { Column } from "../../components-util/Column";
import { PropertyValue } from "csstype";

function round(number: number, digits: number): number {
  const multiplier = 10 ** digits;

  return Math.round(number * multiplier) / multiplier;
}

const TypographyDefs: React.FC<{
  definitions: Record<string, React.CSSProperties>;
  color: string;
  backgroundColor: string;
}> = ({ definitions, color, backgroundColor }) => (
  <div
    style={{
      color,
      backgroundColor,
      padding: "16px 42px",
      marginTop: 24,
    }}
  >
    {Object.entries(definitions).map(([name, properties]) => {
      // @see https://github.com/frenic/csstype#version-30 on why we need to use
      // `PropertyValue` to unpack these values.
      const fontSize: PropertyValue<typeof properties.fontSize> =
        properties.fontSize;
      const lineHeight: PropertyValue<typeof properties.lineHeight> =
        properties.lineHeight;

      return (
        <div key={name} style={{ margin: "15px 0" }}>
          <div style={properties}>{name}</div>
          <div style={typographyDefinitions.base.small}>
            {typeof fontSize === "number" ? round(fontSize / 15, 4) : fontSize}
            em • {fontSize}
            {typeof fontSize === "number" && typeof lineHeight === "number"
              ? ` / ${Math.round(fontSize * lineHeight)}`
              : ""}{" "}
            • {properties.fontWeight}
          </div>
        </div>
      );
    })}
  </div>
);

storiesOf("Typography", module)
  .add("Source Sans Pro", () => {
    return (
      <Page
        title="Source Sans Pro"
        description="Source Sans Pro is used for nearly all interface type. The typographic scale is a 1.2 (minor third) with a base font size of 15px.  You can preview the type scale at https://bit.ly/2ZCUS8V."
      >
        <Column>
          <TypographyDefs
            color={colors.black.base}
            backgroundColor={colors.silver.light}
            definitions={typographyDefinitions.base}
          />
        </Column>
        <Column>
          <TypographyDefs
            color={colors.white}
            backgroundColor={colors.black.base}
            definitions={typographyDefinitions.base}
          />
        </Column>
      </Page>
    );
  })
  .add("Source Code Pro", () => {
    return (
      <Page
        title="Source Code Pro"
        description="Source Code Pro is primiarly used for representing data, operations, GitHub branch names, or other technically oriented information."
      >
        <Column>
          <TypographyDefs
            color={colors.black.base}
            backgroundColor={colors.silver.light}
            definitions={typographyDefinitions.mono}
          />
        </Column>
        <Column>
          <TypographyDefs
            color={colors.white}
            backgroundColor={colors.black.base}
            definitions={typographyDefinitions.mono}
          />
        </Column>
      </Page>
    );
  });
