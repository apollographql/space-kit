/*eslint react/jsx-sort-props: "error" */
import "@testing-library/jest-dom";
import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Input } from "../Input";

test("renders placeholder", () => {
  render(<Input id="test" placeholder="placeholder" />);

  expect(screen.getByPlaceholderText("placeholder")).toBeInTheDocument();
});

test("calls events", () => {
  const onBlur = jest.fn();
  const onChange = jest.fn();
  const onFocus = jest.fn();

  render(
    <Input
      data-testid="input"
      id="test"
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
    />,
  );

  const input = screen.getByRole("textbox") as HTMLInputElement;

  expect(input).toBeInTheDocument();

  expect(onBlur).not.toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
  expect(onFocus).not.toHaveBeenCalled();

  input.focus();
  expect(onBlur).not.toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
  expect(onFocus).toHaveBeenCalledTimes(1);

  userEvent.type(input, "test");
  expect(onBlur).not.toHaveBeenCalled();
  expect(onChange).toHaveBeenCalledTimes(4);

  input.blur();
  expect(onBlur).toHaveBeenCalledTimes(1);
});

test("when disabled, does not accept input", () => {
  const textInput = "this is text i typed";

  render(<Input disabled id="test" />);

  const textbox = screen.getByRole("textbox") as HTMLInputElement;
  expect(textbox).toBeInTheDocument();
  userEvent.type(textbox, textInput);
  expect(textbox.value).toBe("");
});
