/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "@testing-library/jest-dom/extend-expect";
import faker from "faker";
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { ConfirmationTooltip } from "../ConfirmationTooltip";
import { SpaceKitProvider } from "../SpaceKitProvider";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

test("when child element is clicked, the tooltip is shown", () => {
  jest.useFakeTimers();
  const tooltipContent = faker.lorem.word();
  const interactiveElementText = faker.lorem.word();

  const { getByText, queryByText } = render(
    <SpaceKitProvider disableAnimations>
      <ConfirmationTooltip content={tooltipContent}>
        <span>{interactiveElementText}</span>
      </ConfirmationTooltip>
    </SpaceKitProvider>
  );

  expect(queryByText(tooltipContent)).not.toBeInTheDocument();
  userEvent.click(getByText(interactiveElementText));
  getByText(tooltipContent);
});

test.skip("when a tooltip is shown, it is removed after a delay", async () => {
  jest.useFakeTimers();
  const tooltipContent = faker.lorem.word();
  const interactiveElementText = faker.lorem.word();

  const { getByText, queryByText } = render(
    <SpaceKitProvider disableAnimations>
      <ConfirmationTooltip content={tooltipContent}>
        <span>{interactiveElementText}</span>
      </ConfirmationTooltip>
    </SpaceKitProvider>
  );

  expect(queryByText(tooltipContent)).not.toBeInTheDocument();
  userEvent.click(getByText(interactiveElementText));
  getByText(tooltipContent);
  jest.runTimersToTime(5000);

  expect(queryByText(tooltipContent)).not.toBeInTheDocument();
});
