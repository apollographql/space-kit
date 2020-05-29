import React from "react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";
import { findByText } from "@testing-library/dom";
import { Menu } from "../Menu";
import { MenuHeading } from "../MenuHeading";
import { MenuItem } from "../MenuItem";
import { PerformUserInteraction } from "../shared/PerformUserInteraction";
import { storiesOf } from "@storybook/react";
import { colors } from "../colors";

storiesOf("Tests|Menu", module)
  .addParameters({ component: Menu })
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
          userEvent.click(await findByText(document.body, /open menu/i));
        }}
      >
        <Menu
          placement="bottom-start"
          fallbackPlacements={["top-start"]}
          iconSize="small"
          maxWidth={280}
          content={
            <React.Fragment>
              <MenuHeading>mdg-private-graphs</MenuHeading>
              <MenuItem>space-kit</MenuItem>
              <MenuItem>space-kit</MenuItem>
              <MenuItem>space-kit</MenuItem>
              <MenuItem>space-kit</MenuItem>
              <MenuItem>space-kit</MenuItem>
              <MenuItem>space-kit</MenuItem>
              <MenuItem>space-kit</MenuItem>
              <MenuItem>space-kit</MenuItem>
              <MenuItem>space-kit</MenuItem>
              <MenuItem>space-kit</MenuItem>
            </React.Fragment>
          }
        >
          <Button style={{ position: "absolute", left: 400, top: 400 }}>
            Open Menu
          </Button>
        </Menu>
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
          userEvent.click(await findByText(document.body, /open menu/i));
        }}
      >
        <Menu
          placement="bottom"
          popperOptions={{ strategy: "absolute" }}
          fallbackPlacements={["top"]}
          iconSize="small"
          maxWidth={280}
          content={
            <React.Fragment>
              <MenuHeading>Shapes</MenuHeading>
              <MenuItem>Circle</MenuItem>
              <MenuItem>Rectangle</MenuItem>
              <MenuItem>Square</MenuItem>
            </React.Fragment>
          }
        >
          <Button style={{ position: "absolute", left: 0, top: 200 }}>
            Open Menu
          </Button>
        </Menu>
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
          userEvent.click(await findByText(document.body, /open menu/i));
        }}
      >
        <Menu
          popperOptions={{ strategy: "absolute" }}
          placement="bottom"
          fallbackPlacements={["top"]}
          iconSize="small"
          maxWidth={280}
          content={
            <React.Fragment>
              <MenuHeading>Shapes</MenuHeading>
              <MenuItem>Circle</MenuItem>
              <MenuItem>Rectangle</MenuItem>
              <MenuItem>Square</MenuItem>
            </React.Fragment>
          }
        >
          <Button style={{ position: "absolute", left: 0, top: 200 }}>
            Open Menu
          </Button>
        </Menu>
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
          userEvent.click(await findByText(document.body, /open menu/i));
        }}
      >
        <Menu
          popperOptions={{ strategy: "absolute" }}
          placement="bottom-start"
          fallbackPlacements={["top-start"]}
          iconSize="small"
          maxWidth={280}
          content={
            <React.Fragment>
              <MenuHeading>Shapes</MenuHeading>
              <MenuItem>Circle</MenuItem>
              <MenuItem>Rectangle</MenuItem>
              <MenuItem>Square</MenuItem>
              <MenuItem>Triangle</MenuItem>
            </React.Fragment>
          }
        >
          <Button style={{ position: "absolute", left: 0, top: 0 }}>
            Open Menu
          </Button>
        </Menu>
      </PerformUserInteraction>
    </div>
  ));

storiesOf("Tests|MenuItem", module)
  .addParameters({ component: MenuItem })
  .add('aria-expanded="true"', () => (
    <div style={{ width: 100, height: 20 }}>
      <MenuItem aria-expanded="true">Circle</MenuItem>
    </div>
  ));
