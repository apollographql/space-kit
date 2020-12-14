import React, { ChangeEvent, FocusEvent, RefCallback } from "react";
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
import { As, createElementFromAs } from "../shared/createElementFromAs";
import useDeepCompareEffect from "use-deep-compare-effect";
import { inputHeightDictionary } from "../shared/inputHeightDictionary";
import { useFormControlContext } from "../FormControl";

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
      "Development error: props must be passed by reference in `reactNodeToDownshiftItems` so they can be found with `Array.prototype.indexOf`",
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
    Pick<
      React.ComponentProps<typeof Button>,
      "aria-labelledby" | "aria-describedby" | "feel" | "style"
    >,
    Pick<
      React.DetailedHTMLProps<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
      >,
      "onBlur" | "onChange" | "name"
    > {
  /**
   * class name to apply to the trigger component
   */
  className?: string;
  /**
   * `RefCallback` for props that should be spread onto a `label` component
   * associated with this `Select`.
   *
   * The value will be calculated internally by `downshift`; so get the value
   * and call this callback. This callback will only be called when the values
   * change by a deep comparission (via
   * [`use-deep-compare-effect`](https://github.com/kentcdodds/use-deep-compare-effect));
   * not by `Object.is`. Therefore it's safe to save this entire value in state
   * and spread it onto a label without fear of more than one re-render.
   *
   * Example:
   *
   * ```
   * import * as React from 'react';
   *
   * export const SelectWithLabel: React.FC = () => {
   *   const [labelProps, setLabelProps] = React.useState();
   *
   *   return (
   *     <React.Fragment>
   *       <label {...labelProps}>select label</label>
   *       <Select
   *         labelPropsCallbackRef={setLabelProps}
   *         ...
   *       >
   *          ...
   *       </Select>
   *     </React.Fragment>
   *   );
   * }
   * ```
   */
  labelPropsCallbackRef?: RefCallback<
    ReturnType<UseSelectPropGetters<OptionProps>["getLabelProps"]>
  >;
  /**
   * ID is an optional field used to formulaicly add accessability props as
   * follows:
   *
   * - The trigger button will be given the this `id`
   * - The list will be given ```${id}-menu```
   *
   * If this field is not included or is `undefined`, the automatic downshift
   * props will be used.
   *
   * The list and trigger button will also be assigned the value of
   * `aria-labelledby`
   */
  id?: string | undefined;

  /**
   * Used to override how the underlying `List` is rendered
   *
   * This is useful when need to customize the list behavior
   *
   * @default <List />
   */
  listAs?: React.ReactElement<React.ComponentProps<typeof List>>;

  /**
   * Render prop function to generate a `React.ReactNode` based on the currently
   * selected value.
   *
   * This is useful when you want some custom behavior with what is shown in the
   * select in the unopened state.
   */
  renderTriggerNode?: (value: OptionProps | null) => React.ReactNode;

  triggerAs?: As;

  /**
   * Item currently selected
   *
   * While I believe it's also valid to use the `<option>`'s `selected` prop; we
   * are not using that here. We _might_ use that if we render a native `select`
   * element in the future.
   */
  value?: NonNullable<OptionProps["value"]> | null;

  /** Initial value for a non-controlled component */
  defaultValue?: NonNullable<OptionProps["value"]> | null;

  size?: keyof typeof inputHeightDictionary;
}

