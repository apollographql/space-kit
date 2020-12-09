import "@testing-library/jest-dom";
import React from "react";
import userEvent from "@testing-library/user-event";
import { act, render, screen } from "@testing-library/react";
import { Switch } from "../Switch";

it("given an unselected switch, should toggle when clicked", () => {
  render(<Switch defaultSelected={false}>switch</Switch>);

  act(() => {
    userEvent.click(screen.getByRole("switch"));
  });

  expect(screen.getByRole("switch")).toBeChecked();
});

it("given a selected switch, should toggle when clicked", () => {
  render(<Switch defaultSelected>switch</Switch>);

  act(() => {
    userEvent.click(screen.getByRole("switch"));
  });

  expect(screen.getByRole("switch")).not.toBeChecked();
});

it("given a disabled switch, should not toggle when clicked", () => {
  render(
    <Switch defaultSelected={false} isDisabled>
      switch
    </Switch>,
  );

  act(() => {
    userEvent.click(screen.getByRole("switch"));
  });

  expect(screen.getByRole("switch")).not.toBeChecked();
});

it("given an unselected switch with a textual status, status should exist and not be in the label", () => {
  render(
    <Switch defaultSelected={false} showTextualState>
      switch
    </Switch>,
  );

  expect(screen.getByText(/off/i)).toBeInTheDocument();
  expect(screen.queryByLabelText(/off/i)).toBeInTheDocument();
});

it("given a selected switch with a textual status, status should exist and not be in the label", () => {
  render(
    <Switch defaultSelected showTextualState>
      switch
    </Switch>,
  );

  expect(screen.getByText(/on/i)).toBeInTheDocument();
  expect(screen.queryByLabelText(/on/i)).toBeInTheDocument();
});

it("given a selected switch without a textual status, textual status should not be found", () => {
  render(
    <Switch defaultSelected showTextualState={false}>
      switch
    </Switch>,
  );

  expect(screen.queryByText(/on/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/on/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/off/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/off/i)).not.toBeInTheDocument();
});

it("given an unselected switch without a textual status, textual status should not be found", () => {
  render(
    <Switch defaultSelected={false} showTextualState={false}>
      switch
    </Switch>,
  );

  expect(screen.queryByText(/on/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/on/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/off/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/off/i)).not.toBeInTheDocument();
});

it("given an aria-labledby, component should be wired up correctly", () => {
  render(
    <React.Fragment>
      <Switch defaultSelected={false} aria-labelledby="other-element" />
      <div id="other-element">label</div>
    </React.Fragment>,
  );

  act(() => {
    userEvent.click(screen.getByLabelText("label"));
  });

  expect(screen.getByRole("switch")).toBeChecked();
});
