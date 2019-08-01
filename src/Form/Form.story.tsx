/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { FormField } from "./FormField";
import { action } from "@storybook/addon-actions";
import { DemoSection } from "../shared/DemoSection";
import React, { ComponentProps, cloneElement } from "react";
import * as typography from "../typography";
import { colors } from "../colors";
import { Stepper } from "./Stepper";
import { IconSearch } from "../icons/IconSearch";
import { IconInfoSolid } from "../icons/IconInfoSolid";
import { IconAlertSolid } from "../icons/IconAlertSolid";

const VerticalFormFieldGroup: React.FC<{
  inputProps?: Partial<Omit<ComponentProps<typeof FormField>, "children">>;
  children: JSX.Element | JSX.Element[];
  title: string;
  description: string;
  width?: number;
}> = ({
  inputProps = {},
  children,
  description,
  title,
  width,
  ...otherProps
}) => (
  <div {...otherProps} css={{ margin: "0 20px", width: width || 300 }}>
    <hr
      style={{
        height: 1,
        borderWidth: 0,
        backgroundColor: colors.silver.dark,
        marginBottom: 24,
      }}
    />
    <div
      css={{
        ...typography.base.base,
        textTransform: "uppercase",
        fontWeight: 600,
        margin: 6,
      }}
    >
      {title}
    </div>
    <div
      css={{
        ...typography.base.small,
        margin: 6,
      }}
    >
      {description}
    </div>
    <div css={{ display: "flex", flexWrap: "wrap" }}>
      {React.Children.map(children, child => (
        <div css={{ margin: 6 }}>
          {cloneElement(child as any, {
            ...inputProps,
          })}
        </div>
      ))}
    </div>
  </div>
);

