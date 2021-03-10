import React from "react";
import userEvent from "@testing-library/user-event";
import { findByRole } from "@testing-library/dom";
import { Select } from "../Select";
import { PerformUserInteraction } from "../shared/PerformUserInteraction";
import { storiesOf } from "@storybook/react";

storiesOf("Tests/Select", module)
  .addParameters({ component: Select })
  .add(
    "initially selected item should scroll into view on mount",
    () => (
      <div
        className="sk-scroll-container"
        style={{
          height: 300,
          width: 300,
          border: "1px solid red",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <PerformUserInteraction
          callback={async () => {
            // Click the triggering button
            userEvent.click(await findByRole(document.body, "button"));
          }}
        >
          <Select value="k" popperOptions={{ strategy: "absolute" }}>
            <option>a</option>
            <option>b</option>
            <option>c</option>
            <option>d</option>
            <option>e</option>
            <option>f</option>
            <option>g</option>
            <option>h</option>
            <option>i</option>
            <option>j</option>
            <option>k</option>
          </Select>
        </PerformUserInteraction>
      </div>
    ),
    {
      chromatic: { delay: 2000 },
    },
  )
  .add(
    "long list",
    () => (
      <div
        className="sk-scroll-container"
        style={{
          height: 300,
          width: 300,
          border: "1px solid red",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <PerformUserInteraction
          callback={async () => {
            // Click the triggering button
            userEvent.click(await findByRole(document.body, "button"));
          }}
        >
          <Select>
            {["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].map(
              (groupLabel) => (
                <optgroup key={groupLabel} label={groupLabel}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((optValue) => (
                    <option key={optValue} value={optValue}>
                      {optValue}
                    </option>
                  ))}
                </optgroup>
              ),
            )}
          </Select>
        </PerformUserInteraction>
      </div>
    ),
    {
      chromatic: { delay: 2000 },
    },
  );
