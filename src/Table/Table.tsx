import { ClassNames } from "@emotion/react";
import React from "react";
import * as typography from "../typography";
import { colors } from "../colors";
import { assertUnreachable } from "../shared/assertUnreachable";

type As = React.ReactElement | keyof JSX.IntrinsicElements;

/**
 * Take an `as` value and make it into a `React.ReactElement`
 */
function createElementFromAs(as: As): React.ReactElement {
  return React.isValidElement(as)
    ? as
    : typeof as === "string"
    ? React.createElement(as)
    : assertUnreachable(as);
}

interface Props<RowShape> {
  /**
   * Component data
   *
   * The shape of the data will be inferred from here
   */
  data: ReadonlyArray<RowShape>;

  /**
   * How dense the table should be
   *
   * @default "standard"
   */
  density?: "standard" | "condensed" | "relaxed";

  /**
   * Definition of how each column will be rendered
   */
  columns: readonly {
    /**
     * Override the the default element
     *
     * All props provided will be merged with props that this component adds,
     * including `className`s being merged using emotion's `cx` function
     *
     * @default "td"
     */
    as?: As;

    /**
     * Column's title
     */
    headerTitle?: React.ReactNode | string;

    /**
     * Unique identifier for the column
     *
     * Initially, we'll just be using this for the `key` attribute on cells and
     * `col`s
     */
    id: string | number;
    /**
     * Properties to be applied to `col` elements nested below the `table`'s
     * single `<colgroup>`.
     *
     * This allows you to apply styles to columns by setting a class on a single
     * element instead of _all_ elements in a table's row.
     *
     * Note that, per the [column
     * spec](https://www.w3.org/TR/CSS2/tables.html#columns), there is a very
     * limited set of style properties that can be applied to a column (via
     * `style` or `className`):
     * * `background`
     * * `border`
     * * `visiblity`
     * * `width`
     */
    colProps?: React.DetailedHTMLProps<
      React.ColHTMLAttributes<HTMLTableColElement>,
      HTMLTableColElement
    >;

    /**
     * Render function that renders the content for the column to be placed
     * inside the `<td>`
     *
     * Since this is a render function, `React.createElement` will _not_ be
     * called, nor will propTypes be checked. This is to prevent mounting and
     * unmounting on each render
     *
     * Note: the signature of the method is the same as a `map` function
     */
    render: (
      input: Readonly<RowShape>,
      index: number,
      list: readonly RowShape[],
    ) => React.ReactNode;

    /**
     * Override the the default `th` element
     *
     * All props provided will be merged with props that this component adds,
     * including `className`s being merged using emotion's `cx` function
     *
     * @default "th"
     */
    thAs?: As;
  }[];

  /**
   * String or method to calculate the `key` for each row
   *
   * When re-ordering rows (by sorting or any other means), this will ensure
   * that DOM elements are reused correctly.
   *
   * Can be a string representing a field in `RowData` (inferred from `data` or
   * included as a generic to `<Table<RowData>>`) or a function that takes the
   * row data and returns a key
   */
  keyOn: keyof RowShape | ((row: RowShape) => any);

  /**
   * Override the the default element used to render `tr` elements
   *
   * You can pass a single value that will be applied to both the `thead > tr`
   * and `tbody> tr` or you can individiaully specify `head` and `body` values,
   * both of which are optional.
   *
   * All props provided will be merged with props that this component adds,
   * including `className`s being merged using emotion's `cx` function
   *
   * @default "tr"
   */
  trAs?:
    | As
    | {
        head?: As;
        body?: As;
      };
}

/**
 * Tables provide a structure to data and a visual grid making it easier to see
 * relationships and are one of the most useful tools and formats for organizing
 * and communiting structured data.
 *
 * @see https://zpl.io/bAlrjJe
 */
export function Table<RowShape>({
  data,
  density = "standard",
  columns,
  keyOn,
  trAs = "tr",
}: Props<RowShape>): ReturnType<React.FC> {
  const padding = density === "standard" ? 8 : density === "condensed" ? 3 : 11;
  const getRowKey =
    typeof keyOn === "function" ? keyOn : (row: RowShape) => row[keyOn];

  const headTrElement = React.isValidElement(trAs)
    ? trAs
    : typeof trAs === "string"
    ? React.createElement(trAs)
    : createElementFromAs(trAs.head || "tr");

  const bodyTrElement = React.isValidElement(trAs)
    ? trAs
    : typeof trAs === "string"
    ? React.createElement(trAs)
    : createElementFromAs(trAs.body || "tr");

  return (
    <ClassNames>
      {({ css, cx }) => (
        <table
          className={css({
            borderCollapse: "collapse",
            width: "100%",
          })}
        >
          <colgroup>
            {columns.map(({ colProps, id }) => (
              <col key={id} {...colProps} />
            ))}
          </colgroup>

          <thead>
            {React.cloneElement(
              headTrElement,
              {
                className: cx(
                  css({
                    ...typography.base.xsmall,
                    borderBottom: `1px solid ${colors.silver.dark}`,
                    color: colors.grey.darker,
                    textAlign: "left",
                    textTransform: "uppercase",
                  }),
                  headTrElement.props.className,
                ),
              },
              ...columns.map(({ headerTitle, id, thAs = "th" }, colIndex) => {
                const element = createElementFromAs(thAs);

                return React.cloneElement(
                  element,
                  {
                    className: css(
                      css({
                        fontWeight: 600,
                        padding,
                        paddingLeft: colIndex === 0 ? 0 : padding,
                        paddingRight:
                          colIndex === columns.length - 1 ? 0 : padding,
                      }),
                      element.props.className,
                    ),
                    key: id,
                  },
                  headerTitle,
                );
              }),
            )}
          </thead>
          <tbody>
            {data.map((item, index) =>
              React.cloneElement(
                bodyTrElement,
                {
                  key: getRowKey(item),
                },
                ...columns.map(({ as = "td", render, id }, colIndex) => {
                  const element = createElementFromAs(as);

                  return React.cloneElement(
                    element,
                    {
                      key: id,
                      className: cx(
                        css({
                          // no border on the bottom row
                          borderBottom:
                            index === data.length - 1
                              ? `none`
                              : `1px solid ${colors.silver.dark}`,
                          padding,
                          paddingLeft: colIndex === 0 ? 0 : padding,
                          paddingRight:
                            colIndex === columns.length - 1 ? 0 : padding,
                        }),
                        element.props.className,
                      ),
                    },
                    render(item, index, data),
                  );
                }),
              ),
            )}
          </tbody>
        </table>
      )}
    </ClassNames>
  );
}
