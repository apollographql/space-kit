import React from "react";
interface Props<RowShape> {
    data: RowShape[];
    density?: "standard" | "condensed" | "relaxed";
    columns: Array<{
        headerTitle?: string | React.ElementType;
        render: (input: Readonly<RowShape>, index: number, list: ReadonlyArray<RowShape>) => React.ReactNode;
    }>;
}
export declare function Table<RowShape>({ data, density, columns }: Props<RowShape>): ReturnType<React.FC>;
export {};
