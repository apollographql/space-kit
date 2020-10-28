import "@testing-library/jest-dom";
import React from "react";
import userEvent from "@testing-library/user-event";
import { act, render, screen, within } from "@testing-library/react";
import { Select } from "../Select";
import { SpaceKitProvider } from "../SpaceKitProvider";

test("given no `value`, should render `label`", () => {
  render(
    <SpaceKitProvider disableAnimations>
      <Select value={null} label={<>select an item</>}>
        <option value="a">a</option>
        <option value="b">b</option>
      </Select>
    </SpaceKitProvider>
  );

  expect(
    screen.getByRole("button", { name: "select an item" })
  ).toBeInTheDocument();
});

test("given a `value`, should render initial value", () => {
  render(
    <SpaceKitProvider disableAnimations>
      <Select value="a">
        <option value="a">a</option>
        <option value="b">b</option>
      </Select>
    </SpaceKitProvider>
  );

  expect(screen.getByText("a")).toBeInTheDocument();
  expect(screen.queryByText("b")).not.toBeInTheDocument();
  act(() => userEvent.click(screen.getByRole("button")));
});

test("given children mixed with `option` and `optgroup`, should render headings and elements", () => {
  render(
    <SpaceKitProvider disableAnimations>
      <Select value="a">
        <option value="a">a</option>
        <option value="b">b</option>
        <optgroup label="group c">
          <option>d</option>
          <option>e</option>
        </optgroup>
      </Select>
    </SpaceKitProvider>
  );

  act(() => userEvent.click(screen.getByRole("button")));
  expect(screen.getByRole("option", { name: "a" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "b" })).toBeInTheDocument();

  const groupC = screen.getByRole("group", { name: "group c" });
  expect(groupC).toBeInTheDocument();
  expect(
    within(groupC).getByRole("heading", { name: "group c" })
  ).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "d" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "e" })).toBeInTheDocument();
});

test("when clicking button, menu shoud show", () => {
  render(
    <SpaceKitProvider disableAnimations>
      <Select value="a">
        <option value="a">a</option>
        <option value="b">b</option>
      </Select>
    </SpaceKitProvider>
  );

  expect(screen.getByText("a")).toBeInTheDocument();
  expect(screen.queryByText("b")).not.toBeInTheDocument();
  act(() => userEvent.click(screen.getByRole("button")));
  expect(screen.getByRole("option", { name: "a" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "b" })).toBeInTheDocument();
});

test("when clicking a select trigger in a form, form is not submitted", () => {
  const handleSubmit = jest.fn();

  render(
    <SpaceKitProvider disableAnimations>
      <form onSubmit={handleSubmit}>
        <Select value="a">
          <option value="a">a</option>
          <option value="b">b</option>
        </Select>
      </form>
    </SpaceKitProvider>
  );

  act(() => userEvent.click(screen.getByRole("button")));
  expect(screen.getByRole("listbox")).toBeInTheDocument();
  expect(handleSubmit).not.toHaveBeenCalled();
});
