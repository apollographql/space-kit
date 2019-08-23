/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { LoadingSpinner, Size } from "./index";
import { Button } from "../Button";
import { colors } from "../colors";
import * as typography from "../typography";
import { DemoSection, DemoGroup } from "../shared/DemoSection";

const SPINNER_SIZES: Size[] = ["large", "medium", "small", "xsmall", "2xsmall"];

storiesOf("Loaders", module)
  .addParameters({
    options: {
      showPanel: false,
    },
  })
  .add("Catalog", () => (
    <div css={{ color: colors.black.base }}>
      <DemoSection
        title="Spinners"
        description="Spinners are used when we are unable to determine loading time. Ideally, they should appear as briefly and infrequently as possible."
      >
        <DemoGroup
          title="On Pages & Cards"
          description="Spinners will most often appear on full pages and cards. Whenever possible, they should be paired with descriptive text that helps the user understand exactly what the system is working toward. Spinners should be center-aligned to the page with any text spaced 20 px below."
        >
          <div
            css={{
              flex: "1 1 0%",
              border: `1px solid ${colors.silver.dark}`,
              borderRadius: 8,
              margin: 6,
            }}
          >
            {SPINNER_SIZES.map(size => (
              <div key={size} css={{ margin: 20 }}>
                <span
                  css={{
                    ...typography.base.small,
                    fontWeight: 600,
                    display: "block",
                    textTransform: "uppercase",
                  }}
                >
                  {size}
                </span>
                <LoadingSpinner css={{ display: "block" }} size={size} />
              </div>
            ))}
          </div>
          <div
            css={{
              backgroundColor: colors.black.base,
              flex: "1 1 0%",
              border: `1px solid ${colors.silver.dark}`,
              borderRadius: 8,
              margin: 6,
            }}
          >
            {SPINNER_SIZES.map(size => (
              <div key={size} css={{ margin: 20 }}>
                <span
                  css={{
                    ...typography.base.small,
                    fontWeight: 600,
                    color: colors.grey.lighter,
                    display: "block",
                    textTransform: "uppercase",
                  }}
                >
                  {size}
                </span>
                <LoadingSpinner
                  theme="dark"
                  css={{ display: "block" }}
                  size={size}
                />
              </div>
            ))}
          </div>
        </DemoGroup>
        <DemoGroup
          title="In Buttons"
          description="Spinners may also exist inside buttons. If a user clicks on a button and the system needs time to process the request, the button should expand horizontally to the right, the color should change to the next lightest shade, and the spinner should appear to the left of the text."
        >
          <Button
            color={colors.blue.base}
            icon={<LoadingSpinner theme="dark" size="2xsmall" />}
            css={{ width: "100%", marginTop: 6, marginBottom: 20 }}
          >
            Submit
          </Button>
          <Button
            color={colors.blue.base}
            disabled
            icon={<LoadingSpinner size="2xsmall" />}
            css={{ width: "100%", marginBottom: 20 }}
          >
            Submit
          </Button>
          <Button
            feel="flat"
            icon={<LoadingSpinner size="2xsmall" />}
            css={{ width: "100%" }}
          >
            Submit
          </Button>
        </DemoGroup>
      </DemoSection>
    </div>
  ));
