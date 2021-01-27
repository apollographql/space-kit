import React from "react";
import { pick } from "lodash";

/**
 * Component wrapping a Tooltip to debug it's positioning issues. This should be
 * stripped out when we figure out why we keep having off-by-one pixel issues.
 */
export const DebugTooltip: React.FC = ({ children }) => {
  const [debugContent, setDebugContent] = React.useState("");
  const [tippyRoot, setTippyRoot] = React.useState<HTMLDivElement | null>(null);
  // console.log(tippyRoot);
  const [widths, setWidths] = React.useState<readonly number[]>([]);

  const updateStyleStrings = (
    element: HTMLDivElement | null,
    widths: readonly number[],
  ) => {
    setDebugContent(
      [
        element
          ? `${JSON.stringify(
              pick(element.style, [
                "top",
                "bottom",
                "left",
                "right",
                "transform",
              ]),
            )}`
          : "",
        `clientWidth=${document.querySelector("html")?.clientWidth}`,
        `widths=${widths}`,
      ].join("\n"),
    );
  };

  React.useEffect(() => {
    updateStyleStrings(tippyRoot, widths);
    const interval = window.setInterval(
      updateStyleStrings,
      500,
      tippyRoot,
      widths,
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [tippyRoot, widths]);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      if (tippyRoot) {
        const width = tippyRoot.offsetWidth;
        setWidths((previousValue) => {
          return !width || previousValue.includes(width)
            ? previousValue
            : previousValue.concat(width);
        });
      }
    }, 1000 / 60);

    return () => window.clearInterval(interval);
  }, [tippyRoot]);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      const element = document.querySelector<HTMLDivElement>(
        "*[data-tippy-root]",
      );

      setTippyRoot(() => element);
    }, 1000 / 60);

    return () => window.clearInterval(interval);
  }, []);

  return (
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
      >
        {debugContent}
      </pre>
    </div>
  );
};
