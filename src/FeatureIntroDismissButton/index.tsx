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
    "className" | "style" | "id" | "onClick"
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
export const FeatureIntroDismissButton: React.FC<Props> = ({
  children,
  className,
  style,
  onClick,
}) => {
  const featureIntroContext = useFeatureIntroControlInternalContext();
  const [featureIntroId, setDismissButton] = [
    featureIntroContext?.id,
    featureIntroContext?.setDismissButton,
  ];

  const element = React.useMemo(
    () => (
      <div
        className={className}
        css={{
          ...typography.base.small,
          color: colors.blue.base,
          fontWeight: 600,
          padding: "8px 5px",
          marginRight: -5,
          marginTop: -8,
          // force right even if there is no learn more button
          marginLeft: "auto",
          cursor: "pointer",
        }}
        id={featureIntroId && `${featureIntroId}-dismiss-button`}
        style={style}
        onClick={onClick}
      >
        {children}
      </div>
    ),
    [children, className, featureIntroId, onClick, style],
  );

  React.useLayoutEffect(() => {
    setDismissButton?.(element);
  }, [element, setDismissButton]);

  return featureIntroContext ? null : element;
};
