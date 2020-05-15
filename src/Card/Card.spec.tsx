import { render } from "@testing-library/react";
import React from "react";
import { Card } from "./Card";
import * as faker from "faker";

test("when passed `headerAs` with a string, correct header is rendered", () => {
  const heading = faker.lorem.word();

  const { getByText } = render(<Card heading={heading} headingAs="h6" />);

  expect(getByText(heading).nodeName.toLowerCase()).toBe("h6");
});

test("when passed `headerAs` with a react element, correct header is rendered", () => {
  const heading = faker.lorem.word();

  const { getByText, getByTestId } = render(
    <Card heading={heading} headingAs={<h6 data-testid="heading" />} />
  );

  expect(getByText(heading).nodeName.toLowerCase()).toBe("h6");
  getByTestId("heading");
});
