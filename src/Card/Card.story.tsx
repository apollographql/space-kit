/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Card } from "./Card";
import { Button } from "../Button";
import * as colors from "../colors";

const CardWithDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  return (
    <Card
      title="Card Title"
      description="description goes here"
      forceNoChildPadding={true}
      titleChildren={
        <Button
          color={colors.red.base}
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <div css={{ color: colors.white }}>Click</div>
        </Button>
      }
    >
      {drawerOpen && (
        <div
          css={{
            height: "2.5rem",
            backgroundColor: colors.black.base,
            color: colors.white,
            padding: 20,
          }}
        >
          card content
        </div>
      )}
    </Card>
  );
};

storiesOf("Card", module)
  .add("default", () => (
    <div
      css={{
        backgroundColor: colors.silver.light,
        padding: "40px",
        height: "100vh",
      }}
    >
      <Card title="Card Title" description="description goes here">
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
        title="Card Title"
        description="description goes here"
        titleChildren={
          <Button color={colors.red.base}>
            <div css={{ color: colors.white }}>Click</div>
          </Button>
        }
      >
        <div>card content</div>
      </Card>
    </div>
  ))
  .add("with title children - button", () => (
    <div
      css={{
        backgroundColor: colors.silver.light,
        padding: "40px",
        height: "100vh",
      }}
    >
      <Card
        title="Card Title"
        description="description goes here"
        titleChildren={
          <Button color={colors.red.base}>
            <div css={{ color: colors.white }}>Click</div>
          </Button>
        }
      >
        <div>card content</div>
      </Card>
    </div>
  ))
  .add("force no child padding (use for drawers)", () => (
    <div
      css={{
        backgroundColor: colors.silver.light,
        padding: "40px",
        height: "100vh",
      }}
    >
      <CardWithDrawer />
    </div>
  ));
