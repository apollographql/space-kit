/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { TextField } from "./TextField";
import { DemoSection } from "../shared/DemoSection";
import React, { ComponentProps } from "react";
import * as typography from "../typography";
import { colors } from "../colors";
import { IconSearch } from "../icons/IconSearch";

const VerticalTextFieldGroup: React.FC<{
  inputProps?: Partial<Omit<ComponentProps<typeof TextField>, "children">>;
  children: JSX.Element | JSX.Element[];
  title: string;
  description: string;
  width?: number;
}> = ({ children, description, title, width, ...otherProps }) => (
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
        <div css={{ margin: 6, width: "100%" }}>{child}</div>
      ))}
    </div>
  </div>
);

storiesOf("TextField", module).add("Catalog", () => (
  <React.Fragment>
    <DemoSection
      title="TextField"
      description="Inputs come in three sizes: small, standard, and large. The anatomy of an form field isn’t just the input itself, it’s the label, description, placeholder text, helper text, states, and feedback that work together to make a usable form."
    >
      <VerticalTextFieldGroup
        title="Small Input"
        description="Small input is small in terms of height and type size. Padding is less both top and bottom as well."
      >
        <TextField
          placeholder="Placeholder text"
          size="small"
          label="Small input"
        />
      </VerticalTextFieldGroup>
      <VerticalTextFieldGroup
        title="Standard Input"
        description="Most common input. Start here when trying to create a form."
      >
        <TextField
          placeholder="Placeholder text"
          size="standard"
          label="Standard input"
        />
      </VerticalTextFieldGroup>
      <VerticalTextFieldGroup
        title="Large Input"
        description="This will likely be used in situations where there is a lot of whitespace or in a special workflow."
      >
        <TextField
          placeholder="Placeholder text"
          size="large"
          label="Large input"
        />
      </VerticalTextFieldGroup>
    </DemoSection>
    <DemoSection>
      <VerticalTextFieldGroup
        title="Input States"
        description="Standard input states."
      >
        <TextField
          label="Resting"
          placeholder="Placeholder text"
          size="standard"
        />
        <TextField
          data-force-hover-state
          label="Hover"
          placeholder="Placeholder text"
          size="standard"
        />
        <TextField
          label="Focused"
          data-force-focus-state
          placeholder="Placeholder text"
          size="standard"
        />
        <TextField
          label="Focused and typing"
          data-force-focus-state
          placeholder="Placeholder text"
          defaultValue="Focused and typing"
          size="standard"
        />
        <TextField
          disabled
          label="Disabled"
          placeholder="Placeholder text"
          size="standard"
        />
      </VerticalTextFieldGroup>
      <VerticalTextFieldGroup
        width={640}
        title="Input Labels, descriptions and Helper Text"
        description="Anatomy of a complete form field. A label is required (or at the very least, it should be very clear why a label might not be needed). Description, placeholder text, and helper text are all optional."
      >
        <TextField
          size="large"
          css={{ width: "66%" }}
          placeholder="Ex. stark-industries or wayne-enterprises"
          helper="Your organization ID can’t contain any special characters or spaces."
          label="Input Label"
          description="Keep it simple, your organization ID is a unique identifier. Don’t worry, you can always change it later."
        />
      </VerticalTextFieldGroup>
    </DemoSection>
    <DemoSection>
      <VerticalTextFieldGroup
        title="Errors & Prominent Helper Text"
        description="Errors are a variant of helper text with a specific type of information to communicate, for example, errors."
      >
        <TextField
          value="Apollo*"
          label="Your ID"
          size="standard"
          error="Your ID can’t contain special characters"
          helper="Your ID can’t contain special characters."
        />
        <TextField
          value="Apollo"
          label="Your ID"
          size="standard"
          helper="Your organization ID can’t contain any special characters or spaces."
          showInfoIcon
        />
      </VerticalTextFieldGroup>
      {/** TODO: add input masking when it works (if it works?) */}
    </DemoSection>
    <DemoSection>
      <VerticalTextFieldGroup
        title="Inputs with Icons"
        description="Most commonly seen in search, inputs can have an icon to make the input more recognizable."
      >
        <TextField
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
          placeholder="Placeholder text"
          label="Resting"
        />
        <TextField
          label="Hover"
          data-force-hover-state
          placeholder="Placeholder text"
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
        />
        <TextField
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
          placeholder="Placeholder text"
          label="Focused"
          data-force-focus-state
        />
        <TextField
          data-force-focus-state
          value="Focused and typing"
          placeholder="Placeholder text"
          label="abcFocused and typing"
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
        />
        <TextField
          disabled
          label="Disabled"
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
        />
      </VerticalTextFieldGroup>
    </DemoSection>
  </React.Fragment>
));
