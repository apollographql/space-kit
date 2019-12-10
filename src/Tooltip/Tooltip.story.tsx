import { storiesOf } from "@storybook/react";
import React from "react";
import { Tooltip } from "../Tooltip";
import { Button } from "../Button";

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
      <div style={{ padding: 50 }}>
        <Tooltip content="default content" interactive>
          <span>hover</span>
        </Tooltip>
      </div>
    );
  })
  .add("normal padding", () => {
    return (
      <div style={{ padding: 50 }}>
        <Tooltip content="hover" forceVisibleForTestingOnly>
          <Button>hover</Button>
        </Tooltip>
      </div>
    );
  })
  .add("relaxed padding", () => {
    return (
      <div style={{ padding: 50 }}>
        <Tooltip
          content={
            <>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>
                Our No-worries Billing Policy
              </div>
              <div>
                We give you a preview of how many users have been added to your
                organization, so you can make changes if someone shouldn’t have
                access to your data or were added by mistake. Simply remove them
                before you’re billed and you won’t be charged.
              </div>
            </>
          }
          padding="relaxed"
          forceVisibleForTestingOnly
        >
          <Button>hover</Button>
        </Tooltip>
      </div>
    );
  });
