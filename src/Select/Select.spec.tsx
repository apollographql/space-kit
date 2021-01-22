import "@testing-library/jest-dom";
import React from "react";
import userEvent from "@testing-library/user-event";
import { act, render, screen, within, waitFor } from "@testing-library/react";
import { ListItem } from "../ListItem";
import { Select } from "../Select";
import { SpaceKitProvider } from "../SpaceKitProvider";
import { FormikConfig, useFormik } from "formik";
import * as Yup from "yup";

test('given no `value`, should render `<option value="" />`', () => {
  render(
    <SpaceKitProvider disableAnimations>
      <Select defaultValue="">
        <option value="">select an item</option>
        <option value="a">a</option>
        <option value="b">b</option>
      </Select>
    </SpaceKitProvider>,
  );

  expect(
    screen.getByRole("button", { name: "select an item" }),
  ).toBeInTheDocument();
});

test("label props should be called back", () => {
  const labelText = "select label";
  const SelectWithLabel: React.FC = () => {
    const [labelProps, setLabelProps] = React.useState();

    return (
      <>
        <label {...labelProps}>{labelText}</label>
        <Select defaultValue="" labelPropsCallbackRef={setLabelProps}>
          <option value="">select an item</option>
          <option value="a">a</option>
          <option value="b">b</option>
        </Select>
      </>
    );
  };

  render(
    <SpaceKitProvider disableAnimations>
      <SelectWithLabel />
    </SpaceKitProvider>,
  );

  expect(screen.getByText(labelText)).toBeInTheDocument();
  expect(screen.getByLabelText(labelText)).toBeInTheDocument();
});

test("given a controlled `value`, should render controlled value", () => {
  render(
    <SpaceKitProvider disableAnimations>
      <Select value="a">
        <option value="a">a</option>
        <option value="b">b</option>
      </Select>
    </SpaceKitProvider>,
  );

  expect(screen.getByText("a")).toBeInTheDocument();
  expect(screen.queryByText("b")).not.toBeInTheDocument();
  act(() => userEvent.click(screen.getByRole("button")));
});

test("given a `renderListItem` prop, should be used", () => {
  render(
    <SpaceKitProvider disableAnimations>
      <Select
        renderListItem={(props, optionElement) => (
          <ListItem
            {...props}
            as={<a href={`/${String(optionElement.props.value)}`} />}
          />
        )}
        value="a"
      >
        <option value="a">a</option>
        <option value="b">b</option>
      </Select>
    </SpaceKitProvider>,
  );

  userEvent.click(screen.getByRole("button", { name: "a" }));

  const option = screen.getByRole("option", { name: "b" });
  expect(option.tagName.toLowerCase()).toBe("a");
  expect(option).toHaveAttribute("href", "/b");
});

test("given children mixed with `option` and `optgroup`, should render headings and elements", () => {
  render(
    <SpaceKitProvider disableAnimations>
      <Select value="a">
        <option value="a">a</option>
        <option value="b">b</option>
        <optgroup label="group c">
          <option>d</option>
          <option>e</option>
        </optgroup>
      </Select>
    </SpaceKitProvider>,
  );

  act(() => userEvent.click(screen.getByRole("button")));
  expect(screen.getByRole("option", { name: "a" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "b" })).toBeInTheDocument();

  const groupC = screen.getByRole("group", { name: "group c" });
  expect(groupC).toBeInTheDocument();
  expect(
    within(groupC).getByRole("heading", { name: "group c" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "d" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "e" })).toBeInTheDocument();
});

test("when clicking button, menu shoud show", () => {
  render(
    <SpaceKitProvider disableAnimations>
      <Select value="a">
        <option value="a">a</option>
        <option value="b">b</option>
      </Select>
    </SpaceKitProvider>,
  );

  expect(screen.getByText("a")).toBeInTheDocument();
  expect(screen.queryByText("b")).not.toBeInTheDocument();
  act(() => userEvent.click(screen.getByRole("button")));
  expect(screen.getByRole("option", { name: "a" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "b" })).toBeInTheDocument();
});

test("when clicking a select trigger in a form, form is not submitted", () => {
  const handleSubmit = jest.fn();

  render(
    <SpaceKitProvider disableAnimations>
      <form onSubmit={handleSubmit}>
        <Select value="a">
          <option value="a">a</option>
          <option value="b">b</option>
        </Select>
      </form>
    </SpaceKitProvider>,
  );

  act(() => userEvent.click(screen.getByRole("button")));
  expect(screen.getByRole("listbox")).toBeInTheDocument();
  expect(handleSubmit).not.toHaveBeenCalled();
});

test("works correctly with formik", async () => {
  const validationSchema = Yup.object({
    letter: Yup.mixed()
      .oneOf(["", "a", "b"] as const)
      .defined(),
  }).defined();
  type FormValues = Yup.InferType<typeof validationSchema>;

  const TestComponent: React.FC<{
    onSubmit: FormikConfig<FormValues>["onSubmit"];
  }> = ({ onSubmit }) => {
    const [labelProps, setLabelProps] = React.useState();
    const { values, handleChange, handleBlur, handleSubmit } = useFormik<
      FormValues
    >({
      initialValues: { letter: "" },
      validationSchema,
      onSubmit,
    });

    return (
      <SpaceKitProvider disableAnimations>
        <form onSubmit={handleSubmit}>
          <label {...labelProps}>input</label>
          <Select
            name="letter"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.letter}
            labelPropsCallbackRef={setLabelProps}
          >
            <option value="">Select an option</option>
            <option value="a">a</option>
            <option value="b">b</option>
          </Select>
          <button type="submit">submit</button>
        </form>
      </SpaceKitProvider>
    );
  };

  const onSubmit = jest.fn();

  render(<TestComponent onSubmit={onSubmit} />);

  userEvent.click(screen.getByLabelText("input"));
  userEvent.click(screen.getByRole("option", { name: /^a$/i }));
  userEvent.click(screen.getByRole("button", { name: /submit/i }));
  // Wait for the `onSubmit` to have been called
  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
  expect(onSubmit).toHaveBeenCalledWith({ letter: "a" }, expect.anything());
});
