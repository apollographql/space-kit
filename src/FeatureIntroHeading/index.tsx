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
 * Component to render Feature Intro heading.
 *
 * If this component is rendered in the children of `FeatureIntroControl`, then
 * `FeatureIntroControl` will render this element in it's layout. Otherwise, it's
 * rendered as-is.
 */
export const FeatureIntroHeading: React.FC<Props> = ({
  children,
  className,
  style,
}) => {
  const featureIntroContext = useFeatureIntroControlInternalContext();
  const [featureIntroId, setHeading] = [
    featureIntroContext?.id,
    featureIntroContext?.setHeading,
  ];

  const element = React.useMemo(
    () => (
      <div
        className={className}
        css={{
          ...typography.base.base,
          color: colors.grey.darker,
          fontWeight: 600,
        }}
        id={featureIntroId && `${featureIntroId}-heading`}
        style={style}
      >
        {children}
      </div>
    ),
    [children, className, featureIntroId, style],
  );

  React.useLayoutEffect(() => {
    setHeading?.(element);
  }, [element, setHeading]);

  return featureIntroContext ? null : element;
};
