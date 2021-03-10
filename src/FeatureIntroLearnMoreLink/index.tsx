/** @jsx jsx */
import * as React from "react";
import * as typography from "../typography";
import { jsx } from "@emotion/react";
import { colors } from "../colors";
import { useFeatureIntroControlInternalContext } from "../shared/FeatureIntroControlContext";
import { As, createElementFromAs } from "../shared/createElementFromAs";

interface Props
  extends Pick<
    React.DetailedHTMLProps<
      React.HTMLProps<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    "className" | "style" | "id"
  > {
  /**
   * Override how the learn more link is rendered.
   *
   * @default "a"
   */
  as?: As;
}

/**
 * Component to render Feature Intro learn more button.
 *
 * If this component is rendered in the children of `FeatureIntroControl`, then
 * `FeatureIntroControl` will render this element in it's layout. Otherwise, it's
 * rendered as-is.
 */
export const FeatureIntroLearnMoreLink: React.FC<Props> = ({
  as = "a",
  className,
  style,
}) => {
  const featureIntroContext = useFeatureIntroControlInternalContext();
  const [featureIntroId, setLearnMoreLink] = [
    featureIntroContext?.id,
    featureIntroContext?.setLearnMoreLink,
  ];

  const element = React.useMemo(
    () =>
      React.isValidElement(as)
        ? React.cloneElement(
            createElementFromAs(as),
            { className, style },
            <div id={featureIntroId && `${featureIntroId}-learn-more-link`}>
              <div
                css={{
                  color: colors.grey.base,
                  ...typography.base.small,
                  fontWeight: 600,
                  padding: "8px 5px",
                  marginLeft: -5,
                  marginTop: -8,
                }}
              >
                Learn more
              </div>
            </div>,
          )
        : null,
    [as, className, featureIntroId, style],
  );

  React.useLayoutEffect(() => {
    setLearnMoreLink?.(element);
  }, [element, setLearnMoreLink]);

  return featureIntroContext ? null : element;
};
