import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Table } from "./Table";
import { ClassNames } from "@emotion/react";
import { matchers } from "jest-emotion";
import { colors } from "../colors";

// Add the custom matchers provided by 'jest-emotion'
expect.extend(matchers);

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
    />,
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
    />,
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
    />,
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

it("when passed `column` values for `th`, they are rendered", () => {
  render(
    <ClassNames>
      {({ css }) => (
        <Table
          keyOn="name"
          data={[
            { name: "Mason", firstWord: "Apollo" },
            { name: "Sadie", firstWord: "GraphQL" },
          ]}
          columns={[
            {
              id: "name",
              headerTitle: "Name",
              render: ({ name }) => name,
              thAs: <th className={css({ color: colors.red.light })} />,
            },
            {
              id: "firstWord",
              headerTitle: "First Word Spoken",
              render: ({ firstWord }) => firstWord,
              thAs: <th className={css({ color: colors.blue.light })} />,
            },
          ]}
        />
      )}
    </ClassNames>,
  );

  expect(document.querySelector("thead > tr > th")).toHaveStyleRule(
    "color",
    colors.red.light,
  );
  expect(
    document.querySelector("thead > tr > th:nth-of-type(2)"),
  ).toHaveStyleRule("color", colors.blue.light);
});

it("when passed `column` values for `td`, they are rendered", () => {
  render(
    <ClassNames>
      {({ css }) => (
        <Table
          keyOn="name"
          data={[
            { name: "Mason", firstWord: "Apollo" },
            { name: "Sadie", firstWord: "GraphQL" },
          ]}
          columns={[
            {
              id: "name",
              headerTitle: "Name",
              render: ({ name }) => name,
              as: <td className={css({ color: colors.red.light })} />,
            },
            {
              id: "firstWord",
              headerTitle: "First Word Spoken",
              render: ({ firstWord }) => firstWord,
              as: <td className={css({ color: colors.blue.light })} />,
            },
          ]}
          trAs={<tr className="injected-class" />}
        />
      )}
    </ClassNames>,
  );

  expect(document.querySelector("tbody > tr > td")).toHaveStyleRule(
    "color",
    colors.red.light,
  );
  expect(
    document.querySelector("tbody > tr > td:nth-of-type(2)"),
  ).toHaveStyleRule("color", colors.blue.light);
});

it("when passed `trAs` single value, `className`s are merged to head and body `tr`s", () => {
  // We first test that the `tr` elements don't have the style, then that they
  // do. This ensures that we're actually changing something to be what we want.

  const headTr = () =>
    document.querySelector<HTMLTableRowElement>("thead > tr");
  const bodyTrs = (): HTMLTableRowElement[] =>
    Array.from(document.querySelectorAll<HTMLTableRowElement>("tbody > tr"));

  render(
    <Table
      keyOn="name"
      data={[{ name: "Mason" }, { name: "Sadie" }]}
      columns={[
        {
          id: "name",
          headerTitle: "Name",
          render: ({ name }) => name,
        },
      ]}
      trAs={<tr className="injected-class" />}
    />,
  );
  expect(headTr()).toBeInTheDocument();
  expect(headTr()).toHaveClass("injected-class");
  expect(headTr()).not.toHaveStyleRule("color", "red");
  expect(bodyTrs()).toHaveLength(2);
  bodyTrs().forEach((tr) => {
    expect(tr).not.toHaveStyleRule("color", "red");
    expect(tr).toHaveClass("injected-class");
  });

  // We must call `cleanup` between renders if we want to test style properties
  // because emotion uses side-effects to add styles to the DOM.
  cleanup();

  render(
    <ClassNames>
      {({ css, cx }) => (
        <Table
          keyOn="name"
          data={[{ name: "Mason" }, { name: "Sadie" }]}
          columns={[
            {
              id: "name",
              headerTitle: "Name",
              render: ({ name }) => name,
            },
          ]}
          trAs={<tr className={cx(css({ color: "red" }), "injected-class")} />}
        />
      )}
    </ClassNames>,
  );

  expect(headTr()).toBeInTheDocument();
  expect(headTr()).toHaveStyleRule("color", "red");
  expect(headTr()).toHaveClass("injected-class");
  expect(bodyTrs()).toHaveLength(2);
  bodyTrs().forEach((tr) => {
    expect(tr).toHaveStyleRule("color", "red");
    expect(tr).toHaveClass("injected-class");
  });
});

it("when passed `trAs` with a `head` with additional classes, `className`s are merged to head and not body `tr`s", () => {
  // We first test that the `tr` elements don't have the style, then that they
  // do. This ensures that we're actually changing something to be what we want.

  const headTr = () =>
    document.querySelector<HTMLTableRowElement>("thead > tr");
  const bodyTrs = (): HTMLTableRowElement[] =>
    Array.from(document.querySelectorAll<HTMLTableRowElement>("tbody > tr"));

  render(
    <Table
      keyOn="name"
      data={[{ name: "Mason" }, { name: "Sadie" }]}
      columns={[
        {
          id: "name",
          headerTitle: "Name",
          render: ({ name }) => name,
        },
      ]}
      trAs={{ head: <tr className="injected-class" /> }}
    />,
  );
  expect(headTr()).toBeInTheDocument();
  expect(headTr()).toHaveClass("injected-class");
  expect(headTr()).not.toHaveStyleRule("color", "red");
  expect(bodyTrs()).toHaveLength(2);
  bodyTrs().forEach((tr) => {
    expect(tr).not.toHaveStyleRule("color", "red");
    expect(tr).not.toHaveClass("injected-class");
  });

  // We must call `cleanup` between renders if we want to test style properties
  // because emotion uses side-effects to add styles to the DOM.
  cleanup();

  render(
    <ClassNames>
      {({ css, cx }) => (
        <Table
          keyOn="name"
          data={[{ name: "Mason" }, { name: "Sadie" }]}
          columns={[
            {
              id: "name",
              headerTitle: "Name",
              render: ({ name }) => name,
            },
          ]}
          trAs={{
            head: (
              <tr className={cx(css({ color: "red" }), "injected-class")} />
            ),
          }}
        />
      )}
    </ClassNames>,
  );

  expect(headTr()).toBeInTheDocument();
  expect(headTr()).toHaveStyleRule("color", "red");
  expect(headTr()).toHaveClass("injected-class");
  expect(bodyTrs()).toHaveLength(2);
  bodyTrs().forEach((tr) => {
    expect(tr).not.toHaveStyleRule("color", "red");
    expect(tr).not.toHaveClass("injected-class");
  });
});

