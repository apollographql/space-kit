import React from "react";
import { reactNodeToDownshiftItems } from "./reactNodeToDownshiftItems";

it("should work with options with no `value` props", () => {
  expect(
    reactNodeToDownshiftItems([
      <option key="a">a</option>,
      <option key="b">b</option>,
    ]),
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "children": "a",
      },
      Object {
        "children": "b",
      },
    ]
  `);
});

it("when passed top-level `option` with no value prop and a non-string children, should throw TypeError", () => {
  expect(() =>
    reactNodeToDownshiftItems([
      <option key="a">
        <div>a</div>
      </option>,
    ]),
  ).toThrowError(TypeError);
});

it("when passed option nested under an `optGroup` with the option having no value prop and a non-string children, should throw TypeError", () => {
  expect(() =>
    reactNodeToDownshiftItems([
      <optgroup key="a" label="label a">
        <option key="a">
          <div>a</div>
        </option>
      </optgroup>,
    ]),
  ).toThrowError(TypeError);
});

it("should work with options with `value` props", () => {
  expect(
    reactNodeToDownshiftItems([
      <option key="a" value="value a">
        a
      </option>,
      <option key="b" value="value b">
        b
      </option>,
    ]),
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "children": "a",
        "value": "value a",
      },
      Object {
        "children": "b",
        "value": "value b",
      },
    ]
  `);
});

it("should work with options with forwarded refs", () => {
  const Option = React.forwardRef<
    HTMLOptionElement,
    React.PropsWithChildren<
      React.DetailedHTMLProps<
        React.OptionHTMLAttributes<HTMLOptionElement>,
        HTMLOptionElement
      >
    >
  >((props, ref) => <option {...props} ref={ref} />);

  expect(
    reactNodeToDownshiftItems([
      <Option key="a" value="value a">
        a
      </Option>,
      <Option key="b" value="value b">
        b
      </Option>,
    ]),
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "children": "a",
        "value": "value a",
      },
      Object {
        "children": "b",
        "value": "value b",
      },
    ]
  `);
});

it("given `optgroup` and `option`s, should return correct result", () => {
  expect(
    reactNodeToDownshiftItems(
      <optgroup key="a" label="label a">
        <option key="a">a</option>
        <option key="b">b</option>
      </optgroup>,
    ),
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "children": "a",
      },
      Object {
        "children": "b",
      },
    ]
  `);

  expect(
    reactNodeToDownshiftItems(
      <optgroup key="a" label="label a">
        <option key="a" value="a">
          a
        </option>
        <option key="b" value="b">
          b
        </option>
      </optgroup>,
    ),
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "children": "a",
        "value": "a",
      },
      Object {
        "children": "b",
        "value": "b",
      },
    ]
  `);
});

it("given mixed `optgroup` and `option`s without `value` props, should return correct result", () => {
  expect(
    reactNodeToDownshiftItems([
      <optgroup key="a" label="label a">
        <option key="a">a</option>
        <option key="b">b</option>
      </optgroup>,
      <option key="c">c</option>,
    ]),
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "children": "a",
      },
      Object {
        "children": "b",
      },
      Object {
        "children": "c",
      },
    ]
  `);
});

it("given mixed `optgroup` and `option`s with `value` props, should return correct result", () => {
  expect(
    reactNodeToDownshiftItems([
      <optgroup key="a" label="label a">
        <option key="a" value="value a">
          a
        </option>
        <option key="b" value="value b">
          b
        </option>
      </optgroup>,
      <option key="c" value="value c">
        c
      </option>,
    ]),
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "children": "a",
        "value": "value a",
      },
      Object {
        "children": "b",
        "value": "value b",
      },
      Object {
        "children": "c",
        "value": "value c",
      },
    ]
  `);
});
