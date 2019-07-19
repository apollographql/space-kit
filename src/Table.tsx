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
      list: ReadonlyArray<RowShape>
    ) => React.ReactNode;
  }>;
}

export function Table<RowShape>({
  data,
  density = "standard",
  columns,
}: Props<RowShape>): ReturnType<React.FC> {
  const padding = density === "standard" ? 8 : density === "condensed" ? 3 : 11;

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
            borderBottom: `1px solid ${colors.silver.dark}`
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
          <tr key={index}>
            {columns.map(
              ({
                render,
                id
              }) => (
                <td 
                  key={id}
                  css={{
                    // no border on the bottom row
                    borderBottom: index === data.length-1 ? `none`: `1px solid ${colors.silver.dark}`,
                    padding
                  }}
                >{render(item, index, data)}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
