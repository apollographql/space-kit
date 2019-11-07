import React from "react";
import { storiesOf } from "@storybook/react";
import { colors } from "../colors";
import camelcase from "camelcase";
import { Page } from "../../components-util/Page";
import { Column } from "../../components-util/Column";

const svgsReq = require.context("./svgs", true, /\.svg$/);

const formatName = basename =>
  camelcase(basename.replace(/@\d+x\d+/, "").replace(/-sl$/, ""), {
    pascalCase: true,
  });

const colorMap = {};
Object.keys(colors).forEach(color => {
  const shades = Object.keys(colors[color]);
  shades.forEach(shade => {
    colorMap[`${color}-${shade}`] = colors[color][shade];
  });
});

// Organize all the icons by category. This will create an object with the keys
// being the categories and the values being an array of {Component, componentName}.
const groupedIcons = svgsReq.keys().reduce((map, fullname) => {
  const match = fullname.match(/^\.\/([^/]+)\/(.+)/);
  if (!match) {
    return map;
  }

  const [, category, filename] = match;
  const basename = filename
    .split(".")
    .slice(0, -1)
    .join(".");

  if (!map[category]) map[category] = [];
  const componentName = formatName(basename);

  map[category].push({
    basename: componentName,
    isStreamlineIcon: fullname.includes("-sl"),
    Component: require(`../icons/${componentName}.tsx`)[componentName],
  });

  return map;
}, {});

const StreamlineIndicator: React.FC = () => (
  <span className="font-lbl" style={{ color: colors.silver.darker }}>
    sl
  </span>
);

/**
 * Render all icons in columns and pass through props to each icon
 */
const AllIcons: React.FC = ({ color, ...otherProps }) =>
  Object.entries(groupedIcons).map(([category, icons]) => (
    <Column key={category} title={category}>
      {icons.map(({ basename, isStreamlineIcon, Component }) => (
        <div
          key={basename}
          style={{ marginTop: 16, marginBottom: 16, display: "flex" }}
        >
          <div style={{ width: 180, textOverflow: "ellipsis" }}>
            {basename} {isStreamlineIcon && <StreamlineIndicator />}
          </div>
          <Component
            {...otherProps}
            style={{
              color,
              height: 20,
            }}
          />
        </div>
      ))}
    </Column>
  ));

storiesOf("Icons", module)
  .add("default", () => {
    return (
      <Page
        title="Icons"
        description="Icons are an essential tool in visually communicating concepts to users, while also allowing users to more easily recongize and recall parts of the interface we design."
      >
        <AllIcons weight="normal" />
      </Page>
    );
  })
  .add("thin weight", () => {
    return (
      <Page
        title="Icons"
        description="Icons are an essential tool in visually communicating concepts to users, while also allowing users to more easily recongize and recall parts of the interface we design."
      >
        <AllIcons weight="thin" />
      </Page>
    );
  })
  .add("teal", () => {
    return (
      <Page
        title="Icons"
        description="Icons are an essential tool in visually communicating concepts to users, while also allowing users to more easily recongize and recall parts of the interface we design."
      >
        <AllIcons color={colors.teal.base} />
      </Page>
    );
  });
