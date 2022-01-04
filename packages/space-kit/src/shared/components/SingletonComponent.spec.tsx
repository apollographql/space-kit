import React from "react";
import { SingletonComponent } from "./SingletonComponent";
import { render, screen } from "@testing-library/react";
import { SpaceKitProvider } from "../../SpaceKitProvider";

it("when rendered without a provider, passed through content", () => {
  const Component: React.FC = () => (
    <SingletonComponent identity="test">
      <div data-testid="element" />
    </SingletonComponent>
  );

  render(
    <>
      <Component />
      <Component />
    </>,
  );

  expect(screen.getAllByTestId("element")).toHaveLength(2);
});

describe("with a provider", () => {
  describe("given a single identity", () => {
    it("given multiple elements, element renders only once", () => {
      const Component: React.FC = () => (
        <SingletonComponent identity="test">
          <div data-testid="element" />
        </SingletonComponent>
      );

      render(
        <>
          <SpaceKitProvider>
            <Component />
            <Component />
          </SpaceKitProvider>
        </>,
      );

      expect(screen.getAllByTestId("element")).toHaveLength(1);
    });

    it("when two are rendered and then one is unmounted, renders one element still", () => {
      const Component: React.FC = () => (
        <SingletonComponent identity="test">
          <div data-testid="element" />
        </SingletonComponent>
      );

      const { rerender } = render(
        <>
          <SpaceKitProvider>
            <Component />
            <Component />
          </SpaceKitProvider>
        </>,
      );

      const elementAfterFirstRender = screen.getByTestId("element");
      expect(screen.getAllByTestId("element")).toHaveLength(1);

      rerender(
        <>
          <SpaceKitProvider>
            <Component />
          </SpaceKitProvider>
        </>,
      );

      // There should be only one element and it should be the same element
      // rendered the first time.
      expect(screen.getAllByTestId("element")).toHaveLength(1);
      expect(screen.getByTestId("element")).toBe(elementAfterFirstRender);
    });

    it("when rendered twice and then all are unmounted, renders nothing", () => {
      const Component: React.FC = () => (
        <SingletonComponent identity="test">
          <div data-testid="element" />
        </SingletonComponent>
      );

      const { rerender } = render(
        <>
          <SpaceKitProvider>
            <Component />
            <Component />
          </SpaceKitProvider>
        </>,
      );

      expect(screen.getAllByTestId("element")).toHaveLength(1);

      rerender(
        <>
          <SpaceKitProvider />
        </>,
      );

      expect(screen.queryAllByTestId("element")).toHaveLength(0);
    });
  });

  describe("given a multiple identities", () => {
    const ComponentA: React.FC = () => (
      <SingletonComponent identity="a">
        <div data-testid="a" />
      </SingletonComponent>
    );

    const ComponentB: React.FC = () => (
      <SingletonComponent identity="b">
        <div data-testid="b" />
      </SingletonComponent>
    );

    it("given multiple elements, each element renders only once", () => {
      render(
        <>
          <SpaceKitProvider>
            <ComponentA />
            <ComponentA />
            <ComponentB />
            <ComponentB />
          </SpaceKitProvider>
        </>,
      );

      expect(screen.getAllByTestId("a")).toHaveLength(1);
      expect(screen.getAllByTestId("b")).toHaveLength(1);
    });

    it("when two are rendered and then one is unmounted, renders one element still", () => {
      const { rerender } = render(
        <>
          <SpaceKitProvider>
            <ComponentA />
            <ComponentA />
            <ComponentB />
            <ComponentB />
          </SpaceKitProvider>
        </>,
      );

      expect(screen.getAllByTestId("a")).toHaveLength(1);
      expect(screen.getAllByTestId("b")).toHaveLength(1);
      const elementsAfterFirstRender = {
        a: screen.getByTestId("a"),
        b: screen.getByTestId("b"),
      };

      rerender(
        <>
          <SpaceKitProvider>
            <ComponentA />
            <ComponentB />
          </SpaceKitProvider>
        </>,
      );

      // There should be only one element and it should be the same element
      // rendered the first time.
      expect(screen.getAllByTestId("a")).toHaveLength(1);
      expect(screen.getAllByTestId("b")).toHaveLength(1);
      expect(screen.getByTestId("a")).toBe(elementsAfterFirstRender.a);
      expect(screen.getByTestId("b")).toBe(elementsAfterFirstRender.b);
    });

    it("when rendered twice and then all are unmounted, renders nothing", () => {
      const { rerender } = render(
        <SpaceKitProvider>
          <ComponentA />
          <ComponentA />
          <ComponentB />
          <ComponentB />
        </SpaceKitProvider>,
      );

      expect(screen.getAllByTestId("a")).toHaveLength(1);
      expect(screen.getAllByTestId("b")).toHaveLength(1);

      const elementsAfterFirstRender = {
        a: screen.getByTestId("a"),
        b: screen.getByTestId("b"),
      };

      rerender(
        <SpaceKitProvider>
          <ComponentA />
          <ComponentA />
          <ComponentB />
        </SpaceKitProvider>,
      );

      expect(screen.getAllByTestId("a")).toHaveLength(1);
      expect(screen.getAllByTestId("b")).toHaveLength(1);
      expect(screen.getByTestId("a")).toBe(elementsAfterFirstRender.a);
      expect(screen.getByTestId("b")).toBe(elementsAfterFirstRender.b);

      rerender(
        <SpaceKitProvider>
          <ComponentA />
          <ComponentA />
        </SpaceKitProvider>,
      );

      expect(screen.getAllByTestId("a")).toHaveLength(1);
      expect(screen.queryAllByTestId("b")).toHaveLength(0);
      expect(screen.getByTestId("a")).toBe(elementsAfterFirstRender.a);

      rerender(
        <SpaceKitProvider>
          <ComponentA />
        </SpaceKitProvider>,
      );

      expect(screen.getAllByTestId("a")).toHaveLength(1);
      expect(screen.queryAllByTestId("b")).toHaveLength(0);
      expect(screen.getByTestId("a")).toBe(elementsAfterFirstRender.a);

      rerender(<SpaceKitProvider></SpaceKitProvider>);

      expect(screen.queryAllByTestId("a")).toHaveLength(0);
      expect(screen.queryAllByTestId("b")).toHaveLength(0);
    });
  });
});
