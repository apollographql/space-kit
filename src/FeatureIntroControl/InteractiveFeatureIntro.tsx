import { ClassNames } from "@emotion/core";
import React from "react";
import * as typography from "../typography";
import { colors } from "../colors";
import Tippy from "@tippyjs/react";
import { FeatureIntroControl } from "../FeatureIntroControl";
import { FeatureIntroContent } from "../FeatureIntroContent";
import { FeatureIntroHeading } from "../FeatureIntroHeading";
import { FeatureIntroLearnMoreLink } from "../FeatureIntroLearnMoreLink";
import { FeatureIntroDismissButton } from "../FeatureIntroDismissButton";
import { FeatureIntroTippyStyles } from "./FeatureIntroTippyStyles";

export const InteractiveFeatureIntro: React.FC = () => {
  const [visible, setVisible] = React.useState(true);
  return (
    <ClassNames>
      {({ css }) => (
        <>
          <FeatureIntroTippyStyles />
          <Tippy
            interactive={true}
            animation={"shift-away"}
            arrow={true}
            visible={visible}
            theme="feature-intro"
            content={
              <FeatureIntroControl id="default">
                <FeatureIntroHeading>
                  Welcome to your Dev Graph
                </FeatureIntroHeading>
                <FeatureIntroContent>
                  <div className={css({ lineHeight: "16px" })}>
                    Development graphs connect to your local server. The circle
                    indicator shows the current state of your connection.
                  </div>
                </FeatureIntroContent>
                <FeatureIntroLearnMoreLink href="https://apollographql.com" />
                <FeatureIntroDismissButton onClick={() => setVisible(false)}>
                  Got it 👍
                </FeatureIntroDismissButton>
              </FeatureIntroControl>
            }
          >
            <div
              className={css({
                padding: 20,
                border: `1px ${colors.grey.light} solid`,
                borderRadius: 4,
                width: 160,
                ...typography.base.small,
              })}
            >
              Apollo Dev Graph
            </div>
          </Tippy>
        </>
      )}
    </ClassNames>
  );
};
