import React from "react";
import { Button } from "../Button";
import { ConfirmationTooltip } from "../ConfirmationTooltip";
import { storiesOf } from "@storybook/react";

storiesOf("ConfirmationTooltip", module)
  .add("forced visible", () => {
    return (
      <div style={{ padding: 50 }}>
        <ConfirmationTooltip
          content="default content"
          forceVisibleForTestingOnly
        >
          <Button>click</Button>
        </ConfirmationTooltip>
      </div>
    );
  })
  .add("interactive", () => {
    return (
      <div style={{ padding: 50 }}>
        <ConfirmationTooltip content="default content">
          <Button>click</Button>
        </ConfirmationTooltip>
      </div>
    );
  });
