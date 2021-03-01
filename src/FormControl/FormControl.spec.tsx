/*eslint react/jsx-sort-props: "error" */
import "@testing-library/jest-dom";
import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { FormControl } from "../FormControl";
import { FormLabel } from "../FormLabel";
import { FormHelperText } from "../FormHelperText";
import { Input } from "../Input";
import { FormErrorMessage } from "../FormErrorMessage";

test("when passed a label, renders it", () => {
  render(
    <FormControl id="test">
      <FormLabel>label text</FormLabel>
      <Input />
    </FormControl>,
  );

  expect(screen.getByText("label text")).toBeInTheDocument();
});

test("when the label is clicked it focuses the input", () => {
  const labelText = "label text";
  const { container } = render(
    <FormControl id="test">
      <FormLabel>{labelText}</FormLabel>
      <Input />
    </FormControl>,
  );

  // Use `throw` so TypeScript knows `label` is not null
  const label = container.querySelector("label");
  if (!label) throw new Error("Could not find label");

  const input = screen.getByLabelText(labelText);
  expect(input).not.toHaveFocus();

  userEvent.click(label);
  expect(input).toHaveFocus();
});

test("when passed `HelperText`, helper text is rendered", () => {
  const { container } = render(
    <FormControl id="test">
      <FormHelperText>helper text</FormHelperText>
      <Input />
    </FormControl>,
  );

  expect(screen.queryByText("helper text")).toBeInTheDocument();
  expect(container.querySelectorAll("svg")).toHaveLength(1);
});

test("when passed two `HelperText` and `FormErrorMessage`, only renders the `FormErrorMessage`", () => {
  const { container } = render(
    <FormControl id="test">
      <Input />
      <FormHelperText>helper text</FormHelperText>
      <FormErrorMessage>error text</FormErrorMessage>
    </FormControl>,
  );

  expect(screen.getByText("error text")).toBeInTheDocument();
  expect(screen.queryByText("helper text")).not.toBeInTheDocument();
  expect(container.querySelectorAll("svg")).toHaveLength(1);
});

test("when passed `<FormErrorMessage />`, renders error and svg", () => {
  const { container } = render(
    <FormControl id="test">
      <Input />
      <FormErrorMessage>error text</FormErrorMessage>
    </FormControl>,
  );

  expect(screen.getByText("error text")).toBeInTheDocument();
  expect(container.querySelector("svg")).toBeInTheDocument();
});

test("when passed `<FormErrorMessage />` that is removed, removes the error message", () => {
  const Component: React.FC<{ errorText?: string }> = ({ errorText }) => (
    <FormControl id="test">
      <Input />
      {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
    </FormControl>
  );

  const { container, rerender } = render(<Component errorText="error text" />);

  expect(screen.getByText("error text")).toBeInTheDocument();
  expect(container.querySelector("svg")).toBeInTheDocument();

  rerender(<Component />);

  expect(screen.queryByText("error text")).not.toBeInTheDocument();
});

test("when passed `<HelperText>` witout `showIcon` prop, renders no svg", () => {
  const { container } = render(
    <FormControl id="test">
      <Input />
      <FormHelperText>helper text</FormHelperText>
    </FormControl>,
  );

  expect(screen.getByText("helper text")).toBeInTheDocument();
  expect(container.querySelector("svg")).not.toBeInTheDocument();
});

test("when passed `<HelperText>` with `showIcon` prop, renders svg", () => {
  const { container } = render(
    <FormControl id="test">
      <FormHelperText showIcon>helper text</FormHelperText>
      <Input />
    </FormControl>,
  );

  expect(screen.getByText("helper text")).toBeInTheDocument();
  expect(container.querySelector("svg")).toBeInTheDocument();
});

test("when not passed `autoFocus` prop, should not have focus after mounting", () => {
  const labelText = "label text";
  render(
    <FormControl id="test">
      <FormLabel>{labelText}</FormLabel>
      <Input />
    </FormControl>,
  );

  const formField = screen.getByLabelText(labelText);

  expect(formField).not.toHaveFocus();
});
