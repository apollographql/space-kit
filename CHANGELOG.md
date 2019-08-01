# v1.0.5 (Thu Aug 08 2019)

### Release Notes

_From #57_

* Refactor icon conversion script to use `@babel/types` instead of `immutability-helper` and trying to craft AST by hand. That was too opaque and it wasn't type safe. Now we're safe and it's as concise as it's going to get.

* Move intermediate icon files to `src/icons`

    This makes them accessible from anywhere else _and_ gives them access to other modules. We _were_ going to use this for the `EmotionProvider`, but now we aren't. This is less elegant and clever, but makes more sense and will make our code actually work.

---

#### 🐛  Bug Fix

- Refactor icon generation [#57](https://github.com/apollographql/space-kit/pull/57) ([@justinanastos](https://github.com/justinanastos))

#### Authors: 1

- Justin Anastos ([@justinanastos](https://github.com/justinanastos))

---

# v1.0.4 (Thu Aug 08 2019)

#### 🐛  Bug Fix

- Test automatic releases [#56](https://github.com/apollographql/space-kit/pull/56) ([@justinanastos](https://github.com/justinanastos))

#### ⚠️  Pushed to master

- 1.0.3  ([@justinanastos](https://github.com/justinanastos))
- Use read-write key for deploys  ([@justinanastos](https://github.com/justinanastos))
- still working on automatic releases  ([@justinanastos](https://github.com/justinanastos))

#### Authors: 1

- Justin Anastos ([@justinanastos](https://github.com/justinanastos))

---

# Changelog

## Upcoming

- Added colProps property to the table columns [#32](https://github.com/apollographql/space-kit/pull/32)

## [`v0.7.3`](https://github.com/apollographql/space-kit/releases/tag/v0.7.3)

- Remove `.awcache` from releases
- Remove eslint cache and config from releases

## [`v0.7.0`](https://github.com/apollographql/space-kit/releases/tag/v0.7.0)

- Convert all remaining files to TypeScript (#27)
- Move all `src` files to live in paths (#31)
- Fix broken storybook (#39)
- Remove top level Space Kit namespace in Storybook (#38)
- Make Icon weight configurable (#33)
- Edit Modal prop descriptions, fix margin top on children [#41](https://github.com/apollographql/space-kit/pull/41)
- Export constant from `colors` instead of requiring `import * as colors` (#35)
- Add Card component (#34)
- Text Inputs and Steppers [(#45)](https://github.com/apollographql/space-kit/pull/45)

## [`v0.6.2`](https://github.com/apollographql/space-kit/releases/tag/v0.6.2)

- Remove tsconfig.buildinfo from builds (#30)

## [`v0.6.1`](https://github.com/apollographql/space-kit/releases/tag/v0.6.1)

- Roll back changes for custom css injection point in favor of documentation on how todo it yourself (#xx, [AP-543](https://golinks.io/j/AP-543))
- Move `@emotion/core` to `dependencies` so consumers will install it automatically (#xx, [AP-543](https://golinks.io/j/AP-543))
- Refactor Buttons implementation and change external interface (#26, [AP-543](https://golinks.io/j/AP-543))
- Implement Modals (#22, [AP-545](https://golinks.io/j/AP-545))
- Implement Tables (#21, [AP-546](https://golinks.io/j/AP-546))

## [`v0.4.1`](https://github.com/apollographql/space-kit/releases/tag/v0.4.1)

- Allow custom emotion css injection point (#23, [AP-543](https://golinks.io/j/AP-543))

## [`v0.4.0`](https://github.com/apollographql/space-kit/releases/tag/v0.4.0)

- Add buttons implementation (#10, [AP-543](https://golinks.io/j/AP-543))

## [`v0.2.0`](https://github.com/apollographql/space-kit/releases/tag/v0.2.0)

- Add initial typography implementation (#8, [AP-542](https://golinks.io/j/AP-542))
