import React, { ChangeEvent } from "react";
import { Button } from "../Button";
import { colors } from "../colors";
import { IconArrowDown } from "../icons/IconArrowDown";
import { List } from "../List";
import { ListItem } from "../ListItem";
import { ListHeading } from "../ListHeading";
import { ListDivider } from "../ListDivider";
import { Popover } from "../Popover";
import { useSelect, UseSelectPropGetters } from "downshift";
import { ClassNames } from "@emotion/core";
import {
  reactNodeToDownshiftItems,
  isHTMLOptionElement,
  isHTMLOptgroupElement,
} from "./select/reactNodeToDownshiftItems";
import { ListConfigProvider, useListConfig } from "../ListConfig";

export type OptionProps = Omit<
  React.DetailedHTMLProps<
    React.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  >,
  "children"
> & { children: string };
interface ListItemWrapperProps {
  /** `items` prop passed to `useSelect`
   *
   * We'll use this to get the index
   */
  downshiftItems: OptionProps[];
  element: React.ReactElement<OptionProps, "option">;
  /** Passthrough downshift function to get the props for an item */
  getItemProps: UseSelectPropGetters<OptionProps>["getItemProps"];
}

/**
 * Abstraction to handle rendering `ListItem`s with downshift props
 */
const ListItemWrapper: React.FC<ListItemWrapperProps> = ({
  downshiftItems,
  element,
  getItemProps,
}) => {
  const index = downshiftItems.indexOf(element.props);

  if (index === -1) {
    throw new Error(
      "Development error: props must be passed by reference in `reactNodeToDownshiftItems` so they can be found with `Array.prototype.indexOf`"
    );
  }

  const downshiftItemProps = getItemProps({
    item: element.props,
    index: downshiftItems.indexOf(element.props),
  });

  return (
    <ListItem
      key={element.props.value || element.props.children}
      {...downshiftItemProps}
      selected={downshiftItemProps["aria-selected"] === "true"}
    >
      {element.props.children}
    </ListItem>
  );
};

interface Props
  extends Pick<
      React.ComponentProps<typeof Popover>,
      | "disabled"
      | "maxWidth"
      | "placement"
      | "popperOptions"
      | "matchTriggerWidth"
    >,
    Pick<React.ComponentProps<typeof Button>, "className" | "feel" | "style">,
    Pick<
      React.DetailedHTMLProps<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
      >,
      "onChange" | "name" | "id"
    > {
  disabled?: boolean;
  label?: React.ReactElement;

  /**
   * Callback called when the selected item changes
   *
   * This will be called syncronously after you try to close the menu. If you
   * are running a long-running task, like fetching data or parseing something
   * as the result of this handler; you might want to wrap your callback in a
   * `setTimeout(... ,0)`.
   */
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;

  /**
   * Item currently selected
   *
   * While I believe it's also valid to use the `<option>`'s `selected` prop; we
   * are not using that here. We _might_ use that if we render a native `select`
   * element in the future.
   */
  value?: NonNullable<OptionProps["value"]> | null;

  /** Default value for a non-controlled component */
  defaultValue?: NonNullable<OptionProps["value"]> | null;

  size?: "auto" | "small" | "medium" | "extra large";
}

