/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";
import * as colors from "../colors";

const deselectedEnabled = {
  border: `1px solid ${colors.grey.lighter}`,
};
const deselectedDisabled = {
  border: `1px solid ${colors.silver.dark}`,
};
const selectedEnabled = {
  backgroundColor: colors.blue.base,
  boxShadow:
    "0 1px 4px 0 rgba(18, 21, 26, 0.08), inset 0 0 0 1px rgba(18, 21, 26, 0.2), inset 0 -1px 0 0 rgba(18, 21, 26, 0.05)",
};
const selectedDisabled = {
  backgroundColor: colors.blue.lighter,
};

const Radio: React.FC<{
  selected: boolean;
  disabled?: boolean;
}> = ({ selected, disabled }) => (
  <div
    css={{
      height: 16,
      width: 16,
      borderRadius: 8,
      position: "relative",
      cursor: disabled ? "default" : "pointer",
      ...(selected && !disabled && selectedEnabled),
      ...(selected && disabled && selectedDisabled),
      ...(!selected && !disabled && deselectedEnabled),
      ...(!selected && disabled && deselectedDisabled),
    }}
  >
    {selected && (
      <div
        css={{
          height: 6,
          width: 6,
          borderRadius: 3,
          backgroundColor: colors.white,
          position: "absolute",
          left: 5,
          top: 5,
        }}
      />
    )}
  </div>
);

storiesOf("Selectors and Menus", module)
  .addDecorator(withKnobs)
  .add("Table", () => (
    <div css={{ padding: 20 }}>
      <Radio selected={false} />
      <Radio selected={true} />
      <Radio selected={false} disabled={true} />
      <Radio selected={true} disabled={true} />

      <form>
        <input type="radio" id="contactChoice1" name="contact" value="email" />
        <input type="radio" id="contactChoice2" name="contact" value="phone" />
        <input type="radio" id="contactChoice3" name="contact" value="mail" />
      </form>
    </div>
  ));
