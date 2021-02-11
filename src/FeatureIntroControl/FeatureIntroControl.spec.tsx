/*eslint react/jsx-sort-props: "error" */
import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { FeatureIntroControl } from ".";
import { FeatureIntroContent } from "../FeatureIntroContent";
import { FeatureIntroDismissButton } from "../FeatureIntroDismissButton";
import { FeatureIntroLearnMoreLink } from "../FeatureIntroLearnMoreLink";
import { FeatureIntroImage } from "../FeatureIntroImage";
import { FeatureIntroHeading } from "../FeatureIntroHeading";
import { Develop } from "../pictograms/Develop";

test("when passed a heading, renders it", () => {
  render(
    <FeatureIntroControl id="test">
      <FeatureIntroHeading>heading text</FeatureIntroHeading>
    </FeatureIntroControl>,
  );

  expect(screen.getByText("heading text")).toBeInTheDocument();
});

test("when passed content, renders it", () => {
  render(
    <FeatureIntroControl id="test">
      <FeatureIntroHeading>heading text</FeatureIntroHeading>
      <FeatureIntroContent>content text</FeatureIntroContent>
    </FeatureIntroControl>,
  );

  expect(screen.getByText("content text")).toBeInTheDocument();
});

test("when passed an image, renders it", () => {
  const { container } = render(
    <FeatureIntroControl id="test">
      <FeatureIntroHeading>heading text</FeatureIntroHeading>
      <FeatureIntroContent>content text</FeatureIntroContent>
      <FeatureIntroImage>
        <Develop height={180} width={180} />
      </FeatureIntroImage>
    </FeatureIntroControl>,
  );

  const svg = container.querySelector("svg");
  expect(svg).not.toBeNull();
});

test("when passed a dismiss button, renders it", () => {
  render(
    <FeatureIntroControl id="test">
      <FeatureIntroHeading>heading text</FeatureIntroHeading>
      <FeatureIntroContent>content text</FeatureIntroContent>
      <FeatureIntroDismissButton>dismiss text</FeatureIntroDismissButton>
    </FeatureIntroControl>,
  );

  expect(screen.getByText("dismiss text")).toBeInTheDocument();
});

test("when passed a learn more link as a, renders it clickable", () => {
  const { container } = render(
    <FeatureIntroControl
      id="test"
      learnMoreLinkAs={<a href="https://apollographql.com" />}
    >
      <FeatureIntroHeading>heading text</FeatureIntroHeading>
      <FeatureIntroContent>content text</FeatureIntroContent>
      <FeatureIntroLearnMoreLink />
    </FeatureIntroControl>,
  );
  expect(screen.getByText("Learn more")).toBeInTheDocument();
  const link = container.querySelector("a");
  if (!link) throw new Error("Could not find link");
  expect(link.href).toEqual("https://apollographql.com/");
});
