import { storiesOf } from "@storybook/react";
import { Card, CardSection, CardSeperator } from "./Card";
import { Button } from "../Button";
import { colors } from "../colors";
import React from "react";

storiesOf("Card", module)
  .addParameters({ component: Card })
  .add("default", () => (
    <div
      style={{
        backgroundColor: colors.silver.light,
        padding: "40px",
        height: "100vh",
      }}
    >
      <Card />
    </div>
  ))
  .add("default, heading, description", () => (
    <div
      style={{
        backgroundColor: colors.silver.light,
        padding: "40px",
        height: "100vh",
      }}
    >
      <Card heading="Card heading" description="description goes here">
        <div>card content</div>
      </Card>
    </div>
  ))
  .add("large", () => (
    <div
      style={{
        backgroundColor: colors.silver.light,
        padding: "40px",
        height: "100vh",
      }}
    >
      <Card
        size="large"
        heading="Card heading"
        description="description goes here"
        actions={
          <Button color={colors.red.base}>
            <div style={{ color: colors.white }}>Click</div>
          </Button>
        }
      >
        <div>card content</div>
      </Card>
    </div>
  ))
  .add("with actions - button", () => (
    <div
      style={{
        backgroundColor: colors.silver.light,
        padding: "40px",
        height: "100vh",
      }}
    >
      <Card
        heading="Card heading"
        description="description goes here. This could be a really long description like so. If its really long it should leave space for the title actions like this red button."
        actions={
          <Button color={colors.red.base}>
            <div style={{ color: colors.white }}>Click</div>
          </Button>
        }
      >
        <div>card content</div>
      </Card>
    </div>
  ))
  .add("multiple sections", () => (
    <div
      style={{
        backgroundColor: colors.silver.light,
        padding: "40px",
        height: "100vh",
      }}
    >
      <Card
        heading="Card heading"
        description="Description"
        actions={
          <Button color={colors.red.base}>
            <div style={{ color: colors.white }}>Click</div>
          </Button>
        }
      >
        <CardSection
          heading="Members"
          description="You have 7 members in your organization"
        />
        <CardSeperator />
        <CardSection
          heading="Members"
          description="You have 7 members in your organization"
          actions={
            <Button color={colors.red.base}>
              <div style={{ color: colors.white }}>Edit</div>
            </Button>
          }
        />
      </Card>
    </div>
  ));
