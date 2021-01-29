/** @jsx jsx */
import { storiesOf } from "@storybook/react";
import { css, jsx } from "@emotion/core";
import { Modal } from "../Modal";
import React, { useState } from "react";
import { colors } from "../colors";
import { Button } from "../Button";

interface Props {
  title: string;
  description: string;
  size: "small" | "medium" | "large";
}

const CustomComponent = React.forwardRef<HTMLDivElement, { an?: undefined }>(
  (props, ref) => (
    <div
      {...props}
      ref={ref}
      css={css`
        background: repeating-linear-gradient(
          135deg,
          ${colors.white},
          ${colors.white} 10px,
          rgb(255, 253, 253) 10px,
          rgb(255, 253, 253) 20px
        );
        width: 80vw;
      `}
    />
  ),
);

export function ModalStory({
  title,
  description,
  size,
}: Props): ReturnType<React.FC> {
  const [visible, setVisible] = useState(false);
  // TODO: use space kit button when it gets released
  return (
    <div>
      <button
        type="button"
        style={{
          textTransform: "uppercase",
        }}
        onClick={() => setVisible(true)}
      >{`${size} modal`}</button>
      {visible && (
        <Modal
          onClose={() => setVisible(false)}
          size={size}
          title={title}
          description={description}
          primaryAction={<Button>Ok</Button>}
        >
          <div>
            <h3>Body</h3>
            Click outside the body of this modal or press the esc key to exit.
          </div>
        </Modal>
      )}
    </div>
  );
}

storiesOf("Modal", module)
  .addParameters({ component: Modal })
  .add("interactive", () => (
    <div style={{ position: "absolute", left: 200 }}>
      <ModalStory
        title="Modal Title"
        description="modal description"
        size={"small"}
      />
      <ModalStory
        title="Modal Title"
        description="modal description"
        size={"medium"}
      />
      <ModalStory
        title="Modal Title"
        description="modal description"
        size={"large"}
      />
    </div>
  ))
  .add("using as", () => (
    <Modal
      as={
        <div
          css={css`
            background: repeating-linear-gradient(
              135deg,
              ${colors.white},
              ${colors.white} 10px,
              rgb(255, 253, 253) 10px,
              rgb(255, 253, 253) 20px
            );
            width: 80vw;
          `}
        />
      }
      size="large"
      title="Example Title"
      primaryAction={
        <Button
          color={colors.red.base}
          style={{ color: colors.white }}
          type="button"
        >
          Accept
        </Button>
      }
      secondaryAction={
        <Button color={colors.white} type="button">
          Cancel
        </Button>
      }
    >
      Inner text
    </Modal>
  ))
  .add("using as with custom component", () => (
    <Modal
      as={<CustomComponent />}
      size="large"
      title="Example Title"
      primaryAction={
        <Button
          color={colors.red.base}
          style={{ color: colors.white }}
          type="button"
        >
          Accept
        </Button>
      }
      secondaryAction={
        <Button color={colors.white} type="button">
          Cancel
        </Button>
      }
    >
      Inner text
    </Modal>
  ))
  .add(
    "static (small) (✅ primaryAction, ✅ secondaryAction, ✅ bottomLeftText)",
    () => (
      <Modal
        size="small"
        title="Are you sure you want to remove Jeremy?"
        primaryAction={
          <Button
            color={colors.red.base}
            style={{ color: colors.white }}
            type="button"
          >
            Yes, remove
          </Button>
        }
        secondaryAction={
          <Button color={colors.white} type="button">
            Cancel
          </Button>
        }
        bottomLeftText={
          <span style={{ color: colors.blue.base }}>More info...</span>
        }
      >
        Jeremy will no longer have access to the MGD-Private. You can always add
        them back to the organization later.
      </Modal>
    ),
  )
  .add(
    "static (small) (✅ primaryAction, ❌ secondaryAction, ✅ bottomLeftText)",
    () => (
      <Modal
        size="small"
        title="Are you sure you want to remove Jeremy?"
        primaryAction={
          <Button
            color={colors.red.base}
            style={{ color: colors.white }}
            type="button"
          >
            Yes, remove
          </Button>
        }
        bottomLeftText={
          <span style={{ color: colors.blue.base }}>More info...</span>
        }
      >
        Jeremy will no longer have access to the MGD-Private. You can always add
        them back to the organization later.
      </Modal>
    ),
  )
  .add(
    "static (small) (✅ primaryAction, ❌ secondaryAction, ❌ bottomLeftText)",
    () => (
      <Modal
        size="small"
        title="Are you sure you want to remove Jeremy?"
        primaryAction={
          <Button
            color={colors.red.base}
            style={{ color: colors.white }}
            type="button"
          >
            Yes, remove
          </Button>
        }
      >
        Jeremy will no longer have access to the MGD-Private. You can always add
        them back to the organization later.
      </Modal>
    ),
  )
  .add(
    "static (medium) (✅ primaryAction, ✅ secondaryAction, ✅ bottomLeftText)",
    () => (
      <Modal
        size="medium"
        title="Modal Title"
        primaryAction={
          <Button color={colors.green.base} style={{ color: colors.white }}>
            Buy 1 Seat
          </Button>
        }
        secondaryAction={<Button color={colors.white}>Cancel</Button>}
        bottomLeftText={
          <span style={{ color: colors.blue.base }}>
            Update Billing Information
          </span>
        }
      >
        Additional seats needed
      </Modal>
    ),
  )
  .add(
    "static (large) (❌ primaryAction, ❌ secondaryAction, ❌ bottomLeftText) ",
    () => (
      <Modal
        size="large"
        title="Modal Title"
        description="Description of this modal or call to action"
        primaryAction={<Button>Done</Button>}
      >
        <div style={{ minHeight: 300, backgroundColor: colors.silver.light }}>
          content
        </div>
      </Modal>
    ),
  )
  .add("using verticalScrollMode 'modal'", () => (
    <Modal
      size="medium"
      title="Modal Title"
      primaryAction={
        <Button color={colors.green.base} style={{ color: colors.white }}>
          Buy 1 Seat
        </Button>
      }
      secondaryAction={<Button color={colors.white}>Cancel</Button>}
      bottomLeftText={
        <span style={{ color: colors.blue.base }}>
          Update Billing Information
        </span>
      }
    >
      <div>
        {Array.from(Array(500))
          .map(() => "lorem ipsum dolor")
          .join(" ")}
      </div>
    </Modal>
  ))
  .add("using verticalScrollMode 'children'", () => (
    <Modal
      size="medium"
      title="Modal Title"
      verticalScrollMode="children"
      primaryAction={
        <Button color={colors.green.base} style={{ color: colors.white }}>
          Buy 1 Seat
        </Button>
      }
      secondaryAction={<Button color={colors.white}>Cancel</Button>}
      bottomLeftText={
        <span style={{ color: colors.blue.base }}>
          Update Billing Information
        </span>
      }
    >
      <div>
        {Array.from(Array(500))
          .map(() => "lorem ipsum dolor")
          .join(" ")}
      </div>
    </Modal>
  ));
