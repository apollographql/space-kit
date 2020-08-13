import "@testing-library/jest-dom";
import React from "react";
import userEvent from "@testing-library/user-event";
import { act, render } from "@testing-library/react";
import { TextField } from "./TextField";

test("when passed a label, renders it", () => {
  const { getByText } = render(<TextField label="label text" />);

  getByText("label text");
});

test("when the label is clicked it focuses the input", () => {
  const labelText = "label text";
  const { container, getByLabelText } = render(<TextField label={labelText} />);

  // Use `throw` so TypeScript knows `label` is not null
  const label = container.querySelector("label");
  if (!label) throw new Error("Could not find label");

  const input = getByLabelText(labelText);
  expect(input).not.toHaveFocus();

  act(() => userEvent.click(label));
  expect(input).toHaveFocus();
});

test("when passed an error and info, only renders the error", () => {
  const { container, queryByText, getByText } = render(
    <TextField helper="helper text" error="error text" />
  );

  getByText("error text");
  expect(queryByText("helper text")).not.toBeInTheDocument();
  expect(container.querySelectorAll("svg")).toHaveLength(1);
});

test("when passed an error, renders error and svg", () => {
  const { container, getByText } = render(<TextField error="error text" />);

  getByText("error text");
  expect(container.querySelector("svg")).toBeInTheDocument();
});

test("when passed `helper` and not `showInfoIcon`, renders no svg", () => {
  const { container, getByText } = render(<TextField helper="helper text" />);

  getByText("helper text");
  expect(container.querySelector("svg")).not.toBeInTheDocument();
});

test("when passed `helper` and `showInfoIcon`, renders an svg", () => {
  const { container, getByText } = render(
    <TextField helper="helper text" showInfoIcon />
  );

  getByText("helper text");
  expect(container.querySelector("svg")).toBeInTheDocument();
});

test("when passed `autoFocus` prop, should have focus after mounting", () => {
  const labelText = "label text";
  const { getByLabelText } = render(<TextField autoFocus label={labelText} />);

  const textField = getByLabelText(labelText);

  expect(textField).toHaveFocus();
});

test("when not passed `autoFocus` prop, should not have focus after mounting", () => {
  const labelText = "label text";
  const { getByLabelText } = render(<TextField label={labelText} />);

  const textField = getByLabelText(labelText);

  expect(textField).not.toHaveFocus();
});

test("renders icon", () => {
  const { getByTestId } = render(
    <TextField icon={<svg data-testid="icon" />} />
  );

  getByTestId("icon");
});

test("renders placeholder", () => {
  const { getByPlaceholderText } = render(
    <TextField placeholder="placeholder" />
  );

  getByPlaceholderText("placeholder");
});

test("calls events", async () => {
  const onBlur = jest.fn();
  const onChange = jest.fn();
  const onFocus = jest.fn();

  const { getByTestId } = render(
    <TextField
      inputAs={<input data-testid="input" />}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
    />
  );

  const input = getByTestId("input");

  expect(onBlur).not.toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
  expect(onFocus).not.toHaveBeenCalled();

  input.focus();
  expect(onBlur).not.toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
  expect(onFocus).toHaveBeenCalled();

  await act(() => userEvent.type(input, "test"));
  expect(onBlur).not.toHaveBeenCalled();
  expect(onChange).toHaveBeenCalled();

  input.blur();
  expect(onBlur).toHaveBeenCalled();
});

test("when disabled, does not accept input", async () => {
  const textInput = "this is text i typed";
  const inputLabel = "label";
  const { getByLabelText, queryByText } = render(
    <TextField label={inputLabel} />
  );

  const input = getByLabelText(inputLabel);
  await act(() => userEvent.type(input, textInput));

  expect(queryByText(textInput)).not.toBeInTheDocument();
});
