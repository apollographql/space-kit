/** @jsx jsx */
import * as React from "react";
import { jsx } from "@emotion/core";
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
 * Component to render Feature Intro Image.
 *
 * If this component is rendered in the children of `FeatureIntroControl`, then
 * `FeatureIntroControl` will render this element in it's layout. Otherwise, it's
 * rendered as-is.
 */
export const FeatureIntroImage: React.FC<Props> = ({
  children,
  className,
  id,
  style,
}) => {
  const { imageId, setImage } = useFeatureIntroControlInternalContext();

  const element = React.useMemo(
    () => (
      <div
        className={className}
        css={{ flexBasis: "50%" }}
        id={imageId || id}
        style={style}
      >
        {children}
      </div>
    ),
    [children, className, imageId, id, style],
  );

  React.useLayoutEffect(() => {
    setImage?.(element);
  }, [element, setImage]);

  return setImage ? null : element;
};
