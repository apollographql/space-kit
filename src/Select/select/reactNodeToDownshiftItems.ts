import React from "react";
import { render } from "react-dom";
import { ListItem } from "../../ListItem";

type OptionProps = React.DetailedHTMLProps<
  React.OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
>;

type OptgroupProps = React.DetailedHTMLProps<
  React.OptgroupHTMLAttributes<HTMLOptGroupElement>,
  HTMLOptGroupElement
>;

export function isHTMLOptionElement(
  element: React.ReactNode
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

  if (typeof (element.type as any)?.displayName === "string") {
    return (element.type as any).displayName === "option";
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
  element: React.ReactNode
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

  if (typeof (element.type as any)?.displayName === "string") {
    return (element.type as any).displayName === "optgroup";
  }

  return renderHTML(element) instanceof HTMLOptGroupElement;
}

export function isListItem(
  element: React.ReactNode
): element is React.ReactElement<
  React.ComponentProps<typeof ListItem>,
  "ListItem"
> {
  if (!React.isValidElement(element)) {
    return false;
  }

  // This is a special check performed only for MDX processing in storybook
  if (typeof element.props.originalType === "string") {
    return element.props.originalType === "ListItem";
  } else if (typeof element.props.mdxType === "string") {
    return element.props.mdxType === "ListItem";
  }

  if (typeof element.type === "string") {
    return element.type === "ListItem";
  }

  return (element.type as any)?.displayName === "ListItem";
}

/**
 * Convert a `children` prop rendered with `<optgroup><option /></optgroup>` and
 * `<option />` elements into an array of the props of each of those `option`
 * elements.
 */
export function reactNodeToDownshiftItems(
  children: React.ReactNode
): Array<OptionProps | React.ComponentProps<typeof ListItem>> {
  return React.Children.toArray(children).reduce<
    Array<OptionProps | React.ComponentProps<typeof ListItem>>
  >((accumulator, child) => {
    if (isListItem(child)) {
      return accumulator.concat(child.props);
    }

    if (isHTMLOptionElement(child)) {
      return accumulator.concat(child.props);
    }

    if (!React.isValidElement(child)) {
      return accumulator;
    }

    return accumulator.concat(
      React.Children.toArray(child.props.children)
        .filter(
          (
            element
          ): element is
            | React.ReactElement<OptionProps, "option">
            | React.ReactElement<
                React.ComponentProps<typeof ListItem>,
                "ListItem"
              > =>
            React.isValidElement(element) &&
            (isHTMLOptionElement(element) || isListItem(element))
        )
        .map((optgroupChild) => optgroupChild.props)
    );
  }, []);
}
