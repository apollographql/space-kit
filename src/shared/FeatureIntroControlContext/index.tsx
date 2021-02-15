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
  heading: React.ReactNode;
  setHeading:
    | React.Dispatch<React.SetStateAction<FeatureIntroControl["heading"]>>
    | undefined;
  content: React.ReactNode;
  setContent:
    | React.Dispatch<React.SetStateAction<FeatureIntroControl["content"]>>
    | undefined;
  image: React.ReactNode;
  setImage:
    | React.Dispatch<React.SetStateAction<FeatureIntroControl["image"]>>
    | undefined;
  learnMoreLink: React.ReactNode;
  setLearnMoreLink:
    | React.Dispatch<React.SetStateAction<FeatureIntroControl["image"]>>
    | undefined;
  dismissButton: React.ReactNode;
  setDismissButton:
    | React.Dispatch<React.SetStateAction<FeatureIntroControl["image"]>>
    | undefined;
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

  const contextValue: FeatureIntroControl = React.useMemo(
    () => ({
      id,
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
    }),
    [content, dismissButton, heading, id, image, learnMoreLink],
  );
  return (
    <FeatureIntroControlContext.Provider value={contextValue}>
      {children}
    </FeatureIntroControlContext.Provider>
  );
};

/**
 * Internal hook to access Feature Intro control context
 */
export function useFeatureIntroControlInternalContext():
  | FeatureIntroControl
  | undefined {
  return React.useContext(FeatureIntroControlContext);
}
