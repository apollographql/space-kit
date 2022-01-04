/** @jsx jsx */
/** @jsxFrag React.Fragment */
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
import { ClassNames, jsx } from "@emotion/core";
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
import { getEffectiveValueFromOptionElementProps } from "./select/getEffectiveValueFromOptionElementProps";
import { IconCheck } from "../icons/IconCheck";

export type OptionProps = React.DetailedHTMLProps<
  React.OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
>;

// This is defined in it's own interface so that both interfaces that will use
// it can `extend` this interface, therefore automatically including the jsdoc
// in both types.
interface RenderListItemProps {
  /**
   * Custom function to render each `ListItem`
   *
   * This is provided so you can render the `ListItem` on your own, with an `as`
   * prop, for example, so you can render a `Link`. 
   *
   * The function will be called and it's return value rendered; this does not
   * use `React.createElement`, so an inline function is totally acceptable with
   * no performance penalty.
   *
   * @default `(props) => <ListItem {...props} />`
   *
   *
   * @param props - Props that were going to be passed to the underlying
   *`ListItem`. You must merge this with whatever you are going to render.

   * @param optionElement - The `option` element that is going to be parsed and
   * rendered as a `ListItem`.
   *
   * You can use this to get the props you passed to the `option` element so you
   * can customize behavior. For example, you can use this to extract the
   * `option`'s `value` prop and generate a custom URL with `Link` element.
   */
  renderListItem: (
    props: React.ComponentProps<typeof ListItem>,
    optionElement: React.ReactElement<
      React.DetailedHTMLProps<
        React.OptionHTMLAttributes<HTMLOptionElement>,
        HTMLOptionElement
      >,
      "option"
    >,
  ) => React.ReactElement<React.ComponentProps<typeof ListItem>>;
}

interface ListItemWrapperProps
  extends Pick<Props, "selectionIndicator">,
    RenderListItemProps {
  /** `items` prop passed to `useSelect`
   *
   * We'll use this to get the index
   */
  downshiftItems: OptionProps[];
  element: React.ReactElement<OptionProps, "option">;
  /** Passthrough downshift function to get the props for an item */
  getItemProps: UseSelectPropGetters<OptionProps>["getItemProps"];
  selected: boolean;
  className?: string;
}

/**
 * Abstraction to handle rendering `ListItem`s with downshift props
 */
const ListItemWrapper: React.FC<ListItemWrapperProps> = ({
  downshiftItems,
  element,
  getItemProps,
  renderListItem,
  selected,
  selectionIndicator,
  className,
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
    disabled: element.props.disabled,
  });

  return (
    <ClassNames>
      {({ css, cx }) => {
        return renderListItem(
          {
            className: cx(css({ alignItems: "baseline" }), className),
            key: element.props.value || element.props.children,
            ...downshiftItemProps,
            highlighted: downshiftItemProps["aria-selected"] === "true",
            selected,
            startIcon:
              selectionIndicator === "checkmark" ? (
                selected ? (
                  <IconCheck css={{ height: "100%", width: "100%" }} />
                ) : null
              ) : undefined,
            children: element.props.children,
          },
          element,
        );
      }}
    </ClassNames>
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
      "aria-labelledby" | "aria-describedby" | "feel" | "style" | "color"
    >,
    Pick<
      React.ComponentProps<typeof ListConfigProvider>,
      "margin" | "truncate"
    >,
    Pick<
      React.DetailedHTMLProps<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
      >,
      "onBlur" | "onChange" | "name"
    >,
    Partial<RenderListItemProps> {
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

  /**
   * Indicates decoration for the selected item
   *
   * Note, this is for an item that is selected; _not_ the item that is
   * highlighted.
   *
   * Options:
   *
   * * `checkmark` will place a checkmark to the left
   */
  selectionIndicator?: "checkmark" | null;

  size?: keyof typeof inputHeightDictionary;
}

export const Select: React.FC<Props> = ({
  children,
  className,
  defaultValue,
  disabled = false,
  feel,
  color = colors.white,
  labelPropsCallbackRef,
  listAs = <List startIconAs={<div css={{ alignSelf: "baseline" }} />} />,
  margin = "auto",
  matchTriggerWidth,
  onBlur,
  onChange,
  placement = "bottom-start",
  popperOptions,
  renderListItem = (props) => <ListItem {...props} />,
  renderTriggerNode = (value) => <>{value?.children || ""}</>,
  selectionIndicator = null,
  size = "standard",
  triggerAs = <Button />,
  truncate = true,
  value: valueProp,
  maxWidth,
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
    stateReducer(state, actionAndChanges) {
      switch (actionAndChanges.type) {
        case useSelect.stateChangeTypes.MenuMouseLeave:
        case useSelect.stateChangeTypes.MenuBlur: {
          /**
           * Indicates if the element that we "blur"'ed to is a descendent of
           * the tooltip. If it is, then we should bypass the closing behavior.
           */
          const popperContainsActiveElement = !!instanceRef.current?.popper?.contains(
            document.activeElement,
          );

          return {
            ...actionAndChanges.changes,
            isOpen: popperContainsActiveElement,
          };
        }
        default:
          return actionAndChanges.changes;
      }
    },
    onStateChange(changes) {
      switch (changes.type) {
        case useSelect.stateChangeTypes.MenuMouseLeave:
        case useSelect.stateChangeTypes.MenuBlur: {
          /**
           * Indicates if the element that we "blur"'ed to is a descendent of
           * the tooltip. If it is, then we should bypass the closing behavior.
           */
          const popperContainsActiveElement = !!instanceRef.current?.popper?.contains(
            document.activeElement,
          );

          if (!popperContainsActiveElement) blur();
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
      const newValue = event.selectedItem
        ? getEffectiveValueFromOptionElementProps(event.selectedItem)
        : "";

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
    <ListConfigProvider {...listConfig} iconSize="small">
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
                margin,
                truncate,
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
                        className={child.props.className}
                        data-top-level-index={topLevelIndex}
                        downshiftItems={items}
                        element={child}
                        getItemProps={getItemProps}
                        renderListItem={renderListItem}
                        selected={selectedItem === child.props}
                        selectionIndicator={selectionIndicator}
                        key={getEffectiveValueFromOptionElementProps(
                          child.props,
                        )}
                      />
                    );
                  } else if (isHTMLOptgroupElement(child)) {
                    return (
                      <React.Fragment key={child.props.label}>
                        {topLevelIndex > 0 && (
                          <ListDivider data-top-level-index={topLevelIndex} />
                        )}
                        {child.props.label && (
                          <ListHeading
                            aria-label={child.props.label}
                            role="group"
                          >
                            {child.props.label}
                          </ListHeading>
                        )}
                        {React.Children.map(
                          child.props.children as React.ReactElement<
                            OptionProps,
                            "option"
                          >[],
                          (optgroupChild) => {
                            return (
                              <ListItemWrapper
                                key={getEffectiveValueFromOptionElementProps(
                                  optgroupChild.props,
                                )}
                                downshiftItems={items}
                                element={optgroupChild}
                                getItemProps={getItemProps}
                                renderListItem={renderListItem}
                                selectionIndicator={selectionIndicator}
                                selected={selectedItem === optgroupChild.props}
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
            hideOnClick={false}
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
                color,
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
            maxWidth={maxWidth}
          />
        )}
      </ClassNames>
    </ListConfigProvider>
  );
};
