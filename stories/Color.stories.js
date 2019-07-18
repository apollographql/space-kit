import React from 'react';
import { storiesOf } from '@storybook/react';
import * as colors from '../src/colors';
import { Page } from '../components-util/Page';
import { Column } from '../components-util/Column';
import { Patch } from '../components-util/Color';
import metadata from './Color.metadata.js';

const ColorStory = ({ title, description, array }) => (
  <Page title={title} description={description}>
    {array.map(color => (
      <Column
        title={metadata[color].title}
        description={metadata[color].description}
      >
        {Object.keys(colors[color]).map(shade => {
          return (
            <Patch
              label={`${color}-${shade}`}
              color={colors[color][shade]}
              {...metadata[color].options[shade]}
            />
          );
        })}
      </Column>
    ))}
  </Page>
);

storiesOf('Color', module)
  .add('Brand Colors', () => (
    <ColorStory
      title="Brand Colors"
      description="Our brand colors are used sparingly and primarily as accents to the UI or in data visualizations. They will be used much more in markting materials. The base Apollo Indigo color will be used as a default button color."
      array={['pink', 'teal', 'indigo']}
    />
  ))
  .add('Neutrals', () => (
    <ColorStory
      title="Neutrals"
      description="Neutrals are used heavily in the user interface, often as borders, backgrounds, and typography. The default background is #F4F6F8 and the default typographic color is #191C23."
      array={['black', 'grey', 'silver']}
    />
  ))
  .add('Interface Colors', () => (
    <ColorStory
      title="Interface Colors"
      description="Interface colors are used primarily used for conveying important context within a message or action. For example, presenting a potentially desctructive action would call for the use of a red button."
      array={['red', 'green', 'blue']}
    />
  ))
  .add('Alternate Colors', () => (
    <ColorStory
      title="Alternate Colors"
      description="The alternate colors are rounding out the set of colors we have in the system, but will likely not be used that often. A common use case for these colors will be data visualizations."
      array={['orange', 'yellow', 'purple', 'blilet']}
    />
  ));
