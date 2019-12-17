import * as faker from "faker";
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { LoadingSpinner } from "./LoadingSpinner";

afterEach(cleanup);

test("it should have `role='progress'`", () => {
  const { getByRole } = render(<LoadingSpinner />);

  getByRole("progressbar");
});

test("it should passthrough ref", () => {
  const testId = faker.lorem.word();
  const ref = React.createRef<SVGSVGElement>();

  const { getByTestId } = render(
    <LoadingSpinner data-testid={testId} ref={ref} />
  );

  expect(getByTestId(testId)).toEqual(ref.current);
});