it("when passed `trAs` with a `body` with additional classes, `className`s are merged to body and not head `tr`s", () => {
  // We first test that the `tr` elements don't have the style, then that they
  // do. This ensures that we're actually changing something to be what we want.

  const headTr = () =>
    document.querySelector<HTMLTableRowElement>("thead > tr");
  const bodyTrs = (): HTMLTableRowElement[] =>
    Array.from(document.querySelectorAll<HTMLTableRowElement>("tbody > tr"));

  render(
    <Table
      keyOn="name"
      data={[{ name: "Mason" }, { name: "Sadie" }]}
      columns={[
        {
          id: "name",
          headerTitle: "Name",
          render: ({ name }) => name,
        },
      ]}
      trAs={{ body: <tr className="injected-class" /> }}
    />,
  );
  expect(headTr()).toBeInTheDocument();
  expect(headTr()).not.toHaveClass("injected-class");
  expect(headTr()).not.toHaveStyleRule("color", "red");
  expect(bodyTrs()).toHaveLength(2);
  bodyTrs().forEach((tr) => {
    expect(tr).toHaveClass("injected-class");
    expect(tr).not.toHaveStyleRule("color", "red");
  });

  // We must call `cleanup` between renders if we want to test style properties
  // because emotion uses side-effects to add styles to the DOM.
  cleanup();

  render(
    <ClassNames>
      {({ css, cx }) => (
        <Table
          keyOn="name"
          data={[{ name: "Mason" }, { name: "Sadie" }]}
          columns={[
            {
              id: "name",
              headerTitle: "Name",
              render: ({ name }) => name,
            },
          ]}
          trAs={{
            body: (
              <tr className={cx(css({ color: "red" }), "injected-class")} />
            ),
          }}
        />
      )}
    </ClassNames>,
  );

  expect(headTr()).toBeInTheDocument();
  expect(headTr()).not.toHaveStyleRule("color", "red");
  expect(headTr()).not.toHaveClass("injected-class");
  expect(bodyTrs()).toHaveLength(2);
  bodyTrs().forEach((tr) => {
    expect(tr).toHaveClass("injected-class");
    expect(tr).toHaveStyleRule("color", "red");
  });
});

it("when passed `trAs` with a `body` and `head` with different additional classes, `className`s are merged", () => {
  // We first test that the `tr` elements don't have the style, then that they
  // do. This ensures that we're actually changing something to be what we want.

  const headTr = () =>
    document.querySelector<HTMLTableRowElement>("thead > tr");
  const bodyTrs = (): HTMLTableRowElement[] =>
    Array.from(document.querySelectorAll<HTMLTableRowElement>("tbody > tr"));

  render(
    <Table
      keyOn="name"
      data={[{ name: "Mason" }, { name: "Sadie" }]}
      columns={[
        {
          id: "name",
          headerTitle: "Name",
          render: ({ name }) => name,
        },
      ]}
      trAs={{
        body: <tr className="body-injected-class" />,
        head: <tr className="head-injected-class" />,
      }}
    />,
  );
  expect(headTr()).toBeInTheDocument();
  expect(headTr()).toHaveClass("head-injected-class");
  expect(headTr()).not.toHaveClass("body-injected-class");
  expect(headTr()).not.toHaveStyleRule("color", "red");
  expect(bodyTrs()).toHaveLength(2);
  bodyTrs().forEach((tr) => {
    expect(tr).toHaveClass("body-injected-class");
    expect(tr).not.toHaveClass("head-injected-class");
    expect(tr).not.toHaveStyleRule("color", "red");
  });

  // We must call `cleanup` between renders if we want to test style properties
  // because emotion uses side-effects to add styles to the DOM.
  cleanup();

  render(
    <ClassNames>
      {({ css, cx }) => (
        <Table
          keyOn="name"
          data={[{ name: "Mason" }, { name: "Sadie" }]}
          columns={[
            {
              id: "name",
              headerTitle: "Name",
              render: ({ name }) => name,
            },
          ]}
          trAs={{
            body: (
              <tr
                className={cx(css({ color: "red" }), "body-injected-class")}
              />
            ),
            head: (
              <tr
                className={cx(css({ color: "blue" }), "head-injected-class")}
              />
            ),
          }}
        />
      )}
    </ClassNames>,
  );

  expect(headTr()).toBeInTheDocument();
  expect(headTr()).toHaveStyleRule("color", "blue");
  expect(headTr()).not.toHaveClass("body-injected-class");
  expect(headTr()).toHaveClass("head-injected-class");
  expect(bodyTrs()).toHaveLength(2);
  bodyTrs().forEach((tr) => {
    expect(tr).toHaveClass("body-injected-class");
    expect(tr).not.toHaveClass("head-injected-class");
    expect(tr).toHaveStyleRule("color", "red");
  });
});
