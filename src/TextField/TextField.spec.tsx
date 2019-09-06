import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { TextField } from "./TextField";

afterEach(cleanup);

test("when passed `autoFocus` prop, should have focus after mounting", () => {
  const { getByTestId } = render(
    <TextField autoFocus inputAs={<input data-testid="input" />} />
  );

  const textField = getByTestId("input");

  expect(textField).toHaveFocus();
});
