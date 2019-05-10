<div align="center">
  <img height="100" src="https://i.imgur.com/YPhoQOA.png">
  <h1 align="center">SpaceKit</h1>
</div>

The home base for Apollo's design system, SpaceKit provides essential design resources for our developers to use in the Apollo-branded interfaces that they create.

## Installation

```shell
npm install @apollographql/spacekit
```

## Usage

Import things into your JS app from the `@apollographql/spacekit` package. All available exports are documented [here](#exports).

```js
import '@apollographql/spacekit/reset.css'; // import this at app root
import {colors} from '@apollographql/spacekit';

function MyComponent() {
  return (
    <button
      style={{
        backgroundColor: colors.indigo.dark,
        color: 'white',
        border: `1px solid ${colors.grey.light}`
      }}
    >
      ...
    </button>
  );
}
```

## Exports

- [Stylesheet reset](#stylesheet-reset)
- [Colors](#colors)

### Stylesheet reset

A "base" stylesheet with a few sensible rules. It uses [normalize.css](https://necolas.github.io/normalize.css/) to smooth out any inconsistencies between the ways that different browsers render elements. It also applies `box-sizing: border-box;` to everything, for [a better element sizing experience](https://www.paulirish.com/2012/box-sizing-border-box-ftw/). Lastly, the stylesheet imports and sets our two main font families: [Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+Pro), and [Source Code Pro](https://fonts.google.com/specimen/Source+Code+Pro).

You'll probably want to include this file once in your app, ideally at the top-most level. For instance, in a Gatsby site that would be your [`layout.js` component](https://www.gatsbyjs.org/docs/layout-components/).

**JS + webpack or similar**

```js
import '@apollographql/spacekit/reset.css';
```

**LESS**

```less
@import (inline) "../node_modules/@apollographql/spacekit/reset.css
```

### Colors

A JavaScript object that maps color names to palettes of hex codes for easily applying on-brand color to elements on a page. The available colors include:

- `pink`
- `teal`
- `indigo`
- `grey`
- `red`
- `green`
- `blue`
- `orange`
- `yellow`
- `purple`

When you access a color by name (i.e. `colors.indigo`), you'll find a palette of hex codes keyed by a "lightness" variant. These include:

- `base`
- `dark`
- `darker`
- `darkest`
- `light`
- `lighter`
- `lightest`

**CSS-in-JS**

```jsx
import styled from '@emotion/styled';
import {colors} from '@apollographql/spacekit';

const StyledButton = styled.button({
  backgroundColor: colors.indigo.dark,
  color: 'white',
  border: `1px solid ${colors.grey.light}`
});

function MyComponent() {
  return (
    <div>
      <StyledButton>Save</StyledButton>
      <StyledButton
        style={{
          backgroundColor: colors.red.base
        }}
      >
        Delete
      </StyledButton>
    </div>
  );
}
```

## Resources

- [Sketch style guide (Zeplin)](https://app.zeplin.io/project/5c7dcb5ab4e654bca8cde54d/screen/5cd0c46bce9a42346c709328)
- [Living style guide (Storybook)](https://storybook.apollographql.com)
