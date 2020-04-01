import React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Modal } from "./Modal";
import { Button } from "../Button";
import * as faker from "faker";

afterEach(cleanup);

test("should render without crashing", () => {
  expect(() => {
    render(<Modal title="title" size="small" />);
    render(<Modal title="title" size="medium" />);
    render(<Modal title="title" size="large" />);
  }).not.toThrow();
});

test("should render a title", () => {
  const { getByText } = render(<Modal title="title" size="small" />);
  expect(getByText("title")).toBeInTheDocument();
});

test("should render a description", () => {
  const { getByText } = render(
    <Modal title="title" description="test description" size="small" />
  );

  expect(getByText("test description")).toBeInTheDocument();
});

test("should render children", () => {
  const { getByText } = render(
    <Modal title="title" description="test description" size="small">
      child content
    </Modal>
  );

  expect(getByText("child content")).toBeInTheDocument();
});

test("should render primary button", () => {
  const { getByText } = render(
    <Modal
      title="title"
      primaryAction={<Button type="button">submit</Button>}
      size="small"
    />
  );

  expect(getByText("submit")).toBeInTheDocument();
});

test("should render secondary button", () => {
  const { getByText } = render(
    <Modal
      title="title"
      secondaryAction={<Button type="button">cancel</Button>}
      primaryAction={<Button type="button">submit</Button>}
      size="small"
    />
  );

  expect(getByText("cancel")).toBeInTheDocument();
});

test("should render helper text", () => {
  const { getByText } = render(
    <Modal
      title="title"
      primaryAction={<Button type="button">submit</Button>}
      size="small"
      bottomLeftText="helper text"
    />
  );

  expect(getByText("helper text")).toBeInTheDocument();
});

test("when Escape key is pressed, `onClose` callback should be called", () => {
  const onClose = jest.fn();

  const { container } = render(
    <Modal
      title="title"
      primaryAction={<Button type="button">submit</Button>}
      size="small"
      bottomLeftText="helper text"
      onClose={onClose}
    />
  );

  // Fire `keyDown`, `keyUp`, and `keyPress` beacuse we don't care about the
  // exact implementation; at least one of these should catch the Escape key
  // and call `onClose`
  fireEvent.keyDown(container, {
    key: "Escape",
    code: "Escape",
    charCode: 27,
  });

  fireEvent.keyUp(container, {
    key: "Escape",
    code: "Escape",
    charCode: 27,
  });

  fireEvent.keyPress(container, {
    key: "Escape",
    code: "Escape",
    charCode: 27,
  });

  expect(onClose).toHaveBeenCalled();
});

test("when non-Escape key is pressed, `onClose` callback should not be called", () => {
  const onClose = jest.fn();

  const { container } = render(
    <Modal
      title="title"
      primaryAction={<Button type="button">submit</Button>}
      size="small"
      onClose={onClose}
    />
  );

  // Fire `keyDown`, `keyUp`, and `keyPress` beacuse we don't care about the
  // exact implementation; at least one of these should catch the Escape key
  // and call `onClose`
  fireEvent.keyDown(container, {
    key: "Enter",
    code: "Enter",
    charCode: 13,
  });

  fireEvent.keyUp(container, {
    key: "Enter",
    code: "Enter",
    charCode: 13,
  });

  fireEvent.keyPress(container, {
    key: "Enter",
    code: "Enter",
    charCode: 13,
  });

  expect(onClose).not.toHaveBeenCalled();
});

test("when content area is clicked, `onClose` should not be called", () => {
  const onClose = jest.fn();

  const { getByText } = render(
    <Modal
      title="title"
      primaryAction={<Button type="button">submit</Button>}
      size="small"
      onClose={onClose}
    />
  );

  fireEvent.click(getByText("title"), { button: 1 });
  getByText("title").click();

  expect(onClose).not.toHaveBeenCalled();
});

test("when passed `as` prop, props should be merged", () => {
  const testId = faker.lorem.word();
  const className = faker.lorem.word();

  const { getByTestId } = render(
    <Modal
      as={
        <form
          data-testid={testId}
          className={className}
          style={{ fontWeight: "bold" }}
        />
      }
      size="small"
      title={faker.lorem.word()}
    />
  );

  expect(getByTestId(testId)).toHaveClass(className);
  expect(getByTestId(testId).localName).toBe("form");
  expect(getByTestId(testId)).toHaveStyle("font-weight: bold");
});

test("when passed `containerAs` prop, props should be merged", () => {
  const testId = faker.lorem.word();
  const className = faker.lorem.word();

  const { getByTestId } = render(
    <Modal
      containerAs={
        <span
          className={className}
          data-testid={testId}
          style={{ fontWeight: "bold" }}
        />
      }
      size="small"
      title={faker.lorem.word()}
    />
  );

  expect(getByTestId(testId)).toHaveClass(className);
  expect(getByTestId(testId).localName).toBe("span");
  expect(getByTestId(testId)).toHaveStyle("font-weight: bold");
});
