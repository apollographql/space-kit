import "@testing-library/jest-dom";
import faker from "faker";
import React from "react";
import { render } from "@testing-library/react";
import { Tooltip } from "../Tooltip";

test.skip("when hovered, the tooltip is shown afer a delay", async () => {
  jest.useFakeTimers();
  const tooltipContent = faker.lorem.word();
  const interactiveElementText = faker.lorem.word();

  const { getByText, queryByText } = render(
    <Tooltip content={tooltipContent}>
      <span>{interactiveElementText}</span>
    </Tooltip>
  );

  getByText(interactiveElementText).dispatchEvent(
    new MouseEvent("mouseover", { bubbles: true })
  );
  getByText(interactiveElementText).dispatchEvent(
    new MouseEvent("mousemove", { bubbles: true })
  );
  expect(queryByText(tooltipContent)).not.toBeInTheDocument();

  jest.runOnlyPendingTimers();
  getByText(tooltipContent);
});

test.todo("tooltip will hide after inactivity");
