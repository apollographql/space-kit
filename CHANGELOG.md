# v1.7.1 (Thu Aug 22 2019)

#### 🐛  Bug Fix

- fix(TextField): Pass `name` and `type` to `<input>` [#76](https://github.com/apollographql/space-kit/pull/76) ([@justinanastos](https://github.com/justinanastos))
- feat(Button): change light theme button shadow per @torres [#77](https://github.com/apollographql/space-kit/pull/77) ([@justinanastos](https://github.com/justinanastos))

#### Authors: 1

- Justin Anastos ([@justinanastos](https://github.com/justinanastos))

---

# v1.7.0 (Thu Aug 22 2019)

#### 🚀  Enhancement

- Add `inputAs` prop to `TextField` to customize how the underlying… [#72](https://github.com/apollographql/space-kit/pull/72) ([@justinanastos](https://github.com/justinanastos))

#### ⚠️  Pushed to master

- 1.6.0  ([@justinanastos](https://github.com/justinanastos))

#### Authors: 1

- Justin Anastos ([@justinanastos](https://github.com/justinanastos))

# v1.6.0 (Tue Aug 20 2019)

#### 🚀  Enhancement

- Add `as` prop to `Button` [#70](https://github.com/apollographql/space-kit/pull/70) ([@justinanastos](https://github.com/justinanastos))

#### 🐛 Bug Fix

- fix(button): fix disabled button style #70 ([@justinanastos](https://github.com/justinanastos))
- build: update ssh fingerprint to release through `apollo-bot2` #74 ([@justinanastos](https://github.com/justinanastos))

#### Authors: 1

- Justin Anastos ([@justinanastos](https://github.com/justinanastos))

# v1.5.1 (Thu Aug 15 2019)

### Release Notes

_From #69_

@justinanastos made an update to the TextField logic and didn't update the clean script. This fixes it.

---

#### 🐛  Bug Fix

- Correct npm script for cleaning TextField, make labels optional [#69](https://github.com/apollographql/space-kit/pull/69) ([@mayakoneval](https://github.com/mayakoneval))

#### Authors: 1

- [@mayakoneval](https://github.com/mayakoneval)

---

# v1.5.0 (Thu Aug 15 2019)

#### 🚀  Enhancement

- Small text field fixes [#67](https://github.com/apollographql/space-kit/pull/67) ([@jgzuke](https://github.com/jgzuke))

#### Authors: 1

- Jason Zukewich ([@jgzuke](https://github.com/jgzuke))

---

# v1.4.0 (Tue Aug 13 2019)

#### 🚀  Enhancement

- AP-544 Implement Text Inputs [#45](https://github.com/apollographql/space-kit/pull/45) ([@mayakoneval](https://github.com/mayakoneval) [@justinanastos](https://github.com/justinanastos))

#### Authors: 2

- [@mayakoneval](https://github.com/mayakoneval)
- Justin Anastos ([@justinanastos](https://github.com/justinanastos))

---

# v1.3.1 (Mon Aug 12 2019)

#### 🐛  Bug Fix

- removed table header margins to match table body [#66](https://github.com/apollographql/space-kit/pull/66) (monsalve@mit.edu)

#### Authors: 1

- monsalve@mit.edu

---

# v1.3.0 (Mon Aug 12 2019)

#### 🚀  Enhancement

- feat(button): Replace feel="secondary" with color={colors.white} [#65](https://github.com/apollographql/space-kit/pull/65) ([@justinanastos](https://github.com/justinanastos))

#### Authors: 1

- Justin Anastos ([@justinanastos](https://github.com/justinanastos))

---

# v1.2.0 (Mon Aug 12 2019)

#### 🚀  Enhancement

- Automatically calculate button text color [#64](https://github.com/apollographql/space-kit/pull/64) ([@justinanastos](https://github.com/justinanastos))

#### Authors: 1

- Justin Anastos ([@justinanastos](https://github.com/justinanastos))

---

# v1.1.1 (Mon Aug 12 2019)

#### 🐛  Bug Fix

- install emotion dependencies in dependencies [#62](https://github.com/apollographql/space-kit/pull/62) ([@justinanastos](https://github.com/justinanastos))
- fix(button): center icons [#63](https://github.com/apollographql/space-kit/pull/63) ([@justinanastos](https://github.com/justinanastos))

#### Authors: 1

- Justin Anastos ([@justinanastos](https://github.com/justinanastos))

---

# v1.1.0 (Sun Aug 11 2019)

#### 🚀  Enhancement

- AP-700 Export `emotionCacheProviderFactory` so allow consumers to… [#46](https://github.com/apollographql/space-kit/pull/46) ([@justinanastos](https://github.com/justinanastos))

#### Authors: 1

- Justin Anastos ([@justinanastos](https://github.com/justinanastos))

---

# v1.0.6 (Fri Aug 09 2019)

### Release Notes

_From #58_

There's no easy way to override the classes that we're putting on our Space Kit components until https://github.com/apollographql/space-kit/pull/46 lands. We can't put default sizes on icons because they can't be overridden yet.

---

#### 🐛  Bug Fix

- Change `Icon` to have `thin` and `normal` weights [#59](https://github.com/apollographql/space-kit/pull/59) ([@justinanastos](https://github.com/justinanastos))
- remove default size on icons [#58](https://github.com/apollographql/space-kit/pull/58) ([@justinanastos](https://github.com/justinanastos))

#### Authors: 1

- Justin Anastos ([@justinanastos](https://github.com/justinanastos))

---

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
