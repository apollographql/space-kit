import "@testing-library/jest-dom/extend-expect";
import * as faker from "faker";
import { Button } from "./Button";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { IconShip2 } from "../icons/IconShip2";
import React from "react";

afterEach(cleanup);

test("default button renders", () => {
  const { getByText } = render(<Button>submit</Button>);

  expect(getByText("submit")).toBeInTheDocument();
});

test("when passed an icon, text and icon are rendered", () => {
  const { getByText, getByTestId } = render(
    <Button icon={<IconShip2 data-testid="icon" />}>submit</Button>
  );

  expect(getByText("submit")).toBeInTheDocument();
  expect(getByTestId("icon")).toBeInTheDocument();
});

test("wyhen passed an icon and no children, should render an icon and no text content", () => {
  const { container, getByTestId } = render(
    <Button icon={<IconShip2 data-testid="icon" />} />
  );

  expect(container).toHaveTextContent("");
  expect(getByTestId("icon")).toBeInTheDocument();
});

test("when passed `as` prop renders that element", () => {
  // include passthrough props
  const { container, getByText } = render(
    <Button as={<a href="https://apollographql.com" />}>button</Button>
  );

  expect(container.querySelector("a")).toBeInTheDocument();
  expect(container.querySelector("button")).not.toBeInTheDocument();
  expect(getByText("button")).toBeInTheDocument();
});

test("when disabled, button does not call click handlers", () => {
  const rootElementOnClick = jest.fn();
  const asElementOnClick = jest.fn();

  const { getByTestId } = render(
    <Button
      as={<button onClick={asElementOnClick} />}
      data-testid="button"
      disabled
      onClick={rootElementOnClick}
    >
      submit
    </Button>
  );

  // act
  getByTestId("button").click();

  // assert
  expect(asElementOnClick).not.toHaveBeenCalled();
  expect(rootElementOnClick).not.toHaveBeenCalled();
});

test("when disabled, button with 'as=' set to not a button element does not call click handlers", () => {
  const rootElementOnClick = jest.fn();
  const asElementOnClick = jest.fn();

  const { getByTestId } = render(
    <Button
      as={<div onClick={asElementOnClick} />}
      data-testid="button"
      disabled
      onClick={rootElementOnClick}
    >
      submit
    </Button>
  );

  // act
  getByTestId("button").click();

  // assert
  expect(asElementOnClick).not.toHaveBeenCalled();
  expect(rootElementOnClick).not.toHaveBeenCalled();
});

test("when loading, button does not call click handlers", () => {
  const rootElementOnClick = jest.fn();
  const asElementOnClick = jest.fn();

  const { getByTestId } = render(
    <Button
      as={<button onClick={asElementOnClick} />}
      data-testid="button"
      loading
      onClick={rootElementOnClick}
    >
      submit
    </Button>
  );

  // act
  getByTestId("button").click();

  // assert
  expect(asElementOnClick).not.toHaveBeenCalled();
  expect(rootElementOnClick).not.toHaveBeenCalled();
});

test("when clicked should remove focus from itself", () => {
  const { getByTestId } = render(<Button data-testid="button">submit</Button>);
  const button = getByTestId("button");

  // Verify button can have the focus at all, for example, when tabbed to
  button.focus();
  expect(button).toHaveFocus();

  // Click the button and expect the focus to go away
  fireEvent.click(button);
  expect(button).not.toHaveFocus();
});

test("when passed onClick props to the element and the `as` prop, they should both be called", () => {
  const rootElementOnClick = jest.fn();
  const asElementOnClick = jest.fn();

  const { getByText } = render(
    <Button
      as={<button onClick={asElementOnClick} />}
      onClick={rootElementOnClick}
    >
      submit
    </Button>
  );

  // act
  fireEvent.click(getByText("submit"));

  // assert
  expect(asElementOnClick).toHaveBeenCalled();
  expect(rootElementOnClick).toHaveBeenCalled();
});

test("when passed unrecognized props, they should be rendered in the dom", () => {
  const { getByTestId } = render(
    <Button
      className="testClass"
      data-test-prop="test"
      data-testid="button"
      style={{ margin: 10 }}
    >
      button
    </Button>
  );

  const button = getByTestId("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("testClass");
  expect(button).toHaveStyle("margin: 10px");
  expect(button).toHaveAttribute("data-test-prop");
});

test("when passed a type, should render it in the dom", () => {
  const { getByTestId } = render(
    <Button data-testid="button" type="button">
      button
    </Button>
  );

  expect(getByTestId("button")).toHaveAttribute("type", "button");
});

test("ref is forwarded", () => {
  const ref = React.createRef<HTMLElement>();
  const testId = faker.lorem.word();

  const { getByTestId } = render(
    <Button data-testid={testId} ref={ref}>
      {faker.lorem.word()}
    </Button>
  );

  expect(ref.current).toBe(getByTestId(testId));
});
