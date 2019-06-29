import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select } from "@storybook/addon-knobs/react";
import * as colors from "../colors";
import camelcase from "camelcase";

// const req = require.context("../../../", true, /\.tsx$/);
const svgsReq = require.context("./svgs", true, /\.svg$/);

function formatComponentName(basename) {
  return camelcase(basename.replace(/@\d+x\d+/, "").replace(/-sl$/, ""), {
    pascalCase: true
  });
}

function Category({ children, name }) {
  return (
    <div
      style={{
        borderTop: `1px solid ${colors.silver.dark}`,
        marginLeft: 10,
        marginRight: 10,
        width: 300,
        paddingTop: 24
      }}
    >
      <div
        style={{
          fontSize: 15,
          fontWeight: "bold",
          textTransform: "uppercase"
        }}
      >
        {name}
      </div>
      {children}
    </div>
  );
}

function IconWrapper({ children }) {
  return (
    <div
      style={{
        flex: 0,
        width: 20,
        height: 20,
        marginLeft: 8
      }}
    >
      {children}
    </div>
  );
}

function ComponentName({ children }) {
  return (
    <div
      style={{
        width: 180,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }}
    >
      {children}
    </div>
  );
}

function IconRow({ children }) {
  return (
    <div
      style={{
        marginTop: 16,
        marginBottom: 16,
        display: "flex"
      }}
    >
      {children}
    </div>
  );
}

storiesOf("Space Kit", module)
  .addParameters({ options: { showPanel: true } })
  .addDecorator(withKnobs)
  .add("Icons", () => {
    const color = select(
      "Color",
      {
        black: colors.black.base,
        "teal-base": colors.teal.base,
        "pink-base": colors.pink.base,
        "indigo-dark": colors.indigo.dark
      },
      colors.teal.base
    );

    // Organize all the icons by category. This will create an object with the keys
    // being the categories and the values being an array of {Component, componentName}.
    const categorizedComponents = svgsReq
      .keys()
      .reduce((accumulator, fullFilename) => {
        const match = fullFilename.match(/^\.\/([^\/]+)\/(.+)/);
        if (!match) {
          console.warn("Could not match filename", fullFilename);

          return accumulator;
        }

        const [, category, filename] = match;
        const basename = filename
          .split(".")
          .slice(0, -1)
          .join(".");

        if (!accumulator[category]) {
          accumulator[category] = [];
        }
        const componentName = formatComponentName(basename);

        accumulator[category].push({
          componentName,
          Component: require(`../../icons/${componentName}.tsx`)[componentName],
          isStreamlineIcon: fullFilename.includes("-sl")
        });

        return accumulator;
      }, {});

    return (
      <div style={{ margin: 10 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginLeft: -10,
            marginRight: -10
          }}
        >
          {Object.entries(categorizedComponents).map(
            ([category, componentArray]) => {
              return (
                <Category key={category} name={category}>
                  {componentArray.map(
                    ({ componentName, Component, isStreamlineIcon }) => (
                      <IconRow key={componentName}>
                        <ComponentName>
                          {componentName}
                          {isStreamlineIcon ? (
                            <abbr title="Streamline icon">*</abbr>
                          ) : (
                            ""
                          )}
                        </ComponentName>
                        <IconWrapper>
                          <Component
                            style={{
                              width: 20,
                              height: 20,
                              color: color
                            }}
                          />
                        </IconWrapper>
                      </IconRow>
                    )
                  )}
                </Category>
              );
            }
          )}
        </div>
      </div>
    );
  });