storiesOf("Fields and Inputs", module).add("Catalog", () => (
  <React.Fragment>
    <DemoSection
      title="Form Field"
      description="Inputs come in three sizes: small, standard, and large. The anatomy of an form field isn’t just the input itself, it’s the label, description, placeholder text, helper text, states, and feedback that work together to make a usable form."
    >
      <VerticalFormFieldGroup
        title="Small Input"
        description="Small input is small in terms of height and type size. Padding is less both top and bottom as well."
      >
        <FormField
          inputProps={{
            onChange: (e: FormField) =>
              action(`the text in this input is now ${e.target.value}`),
            placeholder: "Placeholder Text",
          }}
          size="small"
          label="Small input"
        />
      </VerticalFormFieldGroup>
      <VerticalFormFieldGroup
        title="Standard Input"
        description="Most common input. Start here when trying to create a form."
      >
        <FormField
          inputProps={{
            onChange: (e: FormField) =>
              action(`the text in this input is now ${e.target.value}`),
            placeholder: "Placeholder Text",
          }}
          size="standard"
          label="Standard input"
        />
      </VerticalFormFieldGroup>
      <VerticalFormFieldGroup
        title="Large Input"
        description="This will likely be used in situations where there is a lot of whitespace or in a special workflow."
      >
        <FormField
          inputProps={{
            onChange: (e: FormField) =>
              action(`the text in this input is now ${e.target.value}`),
            placeholder: "Placeholder Text",
          }}
          size="large"
          label="Large input"
        />
      </VerticalFormFieldGroup>
    </DemoSection>
    <DemoSection>
      <VerticalFormFieldGroup
        title="Input States"
        description="Standard input states."
      >
        <FormField
          inputProps={{
            onChange: (e: FormField) =>
              action(`the text in this input is now ${e.target.value}`),
            placeholder: "Resting",
          }}
          label="Standard input"
          size="standard"
        />
        <FormField
          data-force-hover-state={true}
          inputProps={{
            onChange: (e: FormField) =>
              action(`the text in this input is now ${e.target.value}`),
            placeholder: "Hover",
          }}
          size="standard"
        />
        <FormField
          data-force-focus-state={true}
          inputProps={{
            onChange: (e: FormField) =>
              action(`the text in this input is now ${e.target.value}`),
            placeholder: "Focused",
          }}
          size="standard"
        />
        <FormField
          data-force-focus-state={true}
          inputProps={{
            onChange: (e: FormField) =>
              action(`the text in this input is now ${e.target.value}`),
            placeholder: "Placeholder Text",
            value: "Focused and typing",
          }}
          size="standard"
        />
        <FormField
          disabled={true}
          inputProps={{
            onChange: (e: FormField) =>
              action(`the text in this input is now ${e.target.value}`),
            placeholder: "Disabled",
          }}
          size="standard"
        />
      </VerticalFormFieldGroup>
      <VerticalFormFieldGroup
        width={640}
        title="Input Labels, descriptions and Helper Text"
        description="Anatomy of a complete form field. A label is required (or at the very least, it should be very clear why a label might not be needed). Description, placeholder text, and helper text are all optional."
      >
        <div css={{ width: "66%" }}>
          <FormField
            size="large"
            inputProps={{
              onChange: (e: FormField) =>
                action(`the text in this input is now ${e.target.value}`),
              placeholder: "Ex. stark-industries or wayne-enterprises",
            }}
            helperText="Your organization ID can’t contain any special characters or spaces."
            helperIcon={
              <IconInfoSolid
                css={{ color: colors.blue.base, width: 16, height: 16 }}
              />
            }
            label="Input Label"
            description="Keep it simple, your organization ID is a unique identifier. Don’t worry, you can always change it later."
          />
        </div>
      </VerticalFormFieldGroup>
    </DemoSection>
    <DemoSection>
      <VerticalFormFieldGroup
        title="Errors & Prominent Helper Text"
        description="Errors are a variant of helper text with a specific type of information to communicate, for example, errors."
      >
        <FormField
          inputProps={{
            onChange: (e: FormField) =>
              action(`the text in this input is now ${e.target.value}`),
            value: "Apollo*",
          }}
          label="Your ID"
          size="standard"
          error={true}
          helperText="Your ID can’t contain special characters."
        />
        <FormField
          inputProps={{
            onChange: (e: FormField) =>
              action(`the text in this input is now ${e.target.value}`),
            value: "Apollo",
          }}
          label="Your ID"
          size="standard"
          helperText="Your organization ID can’t contain any special characters or spaces."
          helperIcon={
            <IconInfoSolid
              css={{ color: colors.blue.base, width: 16, height: 16 }}
            />
          }
        />
      </VerticalFormFieldGroup>
      {/** TODO: add input masking when it works (if it works?) */}
    </DemoSection>
    <DemoSection>
      <VerticalFormFieldGroup
        width={640}
        title="Stepper"
        description="The stepper can take direct input (i.e., like typing the number 4) or users can click subtract or add to increment the number by one."
      >
        <div css={{ display: "flex" }}>
          <div css={{ flex: 1 }}>
            <div css={{ margin: 12 }}>
              <Stepper
                max={20}
                min={-20}
                initialValue={10}
                onChange={number =>
                  action(`the number in this stepper is now ${number}`)
                }
              />
            </div>
            <div css={{ margin: 12 }}>
              <Stepper
                max={20}
                min={-20}
                initialValue={10}
                data-force-hover-state={true}
                onChange={number =>
                  action(`the number in this stepper is now ${number}`)
                }
              />
            </div>
            <div css={{ margin: 12 }}>
              <Stepper
                max={20}
                min={-20}
                initialValue={10}
                data-force-focus-state={true}
                onChange={number =>
                  action(`the number in this stepper is now ${number}`)
                }
              />
            </div>
            <div css={{ margin: 12 }}>
              <Stepper
                disabled={true}
                max={20}
                min={-20}
                initialValue={10}
                onChange={number =>
                  action(`the number in this stepper is now ${number}`)
                }
              />
            </div>
          </div>
        </div>
        <div css={{ flex: "none" }}>
          <div css={{ margin: 12 }}>
            <Stepper
              max={20}
              initialValue={10}
              onChange={number =>
                action(`the number in this stepper is now ${number}`)
              }
            />
          </div>
          <div css={{ margin: 12 }}>
            <Stepper
              initialValue={10}
              max={20}
              helperText="All your seats are filled"
              helperIcon={
                <IconAlertSolid
                  css={{ width: 16, height: 16, color: colors.blue.base }}
                />
              }
              error={true}
              onChange={number =>
                action(`the number in this stepper is now ${number}`)
              }
            />
          </div>
        </div>
      </VerticalFormFieldGroup>
      <VerticalFormFieldGroup
        title="Inputs with Icons"
        description="Most commonly seen in search, inputs can have an icon to make the input more recognizable."
      >
        <FormField
          icon={
            <IconSearch
              css={{
                color: colors.silver.darker,
                zIndex: 10,
                width: 14,
                height: 14,
              }}
            />
          }
          inputProps={{
            onChange: (e: FormField) =>
              action(`the text in this input is now ${e.target.value}`),
            placeholder: "Resting",
          }}
        />
        <FormField
          data-force-hover-state={true}
          icon={
            <IconSearch
              css={{
                color: colors.silver.darker,
                zIndex: 10,
                width: 14,
                height: 14,
              }}
            />
          }
          inputProps={{
            onChange: (e: FormField) =>
              action(`the text in this input is now ${e.target.value}`),
            placeholder: "Hover",
          }}
        />
        <FormField
          data-force-focus-state={true}
          icon={
            <IconSearch
              css={{
                color: colors.silver.darker,
                zIndex: 10,
                width: 14,
                height: 14,
              }}
            />
          }
          inputProps={{
            onChange: (e: FormField) =>
              action(`the text in this input is now ${e.target.value}`),
            placeholder: "Focused",
          }}
        />
        <FormField
          data-force-focus-state={true}
          icon={
            <IconSearch
              css={{
                color: colors.silver.darker,
                zIndex: 10,
                width: 14,
                height: 14,
              }}
            />
          }
          inputProps={{
            onChange: (e: FormField) =>
              action(`the text in this input is now ${e.target.value}`),
            placeholder: "Focused and typing",
            value: "Focused and typing",
          }}
        />
        <FormField
          disabled={true}
          icon={
            <IconSearch
              css={{
                color: colors.silver.darker,
                zIndex: 10,
                width: 14,
                height: 14,
              }}
            />
          }
          inputProps={{
            onChange: (e: FormField) =>
              action(`the text in this input is now ${e.target.value}`),
            placeholder: "Disabled",
          }}
        />
      </VerticalFormFieldGroup>
    </DemoSection>
  </React.Fragment>
));
