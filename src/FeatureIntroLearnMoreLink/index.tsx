/** @jsx jsx */
import * as React from "react";
import * as typography from "../typography";
import { jsx } from "@emotion/core";
import { colors } from "../colors";
import { useFeatureIntroControlInternalContext } from "../shared/FeatureIntroControlContext";

/**
 * Component to render Feature Intro learn more button.
 *
 * If this component is rendered in the children of `FeatureIntroControl`, then
 * `FeatureIntroControl` will render this element in it's layout. Otherwise, it's
 * rendered as-is.
 */
export const FeatureIntroLearnMoreLink: React.FC<React.HTMLProps<
  HTMLAnchorElement
>> = ({ className, style, id, href, rel, target }) => {
  const {
    learnMoreLinkId,
    setLearnMoreLink,
  } = useFeatureIntroControlInternalContext();

  const element = React.useMemo(
    () => (
      <a
        style={style}
        className={className}
        id={learnMoreLinkId || id}
        href={href}
        rel={rel}
        target={target}
      >
        <div
          css={{
            color: colors.grey.base,
            ...typography.base.small,
            fontWeight: 600,
          }}
        >
          Learn more
        </div>
      </a>
    ),
    [style, className, learnMoreLinkId, id, href, rel, target],
  );

  React.useLayoutEffect(() => {
    setLearnMoreLink?.(element);
  }, [element, setLearnMoreLink]);

  return setLearnMoreLink ? null : element;
};