export const Select: React.FC<Props> = ({
  children,
  className,
  defaultValue,
  disabled = false,
  feel,
  labelPropsCallbackRef,
  listAs = <List />,
  matchTriggerWidth,
  onBlur,
  onChange,
  placement = "bottom-start",
  popperOptions,
  renderTriggerNode = (value) => <>{value?.children || ""}</>,
  size = "standard",
  triggerAs = <Button />,
  value: valueProp,
  ...props
}) => {
  const {
    describedBy: formControlDescribedBy,
    hasError,
    id: formControlId,
    labelledBy: formControlLabelledBy,
  } = useFormControlContext();

  const id = props.id ?? formControlId;
  const describedBy = props["aria-describedby"] ?? formControlDescribedBy;
  const labelledBy = props["aria-labelledby"] ?? formControlLabelledBy;

  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    defaultValue ?? "",
  );

  // Validate controlled versus uncontrolled
  if (
    (typeof onChange !== "undefined" || typeof valueProp !== "undefined") &&
    typeof defaultValue !== "undefined"
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      "Select component must be either controlled or uncontrolled. Pass either `defaultValue` for an uncontrolled component or `value` and optionally `onChange` for a controlled component.",
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

  /**
   * Ref stored for a timeout that's initiated after a `ToggleButtonClick` state
   * change. It'll automatically clear itself after the timeout. Use this ref
   * containing a value to mean that there was a `ToggleButtonClick` state
   * change in the last tick.
   */
  const toggleButtonClickTimeout = React.useRef<number | undefined>();

  /**
   * Wrapper to call `onBlur`
   *
   * Will attempt to simulate a real event.
   */
  const blur = () => {
    const target = { ...props, value };

    onBlur?.(({
      type: "blur",
      currentTarget: target,
      target,
    } as unknown) as FocusEvent<HTMLSelectElement>);
  };

  const {
    getLabelProps,
    getItemProps,
    getMenuProps,
    getToggleButtonProps,
    selectedItem,
  } = useSelect<OptionProps>({
    onStateChange(changes) {
      switch (changes.type) {
        case useSelect.stateChangeTypes.MenuBlur: {
          blur();
          break;
        }
        case useSelect.stateChangeTypes.ToggleButtonClick:
          window.clearTimeout(toggleButtonClickTimeout.current);
          toggleButtonClickTimeout.current = window.setTimeout(() => {
            toggleButtonClickTimeout.current = undefined;
          }, 0);
          break;
      }
    },
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
    selectedItem:
      items.find((item) => {
        return value === (item.value ?? item.children);
      }) ?? null,
    onSelectedItemChange: (event) => {
      const newValue =
        event.selectedItem?.value?.toString() ??
        event.selectedItem?.children ??
        "";

      if (onChange) {
        // This is kind of hacky because there's no underlying `select` with
        // native events firing. Maybe we should create them and then fire
        // events?
        const target = { ...props, value: newValue };

        onChange(({
          currentTarget: target,
          target,
        } as unknown) as ChangeEvent<HTMLSelectElement>);
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

  // Get the label's props and call the callback ref when they change.
  const labelProps = getLabelProps();
  useDeepCompareEffect(() => {
    labelPropsCallbackRef?.(labelProps);
  }, [labelProps, labelPropsCallbackRef]);

  return (
    <ListConfigProvider {...listConfig} hoverColor={null}>
      <ClassNames>
        {({ css, cx }) => (
          <Popover
            popperOptions={popperOptions}
            onCreate={(instance) => {
              instanceRef.current = instance;
            }}
            content={React.cloneElement(
              listAs,
              {
                ...getMenuProps(undefined, { suppressRefError: true }),
                ...(id && { id: `${id}-menu` }),
                "aria-labelledby": labelledBy,
                "aria-describedby": describedBy,
              },
              React.Children.toArray(children)
                // Filter out falsy elements in `children`. We need to know if
                // we're rendering the first actual element in `children` to
                // know if we should add a divider or not. If the consumer uses
                // conditional logic in their rendering then we could have
                // `undefined` elements in `children`.
                .filter(
                  (child): child is NonNullable<React.ReactNode> => !!child,
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
                          },
                        )}
                      </React.Fragment>
                    );
                  }

                  return null;
                }),
            )}
            placement={placement}
            triggerEvents="manual"
            matchTriggerWidth={matchTriggerWidth}
            trigger={React.cloneElement(
              createElementFromAs(triggerAs),
              {
                ...getToggleButtonProps({ disabled }),
                ...props,
                ...(labelledBy && { "aria-labelledby": labelledBy }),
                id,
                className: cx(
                  css({
                    border: hasError
                      ? `1px solid ${colors.red.base}`
                      : undefined,
                    textAlign: "left",
                  }),
                  className,
                  React.isValidElement(triggerAs) &&
                    (triggerAs.props as any).className,
                ),
                color: colors.white,
                feel,
                onBlur() {
                  if (toggleButtonClickTimeout.current) {
                    // There was a `ToggleButtonClick` state change in the last
                    // tick, so ignore this blur call.
                    return;
                  }

                  blur();
                },
                type: "button",
                size,

                endIcon: (
                  <IconArrowDown
                    className={css({ height: "70%" })}
                    weight="thin"
                  />
                ),
              },
              <div
                className={css({
                  flex: 1,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                })}
              >
                {renderTriggerNode(selectedItem)}
              </div>,
            )}
          />
        )}
      </ClassNames>
    </ListConfigProvider>
  );
};
