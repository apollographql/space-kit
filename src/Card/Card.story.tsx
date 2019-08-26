/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { Card, CardSection, CardSeperator } from "./Card";
import { Button } from "../Button";
import { colors } from "../colors";

storiesOf("Card", module)
  .addParameters({ component: Card })
  .add("default", () => (
    <div
      css={{
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
      css={{
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
      css={{
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
            <div css={{ color: colors.white }}>Click</div>
          </Button>
        }
      >
        <div>card content</div>
      </Card>
    </div>
  ))
  .add("with actions - button", () => (
    <div
      css={{
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
            <div css={{ color: colors.white }}>Click</div>
          </Button>
        }
      >
        <div>card content</div>
      </Card>
    </div>
  ))
  .add("multiple sections", () => (
    <div
      css={{
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
            <div css={{ color: colors.white }}>Click</div>
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
              <div css={{ color: colors.white }}>Edit</div>
            </Button>
          }
        />
      </Card>
    </div>
  ));
