import { storiesOf } from "@storybook/react";
import React from "react";
import { Tooltip } from "../Tooltip";
import { Button } from "../Button";
import { colors } from "../colors";
import { PerformUserInteraction } from "../shared/PerformUserInteraction";
import userEvent from "@testing-library/user-event";
import { findByRole } from "@testing-library/dom";
import { DebugTooltip } from "../shared/DebugTooltip";

storiesOf("Tooltip", module)
  .add("live", () => {
    return (
      <div style={{ padding: 50 }}>
        <Tooltip content="default content">
          <span>hover</span>
        </Tooltip>
      </div>
    );
  })
  .add("interactive", () => {
    return (
      <div
        style={{
          alignItems: "center",
          border: `1px solid ${colors.silver.light}`,
          borderRadius: ".25rem",
          display: "flex",
          height: 150,
          justifyContent: "center",
          width: 149,
        }}
      >
        <Tooltip content="default content" interactive>
          <span>hover</span>
        </Tooltip>
      </div>
    );
  })
  .add(
    "normal padding",
    () => {
      return (
        <DebugTooltip>
          <PerformUserInteraction
            callback={async () => {
              userEvent.click(await findByRole(document.body, "button"));
            }}
          >
            <div
              style={{
                alignItems: "center",
                border: `1px solid ${colors.silver.light}`,
                borderRadius: ".25rem",
                display: "flex",
                height: 150,
                justifyContent: "center",
                width: 149,
              }}
            >
              <Tooltip content="hover">
                <Button>hover</Button>
              </Tooltip>
            </div>
          </PerformUserInteraction>
        </DebugTooltip>
      );
    },
    { chromatic: { delay: 500 } }
  )
  .add(
    "relaxed padding",
    () => {
      return (
        <DebugTooltip>
          <PerformUserInteraction
            callback={async () => {
              userEvent.click(await findByRole(document.body, "button"));
            }}
          >
            <div
              style={{
                alignItems: "flex-start",
                border: `1px solid ${colors.silver.light}`,
                borderRadius: ".25rem",
                display: "flex",
                height: 200,
                justifyContent: "center",
                width: 400,
              }}
            >
              <Tooltip
                content={
                  <>
                    <div style={{ fontWeight: 700, marginBottom: 8 }}>
                      Our No-worries Billing Policy
                    </div>
                    <div>
                      We give you a preview of how many users have been added to
                      your organization, so you can make changes if someone
                      shouldn’t have access to your data or were added by
                      mistake. Simply remove them before you’re billed and you
                      won’t be charged.
                    </div>
                  </>
                }
                padding="relaxed"
              >
                <Button>hover</Button>
              </Tooltip>
            </div>
          </PerformUserInteraction>
        </DebugTooltip>
      );
    },
    { chromatic: { delay: 500 } }
  )
  .add(
    "disabled, no tooltip should be visible",
    () => {
      return (
        <PerformUserInteraction
          callback={async () => {
            userEvent.click(await findByRole(document.body, "button"));
          }}
        >
          <div
            style={{
              alignItems: "center",
              border: `1px solid ${colors.silver.light}`,
              borderRadius: ".25rem",
              display: "flex",
              height: 150,
              justifyContent: "center",
              width: 149,
            }}
          >
            <Tooltip content="tooltip" disabled>
              <Button>tooltip</Button>
            </Tooltip>
          </div>
        </PerformUserInteraction>
      );
    },
    { chromatic: { delay: 500 } }
  );
