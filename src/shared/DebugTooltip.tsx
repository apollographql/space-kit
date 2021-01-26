import React from "react";
import { PerformUserInteraction } from "../shared/PerformUserInteraction";
import { getByTestId, waitFor } from "@testing-library/dom";
import { pick } from "lodash";

/**
 * Component wrapping a Tooltip to debug it's positioning issues. This should be
 * stripped out when we figure out why we keep having off-by-one pixel issues.
 */
export const DebugTooltip: React.FC = ({ children }) => {
  return (
    <PerformUserInteraction
      callback={async () => {
        const tippyRoot = await waitFor(() => {
          const element = document.querySelector<HTMLDivElement>(
            "*[data-tippy-root]",
          );
          if (!element) throw new TypeError("could not find tippy root");
          return element;
        });

        getByTestId(document.body, "debug-styles-box").appendChild(
          document.createTextNode(
            [
              `${JSON.stringify(
                pick(tippyRoot.style, [
                  "top",
                  "bottom",
                  "left",
                  "right",
                  "transform",
                ]),
              )}`,
              `clientWidth=${document.querySelector("html")?.clientWidth}`,
              `size=${
                document.querySelector<HTMLDivElement>("[data-tippy-root]")
                  ?.offsetWidth
              }x${
                document.querySelector<HTMLDivElement>("[data-tippy-root]")
                  ?.offsetHeight
              }`,
            ].join("\n"),
          ),
        );
      }}
    >
      <div style={{ width: 300, height: 250, position: "relative" }}>
        {children}

        <pre
          style={{
            bottom: 5,
            fontSize: 10,
            left: 5,
            padding: 5,
            position: "absolute",
            right: 5,
          }}
          data-testid="debug-styles-box"
        />
      </div>
    </PerformUserInteraction>
  );
};
