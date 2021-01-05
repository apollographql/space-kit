type OptionProps = React.DetailedHTMLProps<
  React.OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
>;

/**
 * Return the effective `value` of an `option` element
 *
 * If the `value` prop is found; then it will be stringified and returned.
 *
 * If there is no `value` prop and `children` is stringifiable (it's a `string`,
 * `number`, or `null`), then return the stringiifed `children`. We
 * intentionally exclude `undefined` here to prevent accidents.
 *
 * Otherwise throw an error.
 */
export function getEffectiveValueFromOptionElementProps(
  props: OptionProps,
): string {
  if (Object.prototype.hasOwnProperty.call(props, "value")) {
    return String(props.value);
  }

  if (
    typeof props.children === "string" ||
    typeof props.children === "number" ||
    props.children == null
  ) {
    return String(props.children);
  }

  throw new TypeError(
    "All `option` children of `Select` are expected to have either a `value` prop or a `children` prop that is can be interpreted as a `string`",
  );
}
