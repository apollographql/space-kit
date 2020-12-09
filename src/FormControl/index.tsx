/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { ClassNames, jsx } from "@emotion/core";
import React from "react";
import { As, createElementFromAs } from "../shared/createElementFromAs";
import {
  FormControlContextProvider,
  useFormControlInternalContext,
} from "../shared/FormControlContext";
import uniqueId from "lodash/uniqueId";

export { useFormControlContext } from "../shared/FormControlContext";

interface Props
  extends Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "className" | "style"
  > {
  /**
   * Override how the outermost container is rendered.
   *
   * @default "div"
   */
  containerAs?: As;

  /**
   * Override how the content section is rendered. This contains the input and
   * helper/error text.
   *
   * This is useful if you want to change the default size of the content versus
   * label sections.
   *
   * @default "section"
   */
  contentSectionAs?: As;

  /**
   * This ID will be used to tie all components together with accessibility
   */
  id?: string;

  /**
   * Override how the label section is rendered. This contains the label and
   * description.
   *
   * This is useful if you want to change the default size of the content versus
   * label sections.
   *
   * @default "section"
   */
  labelSectionAs?: As;

  /**
   * How to lay out the form element
   */
  layout?: "vertical" | "horizontal";
}

const FormControl: React.FC<Props> = ({
  children,
  className,
  containerAs = "div",
  contentSectionAs = "section",
  id,
  labelSectionAs = "section",
  layout = "vertical",
  ...props
}) => {
  const {
    description,
    descriptionId,
    endAdornment,
    errorMessageElement,
    helper,
    label,
    labelId,
    startAdornment,
  } = useFormControlInternalContext();

  /**
   * Take a map keyed for each possible valye of `layout` and return the value
   * corresponding to the current `layout`
   */
  function layoutValue<T>(map: Record<typeof layout, T>): T {
    return map[layout];
  }

  return (
    <ClassNames>
      {({ css, cx }) => {
        return React.cloneElement(
          createElementFromAs(containerAs),
          {
            ...props,
            className: cx(
              css({
                alignItems: layoutValue({
                  vertical: "initial",
                  horizontal: "center",
                } as const),
                display: "flex",
                flexDirection: layoutValue({
                  vertical: "column",
                  horizontal: "row",
                } as const),
              }),
              className,
              React.isValidElement(containerAs) && containerAs.props.className,
            ),
            style: {
              ...props.style,
              ...(React.isValidElement(containerAs) && containerAs.props.style),
            },
          },
          <>
            {(label || description) &&
              React.cloneElement(
                createElementFromAs(labelSectionAs),
                {
                  className: cx(
                    css({
                      flex: layoutValue({
                        vertical: undefined,
                        horizontal: 1,
                      } as const),
                      marginBottom: layoutValue({
                        vertical: 8,
                        horizontal: 0,
                      } as const),
                      marginRight: layoutValue({
                        vertical: undefined,
                        horizontal: 8,
                      } as const),
                    }),
                    React.isValidElement(labelSectionAs) &&
                      labelSectionAs.props.className,
                  ),
                },
                <>
                  {React.isValidElement<any>(label) &&
                    React.cloneElement(label, {
                      ...label.props,
                      id: labelId,
                      htmlFor: id,
                    })}
                  {React.isValidElement<any>(description) &&
                    React.cloneElement(description, {
                      ...description.props,
                      id: descriptionId,
                    })}
                </>,
              )}

            {React.cloneElement(
              createElementFromAs(contentSectionAs),
              {
                className: cx(
                  css({
                    flex: layoutValue({
                      vertical: undefined,
                      horizontal: 1,
                    } as const),
                  }),
                  React.isValidElement(contentSectionAs) &&
                    contentSectionAs.props.className,
                ),
              },
              <>
                <div className={css({ position: "relative" })}>
                  {startAdornment}
                  {children}
                  {endAdornment}
                </div>
                {(helper || errorMessageElement) && (
                  <div
                    css={{
                      marginRight: 8,
                      marginTop: 8,
                      paddingLeft: 12,
                    }}
                  >
                    {errorMessageElement || helper}
                  </div>
                )}
              </>,
            )}
          </>,
        );
      }}
    </ClassNames>
  );
};

const FormControlWrapper: React.FC<React.ComponentProps<typeof FormControl>> = (
  props,
) => {
  /**
   * Backup ID to be used if none are passed in props.
   *
   * Use `useMemo` so this is consistent for the lifecycle of this element.
   */
  const fallbackId = React.useMemo(
    () => uniqueId("space-kit-form-control-"),
    [],
  );
  const id = props.id ?? fallbackId;

  return (
    <FormControlContextProvider id={id}>
      <FormControl {...props} id={id} />
    </FormControlContextProvider>
  );
};

export { FormControlWrapper as FormControl };
