/** @jsx jsx */
import { jsx, ClassNames } from "@emotion/core";
import React, { HTMLAttributes } from "react";
import * as typography from "./typography";
import * as colors from "./colors";

interface Props<RowShape> {
  /**
   * All the data for the component. Should be stored in an array of objects
   */
  data: RowShape[];

  density?: "standard" | "condensed" | "relaxed";

  /**
   * An array of column definitions
   */
  columns: Array<{
    /**
     * Title to add to the table header
     */
    headerTitle?: string;

    /**
     * A method that accepts the data for the row and returns the inner content for the row.
     *
     * Do not include a `<tr>` or a `<td>`, these are handled automatically
     */
    render: (
      input: Readonly<RowShape>,
      index: number,
      list: ReadonlyArray<RowShape>
    ) => React.ReactNode;

    /**
     * A function returning the wrapper the rendered cell content.
     *
     * This should _not_ render the row content, it should render the `<td>`
     * with any customizations you give it. You should always spread the props
     * you aren't using into the `<td>` so styles can be passed in.
     *
     * Example:
     *
     * ```js
     * renderTd: ({ children, ...otherProps}) => (
     *   <td
     *     {...otherProps}
     *     onClick={() => alert('clicked')}
     *   />
     * )
     * ```
     */
    renderTd?: React.FC<
      {
        children: React.ReactNode;
        rowData: Readonly<RowShape>;
        index: number;
        list: ReadonlyArray<RowShape>;
      } & React.DetailedHTMLProps<
        HTMLAttributes<HTMLTableDataCellElement>,
        HTMLTableDataCellElement
      >
    >;
  }>;
}

export function Table<RowShape>({
  data,
  density = "standard",
  columns
}: Props<RowShape>): ReturnType<React.FC> {
  const padding = density === "standard" ? 8 : density === "condensed" ? 3 : 11;

  return (
    <table
      css={{
        borderCollapse: "collapse"
      }}
    >
      <thead>
        <tr
          css={{
            borderBottom: `1px solid ${colors.silver.dark}`
          }}
        >
          {columns.map(({ headerTitle }) => (
            <th
              css={{
                ...typography.base.xsmall,
                textTransform: "uppercase",
                color: colors.grey.darker,
                fontWeight: 600,
                textAlign: "left",
                padding
              }}
            >
              {headerTitle}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr>
            {columns.map(
              ({
                render,
                renderTd = ({ children, ...otherProps }) => (
                  <td {...otherProps}>{children}</td>
                )
              }) => (
                <ClassNames>
                  {({ css }) =>
                    React.createElement(renderTd, {
                      className: css({
                        borderBottom: `1px solid ${colors.silver.dark}`,
                        padding
                      }),
                      rowData: item,
                      index,
                      list: data,
                      children: render(item, index, data)
                    })
                  }
                </ClassNames>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
