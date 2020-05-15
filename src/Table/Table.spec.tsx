import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Table } from "./Table";

test("when passed headers in `columns`, should render them, even with no data", () => {
  const { container, getByText } = render(
    <Table
      keyOn={(user) => user.name}
      data={[
        {
          name: "Mason",
          dateAdded: "07/14/2018",
        },
        {
          name: "Sadie",
          dateAdded: "07/14/2018",
        },
      ]}
      columns={[
        {
          id: "name",
          headerTitle: "Name",
          render: ({ name }) => name,
        },
        {
          id: "dateAdded",
          headerTitle: "Date Added",
          render: ({ dateAdded }) => dateAdded,
        },
      ]}
    />
  );

  const thead = container.querySelector<HTMLTableSectionElement>("thead");
  if (!thead) throw new Error("could not find thead");

  expect(thead).toBeInTheDocument();
  expect(getByText("Date Added")).toBeInTheDocument();
  expect(getByText("Name")).toBeInTheDocument();
});

test("should render content", () => {
  const { getAllByText, getByText } = render(
    <Table
      keyOn={(user) => user.name}
      data={[
        {
          name: "Mason",
          dateAdded: "07/14/2018",
        },
        {
          name: "Sadie",
          dateAdded: "07/14/2018",
        },
      ]}
      columns={[
        {
          id: 2,
          headerTitle: "Name",
          render: ({ name }) => name,
        },
        {
          id: 3,
          headerTitle: "Date Added",
          render: ({ dateAdded }) => dateAdded,
        },
      ]}
    />
  );

  // All the user names should be rendered
  expect(getByText("Mason")).toBeInTheDocument();
  expect(getByText("Sadie")).toBeInTheDocument();

  // All dates should be rendered
  expect(getAllByText("07/14/2018")).toHaveLength(2);
});

test("when passed col for columns, should render them", () => {
  const { container } = render(
    <Table
      keyOn={(user) => user.name}
      data={[
        {
          name: "Mason",
          dateAdded: "07/14/2018",
        },
        {
          name: "Sadie",
          dateAdded: "07/14/2018",
        },
      ]}
      columns={[
        {
          id: "name",
          headerTitle: "Name",
          render: ({ name }) => name,
          colProps: { className: "w-0" },
        },
        {
          id: "dateAdded",
          headerTitle: "Date Added",
          render: ({ dateAdded }) => dateAdded,
          colProps: { width: "25%" },
        },
      ]}
    />
  );
  const colgroup = container.querySelector<HTMLTableColElement>("colgroup");
  if (!colgroup) throw new Error("could not find colgroup");

  expect(colgroup).toMatchInlineSnapshot(`
    <colgroup>
      <col
        class="w-0"
      />
      <col
        width="25%"
      />
    </colgroup>
  `);
});
