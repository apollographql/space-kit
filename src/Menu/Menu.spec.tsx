import "@testing-library/jest-dom";
import * as faker from "faker";
import React from "react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";
import { render, screen, waitFor } from "@testing-library/react";
import { Menu } from "../Menu";
import { MenuItem } from "../MenuItem";
import { SpaceKitProvider } from "../SpaceKitProvider";

test("when child of `Menu` is clicked, menu is shown", () => {
  const menuItemText = faker.random.word();

  render(
    <SpaceKitProvider disableAnimations>
      <Menu
        content={
          <>
            <MenuItem>{menuItemText}</MenuItem>
          </>
        }
      >
        <Button>{faker.random.word()}</Button>
      </Menu>
    </SpaceKitProvider>
  );

  expect(screen.queryByText(menuItemText)).not.toBeInTheDocument();
  userEvent.click(screen.getByRole("button"));
  screen.getByText(menuItemText);
});

test("when `onClick` handler does not call `stopPropagation()`, menu closes when `MenuItem` in `content` is clicked", async () => {
  const menuItemText = faker.random.word();

  render(
    <SpaceKitProvider disableAnimations>
      <Menu
        content={
          <>
            <MenuItem>{menuItemText}</MenuItem>
          </>
        }
      >
        <Button>{faker.random.word()}</Button>
      </Menu>
    </SpaceKitProvider>
  );

  userEvent.click(screen.getByRole("button"));
  await waitFor(() =>
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true")
  );
  userEvent.click(screen.getByText(menuItemText));
  expect(screen.queryByText(menuItemText)).not.toBeInTheDocument();
});

test("when `onClick` handler calls `stopPropagation()`, menu doesn't close when `MenuItem` in `content` is clicked", async () => {
  const menuItemText = faker.random.word();

  render(
    <SpaceKitProvider disableAnimations>
      <Menu
        content={
          <>
            <MenuItem
              onClick={jest.fn().mockImplementation((event: MouseEvent) => {
                event.stopPropagation();
              })}
            >
              {menuItemText}
            </MenuItem>
          </>
        }
      >
        <Button>{faker.random.word()}</Button>
      </Menu>
    </SpaceKitProvider>
  );

  userEvent.click(screen.getByRole("button"));
  userEvent.click(screen.getByText(menuItemText));

  // This is a bummer and I would love ideas on how to improve it. Things are
  // set up in a way where this render will be syncronous, meaning we don't
  // _need_ this 100ms delay. If someone changes the test setup, then this can
  // start giving false passes. I'd rather slow down the test by 100ms than give
  // accidental false passes, so I left this artificial delay.
  await new Promise((resolve) => setTimeout(resolve, 100));

  expect(screen.getByText(menuItemText)).toBeInTheDocument();
});
