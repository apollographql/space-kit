import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import * as colors from '../colors';
import camelcase from 'camelcase';
import { Page } from '../../components-util/Page';
import { Column } from '../../components-util/Column';

const svgsReq = require.context('./svgs', true, /\.svg$/);

function formatComponentName(basename) {
  return camelcase(basename.replace(/@\d+x\d+/, '').replace(/-sl$/, ''), {
    pascalCase: true
  });
}

function ComponentName({ children }) {
  return (
    <div
      style={{
        width: 180,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
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
        display: 'flex'
      }}
    >
      {children}
    </div>
  );
}

const colorMap = {};
Object.keys(colors).forEach(color => {
  const shades = Object.keys(colors[color]);
  shades.forEach(shade => {
    colorMap[`${color}-${shade}`] = colors[color][shade];
  });
});

storiesOf('Icons', module)
  .addDecorator(withKnobs)
  .add('Catalog', () => {
    const color = select('Color', colorMap, colors.black.base);

    // Organize all the icons by category. This will create an object with the keys
    // being the categories and the values being an array of {Component, componentName}.
    const categorizedComponents = svgsReq
      .keys()
      .reduce((accumulator, fullFilename) => {
        const match = fullFilename.match(/^\.\/([^\/]+)\/(.+)/);
        if (!match) {
          console.warn('Could not match filename', fullFilename);

          return accumulator;
        }

        const [, category, filename] = match;
        const basename = filename
          .split('.')
          .slice(0, -1)
          .join('.');

        if (!accumulator[category]) {
          accumulator[category] = [];
        }
        const componentName = formatComponentName(basename);

        accumulator[category].push({
          componentName,
          Component: require(`../../icons/${componentName}.tsx`)[componentName],
          isStreamlineIcon: fullFilename.includes('-sl')
        });

        return accumulator;
      }, {});

    return (
      <Page
        title="Icons"
        description="Icons are an essentialy tool in visually communicating concepts to users, while also allowing users to more easily recongize and recall parts of the interface we design."
      >
        {Object.entries(categorizedComponents).map(
          ([category, componentArray]) => {
            return (
              <Column key={category} title={category}>
                {componentArray.map(
                  ({ componentName, Component, isStreamlineIcon }) => (
                    <IconRow key={componentName}>
                      <ComponentName>
                        {componentName}
                        {isStreamlineIcon ? '-sl' : ''}
                      </ComponentName>
                      <Component
                        style={{
                          width: 20,
                          height: 20,
                          color: color
                        }}
                      />
                    </IconRow>
                  )
                )}
              </Column>
            );
          }
        )}
      </Page>
    );
  });
