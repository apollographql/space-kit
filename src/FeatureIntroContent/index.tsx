/** @jsx jsx */
import * as React from "react";
import * as typography from "../typography";
import { jsx } from "@emotion/react";
import { colors } from "../colors";
import { useFeatureIntroControlInternalContext } from "../shared/FeatureIntroControlContext";

interface Props
  extends Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "className" | "style"
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
  style,
}) => {
  const featureIntroContext = useFeatureIntroControlInternalContext();
  const [featureIntroId, setContent] = [
    featureIntroContext?.id,
    featureIntroContext?.setContent,
  ];
  const element = React.useMemo(
    () => (
      <div
        className={className}
        css={{
          ...typography.base.small,
          color: colors.grey.base,
          fontWeight: "normal",
          lineHeight: "16px",
          paddingBottom: 16,
        }}
        id={featureIntroId && `${featureIntroId}-content`}
        style={style}
      >
        {children}
      </div>
    ),
    [children, className, featureIntroId, style],
  );

  React.useLayoutEffect(() => {
    setContent?.(element);
  }, [element, setContent]);

  return featureIntroContext ? null : element;
};
