import "@testing-library/jest-dom";
import * as faker from "faker";
import { Button } from "../Button";
import { Tooltip } from "../Tooltip";
import { act, render, screen } from "@testing-library/react";
import { IconShip2 } from "../icons/IconShip2";
import React from "react";
import userEvent from "@testing-library/user-event";
import { matchers } from "jest-emotion";
import { colors } from "../colors";

// Add the custom matchers provided by 'jest-emotion'
expect.extend(matchers);

test("default button renders", () => {
  render(<Button>submit</Button>);

  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("when passed an icon, text and icon are rendered", () => {
  render(<Button icon={<IconShip2 data-testid="icon" />}>submit</Button>);

  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByTestId("icon")).toBeInTheDocument();
});

test("when passed an endIcon and text, both are rendered", () => {
  render(<Button endIcon={<IconShip2 data-testid="icon" />}>submit</Button>);

  screen.getByRole("button");
  screen.getByTestId("icon");
});

test("when passed an icon, endIcon, and text; all are rendered", () => {
  render(
    <Button
      endIcon={<IconShip2 data-testid="endIcon" />}
      icon={<IconShip2 data-testid="icon" />}
    >
      submit
    </Button>,
  );

  screen.getByRole("button");
  screen.getByTestId("icon");
  screen.getByTestId("endIcon");
});

test("when passed an icon and no children, should render an icon and no text content", () => {
  render(<Button icon={<IconShip2 data-testid="icon" />} />);

  expect(screen.getByRole("button")).toHaveTextContent("");
  expect(screen.getByTestId("icon")).toBeInTheDocument();
});

test("when passed `as` prop renders that element", () => {
  // include passthrough props
  render(<Button as={<a href="https://apollographql.com" />}>button</Button>);

  expect(screen.getByRole("link")).toBeInTheDocument();
  expect(screen.getByRole("link")).toHaveTextContent("button");
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});

test("when disabled, button does not call click handlers", () => {
  const rootElementOnClick = jest.fn();
  const asElementOnClick = jest.fn();

  render(
    <Button
      as={<button onClick={asElementOnClick} />}
      disabled
      onClick={rootElementOnClick}
    >
      submit
    </Button>,
  );

  // act
  screen.getByRole("button").click();

  // assert
  expect(asElementOnClick).not.toHaveBeenCalled();
  expect(rootElementOnClick).not.toHaveBeenCalled();
});

test("when wrapped in a Tooltip, disabled, hovered, disabled style is rendered", async () => {
  render(
    <Tooltip content="tooltip">
      <Button disabled>button</Button>
    </Tooltip>,
  );

  const button = screen.getByRole("button");
  expect(button).toHaveStyleRule("background-color", colors.silver.light);

  // Wait for the tooltip to appear
  userEvent.hover(button);
  await screen.findByText("tooltip");

  expect(button).toHaveStyleRule("background-color", colors.silver.light);
});

test("when wrapped in a Tooltip, disabled, hovered, Tooltip content is visible", async () => {
  render(
    <Tooltip content="tooltip">
      <Button disabled>button</Button>
    </Tooltip>,
  );

  userEvent.hover(screen.getByRole("button"));

  await screen.findByText("tooltip");
});

test("when not wrapped in a Tooltip, disabled prop is applied to DOM", () => {
  render(<Button disabled>button</Button>);

  expect(screen.getByRole("button")).toBeDisabled();
});

test("when wrapped in a Tooltip, disabled prop is applied to DOM", () => {
  render(
    <Tooltip content="tooltip">
      <Button disabled>button</Button>
    </Tooltip>,
  );

  expect(screen.getByRole("button")).toBeDisabled();
});

test("when disabled, button with 'as=' set to not a button element does not call click handlers", () => {
  const rootElementOnClick = jest.fn();
  const asElementOnClick = jest.fn();

  render(
    <Button
      as={<div onClick={asElementOnClick} />}
      disabled
      onClick={rootElementOnClick}
    >
      submit
    </Button>,
  );

  act(() => userEvent.click(screen.getByText("submit")));

  // assert
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  expect(asElementOnClick).not.toHaveBeenCalled();
  expect(rootElementOnClick).not.toHaveBeenCalled();
});

test("when loading, button does not call click handlers", () => {
  const rootElementOnClick = jest.fn();
  const asElementOnClick = jest.fn();

  render(
    <Button
      as={<button onClick={asElementOnClick} />}
      data-testid="button"
      loading
      onClick={rootElementOnClick}
    >
      submit
    </Button>,
  );

  // act
  act(() => userEvent.click(screen.getByRole("button")));

  // assert
  expect(asElementOnClick).not.toHaveBeenCalled();
  expect(rootElementOnClick).not.toHaveBeenCalled();
});

test("when passed onClick props to the element and the `as` prop, they should both be called", () => {
  const rootElementOnClick = jest.fn();
  const asElementOnClick = jest.fn();

  render(
    <Button
      as={<button onClick={asElementOnClick} />}
      onClick={rootElementOnClick}
    >
      submit
    </Button>,
  );

  // act
  act(() => userEvent.click(screen.getByRole("button")));

  // assert
  expect(asElementOnClick).toHaveBeenCalled();
  expect(rootElementOnClick).toHaveBeenCalled();
});

test("given a top-level `className` and an `as` prop with it's own `className`, `className` props are merged", () => {
  render(
    <Button className="testClassA" as={<button className="testClassB" />} />,
  );

  const button = screen.getByRole("button");

  expect(button).toHaveClass("testClassA");
  expect(button).toHaveClass("testClassB");
});

test("when passed unrecognized props, they should be rendered in the dom", () => {
  render(
    <Button
      className="testClass"
      data-test-prop="test"
      data-testid="button"
      style={{ margin: 10 }}
    >
      {faker.random.word()}
    </Button>,
  );

  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("testClass");
  expect(button).toHaveStyle("margin: 10px");
  expect(button).toHaveAttribute("data-test-prop");
});

test("when passed a type, should render it in the dom", () => {
  render(<Button type="button">{faker.random.word()}</Button>);

  expect(screen.getByRole("button")).toHaveAttribute("type", "button");
});

test("ref is forwarded", () => {
  const ref = React.createRef<HTMLElement>();

  render(<Button ref={ref}>{faker.lorem.word()}</Button>);

  expect(ref.current).toBe(screen.getByRole("button"));
});
