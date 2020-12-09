import * as React from "react";
import { FormControl } from "../../FormControl";
import { FormDescription } from "../../FormDescription";
import { FormErrorMessage } from "../../FormErrorMessage";
import { FormHelperText } from "../../FormHelperText";
import { renderHook } from "@testing-library/react-hooks";
import { useFormControlContext } from "../FormControlContext";

test("hook should not throw when rendered without provider", () => {
  renderHook(() => useFormControlContext());
});

test("when FormControl is rendered with FormDescription and FormErrorText, describedBy includes description and error ids", () => {
  const wrapper: React.FC = ({ children }) => (
    <FormControl id="test">
      <FormDescription>description</FormDescription>
      <FormErrorMessage>error message</FormErrorMessage>
      {children}
    </FormControl>
  );

  const { result } = renderHook(() => useFormControlContext(), { wrapper });

  expect(result.current.describedBy).toMatchInlineSnapshot(
    `"test-description test-feedback"`,
  );
});

test("when FormControl is rendered with HelperText, FormDescription, FormErrorText, describedBy includes only description and error ids", () => {
  const wrapper: React.FC = ({ children }) => (
    <FormControl id="test">
      <FormDescription>description</FormDescription>
      <FormHelperText>help text</FormHelperText>
      <FormErrorMessage>error message</FormErrorMessage>
      {children}
    </FormControl>
  );

  const { result } = renderHook(() => useFormControlContext(), { wrapper });

  expect(result.current.describedBy).toMatchInlineSnapshot(
    `"test-description test-feedback"`,
  );
});

test("when FormControl is rendered with HelperText and FormDescription, describedBy includes description and helper ids", () => {
  const wrapper: React.FC = ({ children }) => (
    <FormControl id="test">
      <FormDescription>description</FormDescription>
      <FormHelperText>help text</FormHelperText>
      {children}
    </FormControl>
  );

  const { result } = renderHook(() => useFormControlContext(), { wrapper });

  expect(result.current.describedBy).toMatchInlineSnapshot(
    `"test-description test-helptext"`,
  );
});

test("when FormControl is rendered with HelperText and no FormDescription, describedBy includes only helper id", () => {
  const wrapper: React.FC = ({ children }) => (
    <FormControl id="test">
      <FormHelperText>help text</FormHelperText>
      {children}
    </FormControl>
  );

  const { result } = renderHook(() => useFormControlContext(), { wrapper });

  expect(result.current.describedBy).toMatchInlineSnapshot(`"test-helptext"`);
});

test("when FormControl is rendered with FormDescription and no HelperText, describedBy includes only description id", () => {
  const wrapper: React.FC = ({ children }) => (
    <FormControl id="test">
      <FormDescription>help text</FormDescription>
      {children}
    </FormControl>
  );

  const { result } = renderHook(() => useFormControlContext(), { wrapper });

  expect(result.current.describedBy).toMatchInlineSnapshot(
    `"test-description"`,
  );
});
