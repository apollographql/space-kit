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
 * Component to render Feature Intro heading.
 *
 * If this component is rendered in the children of `FeatureIntroControl`, then
 * `FeatureIntroControl` will render this element in it's layout. Otherwise, it's
 * rendered as-is.
 */
export const FeatureIntroHeading: React.FC<Props> = ({
  children,
  className,
  id,
  style,
}) => {
  const { headingId, setHeading } = useFeatureIntroControlInternalContext();

  const element = React.useMemo(
    () => (
      <div
        className={className}
        css={{
          ...typography.base.base,
          color: colors.grey.darker,
          fontWeight: 600,
        }}
        id={headingId || id}
        style={style}
      >
        {children}
      </div>
    ),
    [children, className, headingId, id, style],
  );

  React.useLayoutEffect(() => {
    setHeading?.(element);
  }, [element, setHeading]);

  return setHeading ? null : element;
};
