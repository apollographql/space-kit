import React from 'react';
import { addParameters, storiesOf } from '@storybook/react';
import theme from './theme';

addParameters({
  options: {
    theme
  }
});

storiesOf('Color', module)
  .add('Brand Colors', () => <div>Hello</div>)
  .add('Neutrals', () => <div>Hello</div>)
  .add('Interface Colors', () => <div>Hello</div>)
  .add('Alternate Colors', () => <div>Hello</div>);
