/** @jsx jsx */
import * as React from "react";
import { jsx } from "@emotion/react";
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
 * Component to render Feature Intro Image.
 *
 * If this component is rendered in the children of `FeatureIntroControl`, then
 * `FeatureIntroControl` will render this element in it's layout. Otherwise, it's
 * rendered as-is.
 */
export const FeatureIntroImage: React.FC<Props> = ({
  children,
  className,
  style,
}) => {
  const featureIntroContext = useFeatureIntroControlInternalContext();
  const [featureIntroId, setImage] = [
    featureIntroContext?.id,
    featureIntroContext?.setImage,
  ];

  const element = React.useMemo(
    () => (
      <div
        className={className}
        css={{ flexBasis: "50%" }}
        id={`${featureIntroId}-image`}
        style={style}
      >
        {children}
      </div>
    ),
    [children, className, featureIntroId, style],
  );

  React.useLayoutEffect(() => {
    setImage?.(element);
  }, [element, setImage]);

  return featureIntroContext ? null : element;
};
