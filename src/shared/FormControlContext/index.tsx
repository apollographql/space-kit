import * as React from "react";

/**
 * These items are expected to be passed to the context provider
 */
interface FormControlContextConfig {
  id?: string;
}

// All of these items are _required_, but can have values of `undefined`.
interface FormControl extends FormControlContextConfig {
  description: React.ReactNode | undefined;
  setDescription:
    | React.Dispatch<React.SetStateAction<FormControl["description"]>>
    | undefined;
  errorMessageElement: React.ReactNode | undefined;
  setErrorMessageElement:
    | React.Dispatch<React.SetStateAction<FormControl["errorMessageElement"]>>
    | undefined;
  endAdornment: React.ReactNode | undefined;
  setEndAdornment:
    | React.Dispatch<React.SetStateAction<FormControl["endAdornment"]>>
    | undefined;
  helper: React.ReactNode | undefined;
  setHelper:
    | React.Dispatch<React.SetStateAction<FormControl["helper"]>>
    | undefined;
  label: React.ReactNode | undefined;
  setLabel:
    | React.Dispatch<React.SetStateAction<FormControl["label"]>>
    | undefined;
  startAdornment: React.ReactNode | undefined;
  setStartAdornment:
    | React.Dispatch<React.SetStateAction<FormControl["startAdornment"]>>
    | undefined;
  labelId: string | undefined;
  descriptionId: string | undefined;
  feedbackId: string | undefined;
  helperTextId: string | undefined;
}

/**
 * Context holding all configuration options for lists
 */
const FormControlContext = React.createContext<FormControl | undefined>(
  undefined,
);

export const FormControlContextProvider: React.FC<FormControlContextConfig> = ({
  children,
  id,
}) => {
  const [endAdornment, setEndAdornment] = React.useState<React.ReactNode>();
  const [description, setDescription] = React.useState<React.ReactNode>();
  const [errorMessageElement, setErrorMessageElement] = React.useState<
    React.ReactNode
  >();
  const [helper, setHelper] = React.useState<React.ReactNode>();
  const [label, setLabel] = React.useState<React.ReactNode>();
  const [startAdornment, setStartAdornment] = React.useState<React.ReactNode>();

  return (
    <FormControlContext.Provider
      value={{
        id,
        labelId: id && `${id}-label`,
        descriptionId: id && `${id}-description`,
        feedbackId: id && `${id}-feedback`,
        helperTextId: id && `${id}-helptext`,
        description,
        setDescription,
        errorMessageElement,
        setErrorMessageElement,
        endAdornment,
        setEndAdornment,
        helper,
        setHelper,
        label,
        setLabel,
        startAdornment,
        setStartAdornment,
      }}
    >
      {children}
    </FormControlContext.Provider>
  );
};

/**
 * Internal hook to access form control context
 */
export function useFormControlInternalContext(): FormControl {
  const {
    id,
    description,
    setDescription,
    errorMessageElement,
    setErrorMessageElement,
    endAdornment,
    setEndAdornment,
    setStartAdornment,
    startAdornment,
    setHelper,
    helper,
    label,
    setLabel,
    labelId,
    descriptionId,
    feedbackId,
    helperTextId,
  } = React.useContext(FormControlContext) || {};

  return React.useMemo(
    () => ({
      id,
      description,
      setDescription,
      errorMessageElement,
      setErrorMessageElement,
      endAdornment,
      setEndAdornment,
      setStartAdornment,
      startAdornment,
      setHelper,
      helper,
      label,
      setLabel,
      labelId,
      descriptionId,
      feedbackId,
      helperTextId,
    }),
    [
      id,
      description,
      setDescription,
      errorMessageElement,
      setErrorMessageElement,
      endAdornment,
      setEndAdornment,
      setStartAdornment,
      startAdornment,
      setHelper,
      helper,
      label,
      setLabel,
      labelId,
      descriptionId,
      feedbackId,
      helperTextId,
    ],
  );
}

/**
 * Hook intended to provide `FormControl` props to form components
 */
export function useFormControlContext(): {
  describedBy: string | undefined;
  hasError: boolean;
  labelledBy: string | undefined;
} & Pick<FormControl, "endAdornment" | "id" | "startAdornment"> {
  const {
    description,
    descriptionId,
    endAdornment,
    errorMessageElement,
    feedbackId,
    helper,
    helperTextId,
    id,
    labelId,
    startAdornment,
  } = useFormControlInternalContext();

  return React.useMemo(
    () => ({
      describedBy:
        [
          !!description && descriptionId,
          !!errorMessageElement && feedbackId,
          !errorMessageElement && helper && helperTextId,
        ]
          .filter((text): text is string => !!text)
          .join(" ") || undefined,
      endAdornment,
      hasError: !!errorMessageElement,
      id,
      labelledBy: labelId || undefined,
      startAdornment,
    }),
    [
      description,
      descriptionId,
      endAdornment,
      errorMessageElement,
      feedbackId,
      helper,
      helperTextId,
      id,
      labelId,
      startAdornment,
    ],
  );
}
