import React from "react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";
import { findByRole } from "@testing-library/dom";
import { Popover } from "../Popover";
import { ListHeading } from "../ListHeading";
import { ListItem } from "../ListItem";
import { PerformUserInteraction } from "../shared/PerformUserInteraction";
import { storiesOf } from "@storybook/react";
import { colors } from "../colors";

storiesOf("Tests|Popover", module)
  .addParameters({ component: Popover })
  .add("max height", () => (
    <div
      className="sk-scroll-container"
      style={{
        height: 800,
        width: 800,
        border: "1px solid red",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <PerformUserInteraction
        callback={async () => {
          userEvent.click(await findByRole(document.body, "button"));
        }}
      >
        <Popover
          placement="bottom-start"
          fallbackPlacements={["top-start"]}
          iconSize="small"
          maxWidth={280}
          content={
            <React.Fragment>
              <ListHeading>mdg-private-graphs</ListHeading>
              <ListItem>space-kit</ListItem>
              <ListItem>space-kit</ListItem>
              <ListItem>space-kit</ListItem>
              <ListItem>space-kit</ListItem>
              <ListItem>space-kit</ListItem>
              <ListItem>space-kit</ListItem>
              <ListItem>space-kit</ListItem>
              <ListItem>space-kit</ListItem>
              <ListItem>space-kit</ListItem>
              <ListItem>space-kit</ListItem>
            </React.Fragment>
          }
          trigger={
            <Button style={{ position: "absolute", left: 400, top: 400 }}>
              Open Popover
            </Button>
          }
        />
      </PerformUserInteraction>
    </div>
  ))
  .add("narrow primary placement (bottom, top)", () => (
    <div
      className="sk-scroll-container"
      style={{
        height: 400,
        width: 150,
        border: "1px solid red",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <PerformUserInteraction
        callback={async () => {
          userEvent.click(await findByRole(document.body, "button"));
        }}
      >
        <Popover
          placement="bottom"
          popperOptions={{ strategy: "absolute" }}
          fallbackPlacements={["top"]}
          iconSize="small"
          maxWidth={280}
          content={
            <React.Fragment>
              <ListHeading>Shapes</ListHeading>
              <ListItem>Circle</ListItem>
              <ListItem>Rectangle</ListItem>
              <ListItem>Square</ListItem>
            </React.Fragment>
          }
          trigger={
            <Button style={{ position: "absolute", left: 0, top: 200 }}>
              Open Popover
            </Button>
          }
        />
      </PerformUserInteraction>
    </div>
  ))
  .add("narrow fallback placement (bottom, top)", () => (
    <div
      className="sk-scroll-container"
      style={{
        height: 300,
        width: 150,
        border: "1px solid red",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <PerformUserInteraction
        callback={async () => {
          userEvent.click(await findByRole(document.body, "button"));
        }}
      >
        <Popover
          popperOptions={{ strategy: "absolute" }}
          placement="bottom"
          fallbackPlacements={["top"]}
          iconSize="small"
          maxWidth={280}
          content={
            <React.Fragment>
              <ListHeading>Shapes</ListHeading>
              <ListItem>Circle</ListItem>
              <ListItem>Rectangle</ListItem>
              <ListItem>Square</ListItem>
            </React.Fragment>
          }
          trigger={
            <Button style={{ position: "absolute", left: 0, top: 200 }}>
              Open Popover
            </Button>
          }
        />
      </PerformUserInteraction>
    </div>
  ))
  .add("default placement requiring max-height", () => (
    <div
      className="sk-scroll-container"
      style={{
        height: 165,
        width: 210,
        border: `1px solid ${colors.blue.base}`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <PerformUserInteraction
        callback={async () => {
          userEvent.click(await findByRole(document.body, "button"));
        }}
      >
        <Popover
          popperOptions={{ strategy: "absolute" }}
          placement="bottom-start"
          fallbackPlacements={["top-start"]}
          iconSize="small"
          maxWidth={280}
          content={
            <React.Fragment>
              <ListHeading>Shapes</ListHeading>
              <ListItem>Circle</ListItem>
              <ListItem>Rectangle</ListItem>
              <ListItem>Square</ListItem>
              <ListItem>Triangle</ListItem>
            </React.Fragment>
          }
          trigger={
            <Button style={{ position: "absolute", left: 0, top: 0 }}>
              Open Popover
            </Button>
          }
        />
      </PerformUserInteraction>
    </div>
  ));

storiesOf("Tests|ListItem", module)
  .addParameters({ component: ListItem })
  .add('aria-expanded="true"', () => (
    <div style={{ width: 100, height: 20 }}>
      <ListItem aria-expanded="true">Circle</ListItem>
    </div>
  ));
