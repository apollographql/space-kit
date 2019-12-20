import React from "react";
import { cleanup, render } from "@testing-library/react";
import { LoadingSpinner } from "./LoadingSpinner";

afterEach(cleanup);

test("it should have `role='progress'`", () => {
  const { getByRole } = render(<LoadingSpinner />);

  getByRole("progressbar");
});
