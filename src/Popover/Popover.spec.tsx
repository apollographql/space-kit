import "@testing-library/jest-dom";
import * as faker from "faker";
import React from "react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";
import { act, render, screen, waitFor } from "@testing-library/react";
import { Popover } from "../Popover";
import { ListItem } from "../ListItem";
import { SpaceKitProvider } from "../SpaceKitProvider";

test("when child of `Popover` is clicked, list is shown", () => {
  const listItemText = faker.random.word();

  render(
    <SpaceKitProvider disableAnimations>
      <Popover
        content={
          <>
            <ListItem>{listItemText}</ListItem>
          </>
        }
        trigger={<Button>{faker.random.word()}</Button>}
      ></Popover>
    </SpaceKitProvider>,
  );

  expect(screen.queryByText(listItemText)).not.toBeInTheDocument();
  act(() => userEvent.click(screen.getByRole("button")));
  screen.getByText(listItemText);
});

test("when `onClick` handler does not call `stopPropagation()`, list closes when `ListItem` in `content` is clicked", async () => {
  const listItemText = faker.random.word();

  render(
    <SpaceKitProvider disableAnimations>
      <Popover
        content={
          <>
            <ListItem>{listItemText}</ListItem>
          </>
        }
        trigger={<Button>{faker.random.word()}</Button>}
      ></Popover>
    </SpaceKitProvider>,
  );

  act(() => userEvent.click(screen.getByRole("button")));
  await waitFor(() =>
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true"),
  );
  act(() => userEvent.click(screen.getByText(listItemText)));
  expect(screen.queryByText(listItemText)).not.toBeInTheDocument();
});

test("when `onClick` handler calls `stopPropagation()`, list doesn't close when `ListItem` in `content` is clicked", async () => {
  const listItemText = "list-item-text";
  const triggerText = "trigger-text";

  render(
    <SpaceKitProvider disableAnimations>
      <Popover
        content={
          <>
            <ListItem
              onClick={jest.fn().mockImplementation((event: MouseEvent) => {
                event.stopPropagation();
              })}
            >
              {listItemText}
            </ListItem>
          </>
        }
        trigger={<Button>{triggerText}</Button>}
      ></Popover>
    </SpaceKitProvider>,
  );

  act(() => userEvent.click(screen.getByRole("button")));
  act(() => userEvent.click(screen.getByText(listItemText)));

  // This is a bummer and I would love ideas on how to improve it. Things are
  // set up in a way where this render will be syncronous, meaning we don't
  // _need_ this 100ms delay. If someone changes the test setup, then this can
  // start giving false passes. I'd rather slow down the test by 100ms than give
  // accidental false passes, so I left this artificial delay.
  await new Promise((resolve) => setTimeout(resolve, 100));

  expect(screen.getByText(listItemText)).toBeInTheDocument();
});

test("when interactive is set, list doesn't close when `ListItem` in `content` is clicked", async () => {
  const listItemText = faker.random.word();

  render(
    <SpaceKitProvider disableAnimations>
      <Popover
        interactive
        content={
          <>
            <ListItem>{listItemText}</ListItem>
          </>
        }
        trigger={<Button>{faker.random.word()}</Button>}
      ></Popover>
    </SpaceKitProvider>,
  );

  act(() => userEvent.click(screen.getByRole("button")));
  act(() => userEvent.click(screen.getByText(listItemText)));

  // refer to above test for rationale here
  await new Promise((resolve) => setTimeout(resolve, 100));

  expect(screen.getByText(listItemText)).toBeInTheDocument();
});
