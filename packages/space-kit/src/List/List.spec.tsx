import "@testing-library/jest-dom";
import React from "react";
import { List } from "../List";
import { render, screen } from "@testing-library/react";
import { colors } from "../colors";
import { defaults, useListConfig } from "../ListConfig";

const DebugListConfig: React.FC = () => {
  const listConfig = useListConfig();

  return (
    <>
      {Object.entries(listConfig).map(([key, value]) => {
        return React.cloneElement(
          React.isValidElement(value) ? value : <div />,
          { "data-testid": key, key },
          <>{String(value)}</>,
        );
      })}
    </>
  );
};

test("given no configuration, defaults values should be present", () => {
  render(
    <List>
      <DebugListConfig />
    </List>,
  );

  expect(screen.getByTestId("iconSize")).toHaveTextContent(defaults.iconSize);
  expect(screen.getByTestId("hoverColor")).toHaveTextContent(
    defaults.hoverColor ?? "",
  );
  expect(screen.getByTestId("padding")).toHaveTextContent(defaults.padding);
  expect(screen.getByTestId("selectedColor")).toHaveTextContent(
    defaults.selectedColor,
  );
});

test("given nested lists with configurations in both, correct values should propogate", () => {
  const newValues: ReturnType<typeof useListConfig> = {
    endIconAs: <span />,
    hoverColor: colors.red.base,
    iconSize: "large",
    margin: "none",
    padding: "relaxed",
    selectedColor: colors.green.dark,
    startIconAs: <span />,
    truncate: true,
  };

  render(
    <List
      hoverColor={colors.blue.base}
      iconSize="small"
      padding="normal"
      margin="auto"
      selectedColor={colors.green.base}
      truncate={false}
    >
      <List {...newValues}>
        <DebugListConfig />
      </List>
    </List>,
  );

  expect(screen.getByTestId("endIconAs").tagName).toBe(
    ((newValues.endIconAs.type as unknown) as string).toUpperCase(),
  );
  expect(screen.getByTestId("iconSize")).toHaveTextContent(newValues.iconSize);
  expect(screen.getByTestId("hoverColor")).toHaveTextContent(
    newValues.hoverColor ?? "",
  );
  expect(screen.getByTestId("margin")).toHaveTextContent(newValues.margin);
  expect(screen.getByTestId("padding")).toHaveTextContent(newValues.padding);
  expect(screen.getByTestId("selectedColor")).toHaveTextContent(
    newValues.selectedColor,
  );
  expect(screen.getByTestId("startIconAs").tagName).toBe(
    ((newValues.startIconAs.type as unknown) as string).toUpperCase(),
  );
  expect(screen.getByTestId("truncate")).toHaveTextContent(
    String(newValues.truncate),
  );
});

test("given nested lists with the top level having default configuration and the child configuring everything, correct values should propogate", () => {
  const newValues: ReturnType<typeof useListConfig> = {
    endIconAs: <span />,
    hoverColor: colors.red.base,
    iconSize: "large",
    margin: "none",
    padding: "relaxed",
    selectedColor: colors.green.dark,
    startIconAs: <span />,
    truncate: false,
  };

  render(
    <List>
      <List {...newValues}>
        <DebugListConfig />
      </List>
    </List>,
  );

  expect(screen.getByTestId("endIconAs").tagName).toBe(
    ((newValues.endIconAs.type as unknown) as string).toUpperCase(),
  );
  expect(screen.getByTestId("iconSize")).toHaveTextContent(newValues.iconSize);
  expect(screen.getByTestId("hoverColor")).toHaveTextContent(
    newValues.hoverColor ?? "",
  );
  expect(screen.getByTestId("margin")).toHaveTextContent(newValues.margin);
  expect(screen.getByTestId("padding")).toHaveTextContent(newValues.padding);
  expect(screen.getByTestId("selectedColor")).toHaveTextContent(
    newValues.selectedColor,
  );

  expect(screen.getByTestId("startIconAs").tagName).toBe(
    ((newValues.startIconAs.type as unknown) as string).toUpperCase(),
  );
  expect(screen.getByTestId("truncate")).toHaveTextContent(
    String(newValues.truncate),
  );
});

test("given nested lists with the top level having configuration and the child using defaults, correct values should propogate", () => {
  const newValues: ReturnType<typeof useListConfig> = {
    endIconAs: <span />,
    hoverColor: colors.red.base,
    iconSize: "large",
    margin: "none",
    padding: "relaxed",
    selectedColor: colors.green.dark,
    startIconAs: <span />,
    truncate: false,
  };

  render(
    <List {...newValues}>
      <List>
        <DebugListConfig />
      </List>
    </List>,
  );

  expect(screen.getByTestId("endIconAs").tagName).toBe(
    ((newValues.endIconAs.type as unknown) as string).toUpperCase(),
  );
  expect(screen.getByTestId("iconSize")).toHaveTextContent(newValues.iconSize);
  expect(screen.getByTestId("hoverColor")).toHaveTextContent(
    newValues.hoverColor ?? "",
  );
  expect(screen.getByTestId("margin")).toHaveTextContent(newValues.margin);
  expect(screen.getByTestId("padding")).toHaveTextContent(newValues.padding);
  expect(screen.getByTestId("selectedColor")).toHaveTextContent(
    newValues.selectedColor,
  );

  expect(screen.getByTestId("startIconAs").tagName).toBe(
    ((newValues.startIconAs.type as unknown) as string).toUpperCase(),
  );
  expect(screen.getByTestId("truncate")).toHaveTextContent(
    String(newValues.truncate),
  );
});
