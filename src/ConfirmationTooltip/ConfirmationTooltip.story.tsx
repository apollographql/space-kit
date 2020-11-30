import React from "react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";
import { ConfirmationTooltip } from "../ConfirmationTooltip";
import { findByText } from "@testing-library/dom";
import { PerformUserInteraction } from "../shared/PerformUserInteraction";
import { storiesOf } from "@storybook/react";
import { DebugTooltip } from "../shared/DebugTooltip";

storiesOf("ConfirmationTooltip", module)
  .add(
    "forced visible",
    () => {
      return (
        <DebugTooltip>
          <PerformUserInteraction
            callback={async () => {
              userEvent.click(await findByText(document.body, "click"));
            }}
          >
            <div style={{ padding: 50 }}>
              <ConfirmationTooltip content="default content">
                <Button>click</Button>
              </ConfirmationTooltip>
            </div>
          </PerformUserInteraction>
        </DebugTooltip>
      );
    },
    {
      chromatic: { delay: 500 },
    }
  )
  .add(
    "disabled, no confirmation should be visible",
    () => {
      return (
        <PerformUserInteraction
          callback={async () => {
            userEvent.click(await findByText(document.body, "click"));
          }}
        >
          <div style={{ padding: 50 }}>
            <ConfirmationTooltip content="content" disabled>
              <Button>click</Button>
            </ConfirmationTooltip>
          </div>
        </PerformUserInteraction>
      );
    },
    {
      chromatic: { delay: 500 },
    }
  )
  .add("interactive", () => {
    return (
      <div style={{ padding: 50 }}>
        <ConfirmationTooltip content="default content">
          <Button>click</Button>
        </ConfirmationTooltip>
      </div>
    );
  });
