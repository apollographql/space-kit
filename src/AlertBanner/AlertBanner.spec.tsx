import "@testing-library/jest-dom";
import React from "react";
import { AlertBanner } from "./AlertBanner";
import { render, screen } from "@testing-library/react";

it("should render children content and icon", () => {
  render(<AlertBanner type="info">message</AlertBanner>);

  expect(screen.getByText("message")).toBeInTheDocument();
  expect(document.querySelector("svg")).toBeInTheDocument();
});

it("should render the default `childrenContainerAs` element", () => {
  render(<AlertBanner type="info">message</AlertBanner>);
  expect(screen.getByText("message")).toHaveProperty("tagName", "DIV");
});

it("should render a custom `childrenContainerAs` element", () => {
  render(
    <AlertBanner
      type="info"
      childrenContainerAs={<p data-testid="containerAs" />}
    >
      message
    </AlertBanner>
  );
  expect(screen.getByTestId("containerAs")).toBeInTheDocument();
  expect(screen.getByTestId("containerAs")).toHaveProperty("tagName", "P");
});
