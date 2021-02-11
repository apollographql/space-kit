/** @jsx jsx */
import React, { useMemo } from "react";
import { colors } from "../colors";
import { ClassNames, jsx } from "@emotion/core";
import { As, createElementFromAs } from "../shared/createElementFromAs";
import {
  FeatureIntroControlContextProvider,
  useFeatureIntroControlInternalContext,
} from "../shared/FeatureIntroControlContext";
import uniqueId from "lodash/uniqueId";

/**
 * The direction of either the tooltip coming from the wizard
 * or the image associated with the wizard.
 *
 */
export type Direction = "top" | "bottom" | "left" | "right";

interface FeatureIntroControlProps
  extends Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "className" | "style"
  > {
  /**
   * The placement of the image relative to the text.
   */
  imagePlacement?: Direction;
  /**
   * Override how the outermost container is rendered.
   *
   * @default "div"
   */
  containerAs?: As;
  /**
   * Override how the learn more link is rendered.
   *
   * @default "a"
   */
  learnMoreLinkAs?: As;
  /**
   * This ID will be used to tie all components together with accessibility
   */
  id?: string;
  /**
   * Override the default width
   */
  width?: string;
  /**
   * Override the default height
   */
  height?: string;
}

const FeatureIntroControl: React.FC<FeatureIntroControlProps> = ({
  imagePlacement = "left",
  width,
  height,
  className,
  containerAs = "div",
  learnMoreLinkAs = "a",
  children,
  ...props
}) => {
  const featureIntroContext = useFeatureIntroControlInternalContext();
  const [heading, content, dismissButton, learnMoreLink, image] = [
    featureIntroContext?.heading,
    featureIntroContext?.content,
    featureIntroContext?.dismissButton,
    featureIntroContext?.learnMoreLink,
    featureIntroContext?.image,
  ];

  /**
   * Choose flex-direction based on imageDirection
   */
  const flexDirection = useMemo(() => {
    switch (imagePlacement) {
      case "bottom":
        return "column-reverse";
      case "top":
        return "column";
      case "right":
        return "row-reverse";
      default:
        // left
        return "row";
    }
  }, [imagePlacement]);

  /**
   * The width and height calculations for this component depend on whether or not there is an image,
   * and whether or not there was a prop passed for width & height.
   *
   * By default, if an image is added the width / height is doubled respectively
   * depending on whether the image direction is horizontal (left / right) or vertical(top / bottom)
   *
   * If a width or height is inputted, that height / width is not changed with an image
   **/
  const { finalWidth, finalHeight } = useMemo(() => {
    const [baseWidth, baseHeight] = [248, 180];
    const horizontalImage =
      image && (imagePlacement === "right" || imagePlacement === "left");
    const verticalImage =
      image && (imagePlacement === "top" || imagePlacement === "bottom");
    const defaultWidth = horizontalImage ? baseWidth * 2 : baseWidth;
    const defaultHeight = verticalImage ? baseHeight * 2 : baseHeight;

    return {
      finalWidth: width || defaultWidth,
      finalHeight: height || defaultHeight,
    };
  }, [height, image, imagePlacement, width]);

  return (
    <ClassNames>
      {({ css, cx }) => {
        return React.cloneElement(
          createElementFromAs(containerAs),
          {
            ...props,
            className: cx(
              css({
                width: finalWidth,
                height: finalHeight,
              }),
              className,
              React.isValidElement(containerAs) && containerAs.props.className,
            ),
            style: {
              ...props.style,
              ...(React.isValidElement(containerAs) && containerAs.props.style),
            },
          },
          <div
            css={{
              backgroundColor: colors.white,
              color: colors.grey.darker,
              borderColor: colors.white,
              borderRadius: 4,
              display: "flex",
              flexDirection,
              height: finalHeight,
            }}
          >
            {image}
            <div
              css={{
                padding: 24,
                paddingBottom: 20,
                flexBasis: image ? "50%" : "auto",
              }}
            >
              <div css={{ paddingBottom: 12 }}>{heading}</div>
              {content}
              <div
                css={css({
                  paddingTop: 16,
                  display: "flex",
                  justifyContent: "space-between",
                })}
              >
                {React.isValidElement(learnMoreLink) &&
                  React.cloneElement(createElementFromAs(learnMoreLinkAs), {
                    ...learnMoreLink.props,
                  })}
                {dismissButton}
                {children}
              </div>
            </div>
          </div>,
        );
      }}
    </ClassNames>
  );
};

const FeatureIntroControlWrapper: React.FC<React.ComponentProps<
  typeof FeatureIntroControl
>> = (props) => {
  /**
   * Backup ID to be used if none are passed in props.
   *
   * Use `useMemo` so this is consistent for the lifecycle of this element.
   */
  const fallbackId = useMemo(
    () => uniqueId("space-kit-feature-intro-control-"),
    [],
  );
  const id = props.id ?? fallbackId;

  return (
    <FeatureIntroControlContextProvider id={id}>
      <FeatureIntroControl {...props} id={id} />
    </FeatureIntroControlContextProvider>
  );
};

export { FeatureIntroControlWrapper as FeatureIntroControl };
