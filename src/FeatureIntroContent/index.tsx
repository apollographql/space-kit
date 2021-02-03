/** @jsx jsx */
import * as React from "react";
import * as typography from "../typography";
import { jsx } from "@emotion/core";
import { colors } from "../colors";
import { useFeatureIntroControlInternalContext } from "../shared/FeatureIntroControlContext";

interface Props
  extends Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "className" | "style" | "id"
  > {
  children: React.ReactNode;
}

/**
 * Component to render Feature Intro content.
 *
 * If this component is rendered in the children of `FeatureIntroControl`, then
 * `FeatureIntroControl` will render this element in it's layout. Otherwise, it's
 * rendered as-is.
 */
export const FeatureIntroContent: React.FC<Props> = ({
  children,
  className,
  id,
  style,
}) => {
  const { contentId, setContent } = useFeatureIntroControlInternalContext();

  const element = React.useMemo(
    () => (
      <div
        className={className}
        css={{
          ...typography.base.small,
          color: colors.grey.base,
          fontWeight: "normal",
        }}
        id={contentId || id}
        style={style}
      >
        {children}
      </div>
    ),
    [children, className, contentId, id, style],
  );

  React.useLayoutEffect(() => {
    setContent?.(element);
  }, [element, setContent]);

  return setContent ? null : element;
};
