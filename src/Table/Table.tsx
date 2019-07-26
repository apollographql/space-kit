/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import * as typography from "../typography";
import * as colors from "../colors";

interface Props<RowShape> {
  /**
   * All the data for the component. Should be stored in an array of objects
   */
  data: RowShape[];

  density?: "standard" | "condensed" | "relaxed";

  /**
   * An array of column definitions
   */
  columns: {
    /**
     * Title to add to the table header
     */
    headerTitle?: React.ReactNode | string;
    /**
     * an id for the column
     */
    id: string | number;

    /**
     * A method that accepts the data for the row and returns the inner content for the row.
     *
     * Do not include a `<tr>` or a `<td>`, these are handled automatically
     */
    render: (
      input: Readonly<RowShape>,
      index: number,
      list: readonly RowShape[]
    ) => React.ReactNode;
  }[];

  /**
   * a field name to key rows on
   */
  keyOn: keyof RowShape | ((row: RowShape) => any);
}

export function Table<RowShape>({
  data,
  density = "standard",
  columns,
  keyOn,
}: Props<RowShape>): ReturnType<React.FC> {
  const padding = density === "standard" ? 8 : density === "condensed" ? 3 : 11;
  const getRowKey =
    typeof keyOn === "function" ? keyOn : (row: RowShape) => row[keyOn];

  return (
    <table
      css={{
        borderCollapse: "collapse",
        width: "100%",
      }}
    >
      <thead>
        <tr
          css={{
            borderBottom: `1px solid ${colors.silver.dark}`,
          }}
        >
          {columns.map(({ headerTitle, id }) => (
            <th
              key={id}
              css={{
                ...typography.base.xsmall,
                textTransform: "uppercase",
                color: colors.grey.darker,
                fontWeight: 600,
                textAlign: "left",
                padding,
              }}
            >
              {headerTitle}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={getRowKey(item)}>
            {columns.map(({ render, id }) => (
              <td
                key={id}
                css={{
                  // no border on the bottom row
                  borderBottom:
                    index === data.length - 1
                      ? `none`
                      : `1px solid ${colors.silver.dark}`,
                  padding,
                }}
              >
                {render(item, index, data)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
