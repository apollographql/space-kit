import * as React from "react";

/**
 * These items are expected to be passed to the context provider
 */
interface FeatureIntroControlContextConfig {
  id?: string;
}

/**
 * Required: dismiss, heading, content
 */
interface FeatureIntroControl extends FeatureIntroControlContextConfig {
  heading: React.ReactNode | undefined;
  setHeading:
    | React.Dispatch<React.SetStateAction<FeatureIntroControl["heading"]>>
    | undefined;
  content: React.ReactNode | undefined;
  setContent:
    | React.Dispatch<React.SetStateAction<FeatureIntroControl["content"]>>
    | undefined;
  image: React.ReactNode | undefined;
  setImage:
    | React.Dispatch<React.SetStateAction<FeatureIntroControl["image"]>>
    | undefined;
  learnMoreLink: React.ReactNode | undefined;
  setLearnMoreLink:
    | React.Dispatch<React.SetStateAction<FeatureIntroControl["image"]>>
    | undefined;
  dismissButton: React.ReactNode | undefined;
  setDismissButton:
    | React.Dispatch<React.SetStateAction<FeatureIntroControl["image"]>>
    | undefined;
  headingId: string | undefined;
  contentId: string | undefined;
  imageId: string | undefined;
  learnMoreLinkId: string | undefined;
  dismissButtonId: string | undefined;
}

/**
 * Context holding all configuration options for feature intro
 */
const FeatureIntroControlContext = React.createContext<
  FeatureIntroControl | undefined
>(undefined);

export const FeatureIntroControlContextProvider: React.FC<FeatureIntroControlContextConfig> = ({
  children,
  id,
}) => {
  const [content, setContent] = React.useState<React.ReactNode>();
  const [heading, setHeading] = React.useState<React.ReactNode>();
  const [image, setImage] = React.useState<React.ReactNode>();
  const [learnMoreLink, setLearnMoreLink] = React.useState<React.ReactNode>();
  const [dismissButton, setDismissButton] = React.useState<React.ReactNode>();

  return (
    <FeatureIntroControlContext.Provider
      value={{
        id,
        contentId: id && `${id}-content`,
        headingId: id && `${id}-heading`,
        imageId: id && `${id}-image`,
        learnMoreLinkId: id && `${id}-learn-more-link`,
        dismissButtonId: id && `${id}-dismiss-button`,
        content,
        setContent,
        heading,
        setHeading,
        image,
        setImage,
        learnMoreLink,
        setLearnMoreLink,
        dismissButton,
        setDismissButton,
      }}
    >
      {children}
    </FeatureIntroControlContext.Provider>
  );
};

/**
 * Internal hook to access Feature Intro control context
 */
export function useFeatureIntroControlInternalContext(): FeatureIntroControl {
  const {
    id,
    heading,
    setHeading,
    content,
    setContent,
    image,
    setImage,
    learnMoreLink,
    setLearnMoreLink,
    dismissButton,
    setDismissButton,
    headingId,
    contentId,
    imageId,
    learnMoreLinkId,
    dismissButtonId,
  } = React.useContext(FeatureIntroControlContext) || {};

  return React.useMemo(
    () => ({
      id,
      heading,
      setHeading,
      content,
      setContent,
      image,
      setImage,
      learnMoreLink,
      setLearnMoreLink,
      dismissButton,
      setDismissButton,
      headingId,
      contentId,
      imageId,
      learnMoreLinkId,
      dismissButtonId,
    }),
    [
      id,
      heading,
      setHeading,
      content,
      setContent,
      image,
      setImage,
      learnMoreLink,
      setLearnMoreLink,
      dismissButton,
      setDismissButton,
      headingId,
      contentId,
      imageId,
      learnMoreLinkId,
      dismissButtonId,
    ],
  );
}
