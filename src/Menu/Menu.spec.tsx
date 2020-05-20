import "@testing-library/jest-dom";
import * as faker from "faker";
import React from "react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";
import { render, waitFor } from "@testing-library/react";
import { Menu } from "../Menu";
import { MenuItem } from "../MenuItem";
import { SpaceKitProvider } from "../SpaceKitProvider";

test("when child of `Menu` is clicked, menu is shown", () => {
  const menuItemText = faker.random.word();
  const triggerText = faker.random.word();

  const { getByText, queryByText } = render(
    <SpaceKitProvider disableAnimations>
      <Menu
        content={
          <>
            <MenuItem>{menuItemText}</MenuItem>
          </>
        }
      >
        <Button>{triggerText}</Button>
      </Menu>
    </SpaceKitProvider>
  );

  expect(queryByText(menuItemText)).not.toBeInTheDocument();
  userEvent.click(getByText(triggerText));
  getByText(menuItemText);
});

test("when `closeOnMenuItemClick` is `false`, `onClick` callback is called when `MenuItem` in `content` is clicked", () => {
  const menuItemText = faker.random.word();
  const triggerText = faker.random.word();
  const onClick = jest.fn();

  const { getByText } = render(
    <SpaceKitProvider disableAnimations>
      <Menu
        closeOnMenuItemClick={false}
        content={
          <>
            <MenuItem onClick={onClick}>{menuItemText}</MenuItem>
          </>
        }
      >
        <Button>{triggerText}</Button>
      </Menu>
    </SpaceKitProvider>
  );

  userEvent.click(getByText(triggerText));
  userEvent.click(getByText(menuItemText));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("when `closeOnMenuItemClick` is `true`, menu closes when `MenuItem` in `content` is clicked", async () => {
  const menuItemText = faker.random.word();
  const triggerText = faker.random.word();

  const { container, getByText, queryByText } = render(
    <SpaceKitProvider disableAnimations>
      <Menu
        content={
          <>
            <MenuItem>{menuItemText}</MenuItem>
          </>
        }
      >
        <Button>{triggerText}</Button>
      </Menu>
    </SpaceKitProvider>
  );

  userEvent.click(getByText(triggerText));
  await waitFor(() => container.querySelector("*[aria-expanded=true]"));
  userEvent.click(getByText(menuItemText));
  expect(queryByText(menuItemText)).not.toBeInTheDocument();
});

test("when `closeOnMenuItemClick` is `false`, menu doesn't close when `MenuItem` in `content` is clicked", async () => {
  const menuItemText = faker.random.word();
  const triggerText = faker.random.word();

  const { getByText } = render(
    <SpaceKitProvider disableAnimations>
      <Menu
        closeOnMenuItemClick={false}
        content={
          <>
            <MenuItem>{menuItemText}</MenuItem>
          </>
        }
      >
        <Button>{triggerText}</Button>
      </Menu>
    </SpaceKitProvider>
  );

  userEvent.click(getByText(triggerText));
  userEvent.click(getByText(menuItemText));

  // This is a bummer and I would love ideas on how to improve it. Things are
  // set up in a way where this render will be syncronous, meaning we don't
  // _need_ this 100ms delay. If someone changes the test setup, then this can
  // start giving false passes. I'd rather slow down the test by 100ms than give
  // accidental false passes, so I left this artificial delay.
  await new Promise((resolve) => setTimeout(resolve, 100));

  expect(getByText(menuItemText)).toBeInTheDocument();
});

test.todo(
  "when `closeOnMenuItemClick` is `true`, top level menu closes when nested menu item is clicked"
);
