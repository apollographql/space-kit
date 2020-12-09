import React from "react";
import { render } from "react-dom";

type OptionProps = Omit<
  React.DetailedHTMLProps<
    React.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  >,
  "children"
> & { children: string };

type OptgroupProps = React.DetailedHTMLProps<
  React.OptgroupHTMLAttributes<HTMLOptGroupElement>,
  HTMLOptGroupElement
>;

export function isHTMLOptionElement(
  element: React.ReactNode,
): element is React.ReactElement<OptionProps, "option"> {
  if (!React.isValidElement(element)) {
    return false;
  }

  // This is a special check performed only for MDX processing in storybook
  if (element.props.originalType) {
    return element.props.originalType === "option";
  }

  if (typeof element.type === "string") {
    return element.type === "option";
  }

  return renderHTML(element) instanceof HTMLOptionElement;
}

function renderHTML(element: React.ReactElement) {
  const div = document.createElement("div");
  render(element, div);

  if (div.childNodes.length !== 1) {
    throw new Error("BUG: must only have one child");
  }
  return div.childNodes[0];
}

export function isHTMLOptgroupElement(
  element: React.ReactNode,
): element is React.ReactElement<OptgroupProps, "optgroup"> {
  if (!React.isValidElement(element)) {
    return false;
  }

  // This is a special check performed only for MDX processing in storybook
  if (element.props.originalType) {
    return element.props.originalType === "optgroup";
  }

  if (typeof element.type === "string") {
    return element.type === "optgroup";
  }

  return renderHTML(element) instanceof HTMLOptGroupElement;
}

/**
 * Convert a `children` prop rendered with `<optgroup><option /></optgroup>` and
 * `<option />` elements into an array of the props of each of those `option`
 * elements.
 */
export function reactNodeToDownshiftItems(
  children: React.ReactNode,
): OptionProps[] {
  return React.Children.toArray(children).reduce<OptionProps[]>(
    (accumulator, child) => {
      if (isHTMLOptionElement(child)) {
        return accumulator.concat(child.props);
      }

      if (!React.isValidElement(child)) {
        return accumulator;
      }

      return accumulator.concat(
        React.Children.toArray(child.props.children)
          .filter(isHTMLOptionElement)
          .map((optgroupChild) => optgroupChild.props),
      );
    },
    [],
  );
}