export const Select: React.FC<Props> = ({
  children,
  defaultValue,
  disabled = false,
  feel,
  label,
  matchTriggerWidth,
  onChange,
  placement = "bottom-start",
  popperOptions,
  size = "auto",
  value: valueProp,
  ...props
}) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    defaultValue
  );

  // Validate controlled versus uncontrolled
  if (
    (typeof onChange !== "undefined" || typeof valueProp !== "undefined") &&
    typeof defaultValue !== "undefined"
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      "Select component must be either controlled or uncontrolled. Pass either `defaultValue` for an uncontrolled component or `value` and optionally `onChange` for a controlled component."
    );
  }

  const value =
    typeof valueProp !== "undefined" ? valueProp : uncontrolledValue;

  /**
   * Reference to the underlying popper instance
   *
   * We'll use this to control the popover's visbility based on events captured
   * by downshift
   */
  const instanceRef = React.useRef<
    Parameters<NonNullable<React.ComponentProps<typeof Popover>["onCreate"]>>[0]
  >();

  const listConfig = useListConfig();

  /**
   * Items data represtented by the DOM structure in `children`
   */
  const items = reactNodeToDownshiftItems(children);

  const {
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    selectedItem,
    closeMenu,
  } = useSelect<OptionProps>({
    items,
    scrollIntoView(node) {
      // We have to defer this call until the popover has been created. I really
      // don't have a great explanation for this; but this works and I can't see
      // a downside because the extra complexity.
      setTimeout(() => {
        // It's silly to write code for our tests, but `scrollIntoView` doesn't
        // exist in JSDOM, so we have to make sure we don't call it on tests or
        // they'll break.
        node.scrollIntoView?.({
          behavior: "auto",
          block: "nearest",
          inline: "nearest",
        });
      }, 0);
    },
    selectedItem: items.find((item) => {
      return item.value ? item.value === value : item.children === value;
    }),
    onSelectedItemChange: (event) => {
      const newValue =
        event.selectedItem?.value?.toString() ??
        event.selectedItem?.children ??
        "";

      closeMenu();

      if (onChange) {
        // This is kind of hacky because there's no underlying `select` with
        // native events firing. Maybe we should create them and then fire
        // events?
        onChange(({ target: { value: newValue } } as unknown) as ChangeEvent<
          HTMLSelectElement
        >);
      } else {
        setUncontrolledValue(newValue);
      }
    },
    onIsOpenChange: (event) => {
      if (event.isOpen) {
        instanceRef.current?.show();
      } else {
        instanceRef.current?.hide();
      }
    },
  });

  return (
    <ListConfigProvider {...listConfig} hoverColor={null}>
      <ClassNames>
        {({ css, cx }) => (
          <Popover
            popperOptions={popperOptions}
            onCreate={(instance) => {
              instanceRef.current = instance;
            }}
            content={
              <List {...getMenuProps(undefined, { suppressRefError: true })}>
                {React.Children.toArray(children)
                  // Filter out falsy elements in `children`. We need to know if
                  // we're rendering the first actual element in `children` to
                  // know if we should add a divider or not. If the consumer uses
                  // conditional logic in their rendering then we could have
                  // `undefined` elements in `children`.
                  .filter(
                    (child): child is NonNullable<React.ReactNode> => !!child
                  )
                  .map((child, topLevelIndex) => {
                    if (isHTMLOptionElement(child)) {
                      return (
                        <ListItemWrapper
                          data-top-level-index={topLevelIndex}
                          downshiftItems={items}
                          element={child}
                          getItemProps={getItemProps}
                          key={
                            child.props.value
                              ? child.props.value.toString()
                              : child.props.children
                          }
                        />
                      );
                    } else if (isHTMLOptgroupElement(child)) {
                      return (
                        <React.Fragment key={child.props.label}>
                          {topLevelIndex > 0 && (
                            <ListDivider data-top-level-index={topLevelIndex} />
                          )}
                          <ListHeading
                            aria-label={child.props.label}
                            role="group"
                          >
                            {child.props.label}
                          </ListHeading>
                          {React.Children.map(
                            child.props.children as React.ReactElement<
                              OptionProps,
                              "option"
                            >[],
                            (optgroupChild) => {
                              return (
                                <ListItemWrapper
                                  key={
                                    optgroupChild.props.value
                                      ? optgroupChild.props.value.toString()
                                      : optgroupChild.props.children
                                  }
                                  downshiftItems={items}
                                  element={optgroupChild}
                                  getItemProps={getItemProps}
                                />
                              );
                            }
                          )}
                        </React.Fragment>
                      );
                    }

                    return null;
                  })}
              </List>
            }
            placement={placement}
            triggerEvents="manual"
            matchTriggerWidth={matchTriggerWidth}
            trigger={
              <Button
                {...props}
                {...getToggleButtonProps({ disabled })}
                className={cx(
                  css({
                    textAlign: "left",
                    maxWidth: {
                      auto: undefined,
                      small: 71,
                      medium: 110,
                      large: 157,
                      "extra large": 188,
                    }[size],
                  }),
                  props.className
                )}
                color={colors.white}
                feel={feel}
                type="button"
                size={
                  {
                    auto: "small",
                    small: "small",
                    medium: "small",
                    large: "small",
                    "extra large": "default",
                  }[size]
                }
                endIcon={
                  <IconArrowDown
                    className={css({ height: "70%" })}
                    weight="thin"
                  />
                }
              >
                {selectedItem?.children || label}
              </Button>
            }
          />
        )}
      </ClassNames>
    </ListConfigProvider>
  );
};
