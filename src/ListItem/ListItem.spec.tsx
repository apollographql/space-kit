import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { ListItem } from "../ListItem";

it("given `as` prop, custom element should be rendered", () => {
  render(
    <ListItem as={<a href="google.com" />} data-testid="ListItem">
      text
    </ListItem>
  );

  expect(screen.getByTestId("ListItem").tagName).toBe("A");
});

it("given no `as` prop, ref should be passed through", () => {
  const ref = React.createRef<HTMLDivElement>();

  render(
    <ListItem data-testid="ListItem" ref={ref}>
      text
    </ListItem>
  );

  expect(ref.current).toBe(screen.getByTestId("ListItem"));
});

it("given `as` prop, ref should be passed through", () => {
  const ref = React.createRef<HTMLDivElement>();

  render(
    <ListItem
      as={<a href="https://apollographql.com" />}
      data-testid="ListItem"
      ref={ref}
    >
      text
    </ListItem>
  );

  expect(ref.current).toBe(screen.getByTestId("ListItem"));
});

it("given `className`, it should be merged with other class names", () => {
  render(
    <ListItem className="test-class-name" data-testid="ListItem">
      text
    </ListItem>
  );

  expect(screen.getByTestId("ListItem")).toHaveClass("test-class-name");
  expect(
    screen.getByTestId("ListItem").getAttribute("class")?.split(/\s/)
  ).toHaveLength(2);
});
