<div align="center">
  <img height="100" src="https://i.imgur.com/YPhoQOA.png">
  <h1 align="center">Space Kit</h1>
  <p>The home base for Apollo's design system, Space Kit provides essential design resources for our developers to use in the Apollo-branded interfaces that they create.</p>
  <a href="https://www.npmjs.com/package/@apollo/space-kit" title="@apollo/space-kit npm page">
    <img src="https://img.shields.io/npm/v/@apollo/space-kit.svg">
  </a>
</div>

## Getting started

```shell
npm install @apollo/space-kit @emotion/core @emotion/cache framer-motion
```

## Usage

Import things into your JS app from the `@apollo/space-kit` package. All available exports are documented [here](#exports).

```js
import "@apollo/space-kit/reset.css"; // import this at app root
import { colors } from "@apollo/space-kit";

function MyComponent() {
  return (
    <button
      style={{
        backgroundColor: colors.indigo.dark,
        color: "white",
        border: `1px solid ${colors.grey.light}`,
      }}
    >
      ...
    </button>
  );
}
```

## Exports

### Stylesheet reset

_TODO: Move this to storybook docs_

A "base" stylesheet with a few sensible rules. It uses [normalize.css](https://necolas.github.io/normalize.css/) to smooth out any inconsistencies between the ways that different browsers render elements. It also applies `box-sizing: border-box;` to everything, for [a better element sizing experience](https://www.paulirish.com/2012/box-sizing-border-box-ftw/). Lastly, the stylesheet imports and sets our two main font families: [Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+Pro), and [Source Code Pro](https://fonts.google.com/specimen/Source+Code+Pro).

You'll probably want to include this file once in your app, ideally at the top-most level. For instance, in a Gatsby site that would be your [`layout.js` component](https://www.gatsbyjs.org/docs/layout-components/).

**JS + webpack or similar**

```js
import "@apollo/space-kit/reset.css";
```

**LESS**

```less
@import (inline) "../node_modules/@apollo/space-kit/reset.css
```



#### FAQ

##### My icons aren't showing up in the UI

Make sure that the icon component has a width and height applied to it. That can mean applying classes or styles directly to the Icon component, or setting the component to have `height: 100%` and `width: 100%` and then applying a size to the containing element.

##### Why can't I import from `IconServices` from `@apollo/space-kit/icons`?

My goal was to minimze the bundle size increase caused by using these icons. If I had named exports from `space-kit/icons`, then the user would have to make sure they are tree-shaking to only import the icons they are actually using. `engine-frontend` is _not_ yet tree-shaking, so we decided to not make the imports an option.

##### Why does each icon have a named export instead of a default export?

The engine-frontend team and Apollo OSS teams have decided to not use default exports; this continues that trend.

## Developing Space Kit

Developing locally against Storybook is easy; run `npm run storybook`.

### `npm link`

Run `npm run watch` to watch the entire project for changes and recompile on the fly.

You can use `npm link` to develop Space Kit features directly inside another project with a little bit of work. `npm link` does not work out of the box, however, because of React hooks requiring that the same instance of `react` be used everywhere in an application. We must use the same instance of `React` both in this project and in your consuming project. If you're using webpack, add `resolve.alias` fields to your project's configuration like so:

```js
resolve: {
  alias: {
    // Used for `npm link`'ing to Space Kit
    react: path.resolve('./node_modules/react'),
    // Used for `npm link`'ing to Space Kit
    'react-refresh/runtime': path.resolve(
      './node_modules/react-refresh/runtime',
    ),
  },
},
```

### Tests

We use `jest` and `testing-library` for unit/integration tests and will soon use [Chromatic](https://www.chromaticqa.com/) for visual regression testing.

#### Integration Tests

The hardest part about writing tests is knowing what should be tested and what shouldn't. Test interactions: test whatever you'd  test by hand that would give you release confidence.

A few dos and don'ts:

- DO: Test interactions
- DON'T: test anything that doesn't give you more confidence

    In other words, _do not_ add tests to increase code-coverage.

- DO: [Write test names that explain what is being tested, what input is being given, and what is expected](https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-11-include-3-parts-in-each-test-name)
- DO: [Write simple tests with no abstractions](https://github.com/goldbergyoni/javascript-testing-best-practices#%EF%B8%8F-0-the-golden-rule-design-for-lean-testing)

Some resources on testing:

- [JavaScript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- https://kentcdodds.com/blog/
    - [Avoid nesting when you're testing](https://kentcdodds.com/blog/avoid-nesting-when-youre-testing)
    - [Write fewer, longer tests](https://kentcdodds.com/blog/write-fewer-longer-tests)

### Releases

Releases are handled automatically after merging PRs by [`intuit/auto`](https://github.com/intuit/auto). You can split PRs into a feature branch and then send that as a PR to main; that'll use all the different PRs to create the changelog.

#### Semver

Each PR needs to have a SemVer lable in GitHub so `auto` knows how to . Available labels are:

* `patch` - Increment the patch version when merged
* `minor` - Increment the minor version when merged
* `major` - Increment the major version when merged
* `prerelease` - Create a pre-release version when merged
* `skip-release` - Preserve the current version when merged
* `internal` - Changes only affect the internal API
* `documentation` - Changes only affect the documentation

Use `skip-release` if you don't want an automatic release with your PR.

There is a CircleCI job that checks that an appropriate label is on the PR. It will always fail initially. GitHub actions are set up to re-run the CI check when labels are added or removed. it can be found in [`.github/main.workflow`](./.github/main.workflow).

#### Changelog

The changelog will be updated automatically with the title of your PR used as the line item in the changelog. The sections of the changelog will decided by the labels you gave your PR. If you want to add more information for the changelog, add a `## Release Notes` section in your PR description. https://intuit.github.io/auto/pages/auto-changelog.html#additional-release-notes

### Beta Releases

While local development should be done with [`npm link`](https://docs.npmjs.com/cli/link),sometimes we need to release pre-release versions so you can see the effects of Space Kit changes in your project somewhere you can't use `npm link`, like in a pull request. In that case, there are two options:

1. All Space Kit PRs automatically publish a canary build on `npm` and addd a link to that in your PR description
2. You can build your own canary anytime by running `npx auto canary`

## Resources

- [Space Kit's style guide (Zeplin)](https://app.zeplin.io/project/5c7dcb5ab4e654bca8cde54d/screen/5cd0c46bce9a42346c709328)
- [Engine's style guide (Storybook)](https://storybook.apollographql.com)
