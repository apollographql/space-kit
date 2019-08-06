/** @jsx jsx */
import * as CSS from "csstype";
import { jsx } from "@emotion/core";
import React, { ComponentProps } from "react";
import { storiesOf } from "@storybook/react";
import { Button } from "./Button";
import { IconShip2 } from "../icons/IconShip2";
import { colors } from "../colors";
import * as typography from "../typography";
import { DemoSection } from "../shared/DemoSection";

const iconElement = <IconShip2 css={{ width: "100%", height: "100%" }} />;

// This is a clever way of allowing us to use `cloneElement` while still giving
// us the `jsx` transform for emotion.
// @see https://github.com/emotion-js/emotion/issues/1102#issuecomment-446887725
const cloneElement = (element: any, props: any) => {
  return jsx(element.type, {
    key: element.key,
    ref: element.ref,
    ...element.props,
    ...props,
  });
};

/**
 * Wrap children with a rounded border
 */
const ButtonWrapper: React.FC = ({ children, ...otherProps }) => (
  <div
    {...otherProps}
    css={{
      border: `1px solid ${colors.silver.dark}`,
      borderRadius: 8,
      margin: 6,
    }}
  >
    {children}
  </div>
);

// Restrict our stories to only allow customizing the color. Everything else
// should be handled by passing the `color` prop directly to our `Button`.
interface AllowedCss {
  color: CSS.ColorProperty;
}

const VerticalButtonGroup: React.FC<{
  buttonCss?: AllowedCss;
  buttonProps?: Partial<Omit<ComponentProps<typeof Button>, "children">>;
  children: JSX.Element | JSX.Element[];
  darkButtonCss?: AllowedCss;
  title: string;
}> = ({
  buttonProps = {},
  children,
  title,
  buttonCss = {},
  darkButtonCss = {},
  ...otherProps
}) => (
  <div {...otherProps} css={{ margin: "0 20px", width: 300 }}>
    <hr
      style={{
        height: 1,
        borderWidth: 0,
        backgroundColor: colors.silver.dark,
        marginBottom: 24,
      }}
    />
    <div
      css={{
        ...typography.base.base,
        textTransform: "uppercase",
        fontWeight: 600,
        margin: 6,
      }}
    >
      {title}
    </div>
    <div css={{ display: "flex", flexWrap: "wrap" }}>
      <ButtonWrapper>
        {React.Children.map(children, child => (
          <div css={{ margin: 12 }}>
            {cloneElement(child as any, {
              ...buttonProps,
              css: buttonCss,
            })}
          </div>
        ))}
      </ButtonWrapper>
      <ButtonWrapper
        css={{
          backgroundColor: colors.black.base,
        }}
      >
        {React.Children.map(children, child => {
          return (
            <div css={{ margin: 12 }}>
              {cloneElement(child as any, {
                ...buttonProps,
                theme: "dark",
                css: { ...buttonCss, ...darkButtonCss },
              })}
            </div>
          );
        })}
      </ButtonWrapper>
    </div>
  </div>
);

storiesOf("Button", module)
  .addParameters({
    options: {
      showPanel: false,
    },
  })
  .add("Catalog", () => (
    <div css={{ color: colors.black.base }}>
      <DemoSection
        title="Button Sizes"
        description="There are three different sizes of buttons, with the most common button being the default size. Small and large buttons are avialble for specific settings."
      >
        <VerticalButtonGroup title="Standard / Default">
          <Button>Default</Button>
          <Button icon={iconElement} />
        </VerticalButtonGroup>

        <VerticalButtonGroup title="Small">
          <Button size="small">Small</Button>
          <Button size="small" icon={iconElement} />
        </VerticalButtonGroup>

        <VerticalButtonGroup title="Large">
          <Button size="large">Large</Button>
          <Button size="large" icon={iconElement} />
        </VerticalButtonGroup>
      </DemoSection>

      <DemoSection
        title="Buttons Examples"
        description="Examples on how to configure buttons. Inspect these buttons with the React DevTools to understand usage"
      >
        <VerticalButtonGroup title="Example 1">
          <Button>Rest</Button>
          <Button data-force-hover-state="true">Hover</Button>
          <Button data-force-active-state="true">Active</Button>
          <Button data-force-focus-state="true">Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>

        <VerticalButtonGroup
          title="Example 2"
          buttonCss={{
            color: colors.white,
          }}
          buttonProps={{
            color: colors.indigo.dark,
          }}
        >
          <Button>Rest</Button>
          <Button data-force-hover-state="true">Hover</Button>
          <Button data-force-active-state="true">Active</Button>
          <Button data-force-focus-state="true">Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>

        <VerticalButtonGroup
          title="Example 3"
          buttonCss={{
            color: colors.white,
          }}
          buttonProps={{
            color: colors.green.base,
          }}
        >
          <Button>Rest</Button>
          <Button data-force-hover-state="true">Hover</Button>
          <Button data-force-active-state="true">Active</Button>
          <Button data-force-focus-state="true">Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>

        <VerticalButtonGroup
          title="Example 4"
          buttonCss={{
            color: colors.white,
          }}
          buttonProps={{
            color: colors.red.base,
          }}
        >
          <Button>Rest</Button>
          <Button data-force-hover-state="true">Hover</Button>
          <Button data-force-active-state="true">Active</Button>
          <Button data-force-focus-state="true">Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>

        <VerticalButtonGroup
          title="Example 5"
          buttonCss={{
            color: colors.white,
          }}
          buttonProps={{
            color: colors.blue.base,
          }}
        >
          <Button>Rest</Button>
          <Button data-force-hover-state="true">Hover</Button>
          <Button data-force-active-state="true">Active</Button>
          <Button data-force-focus-state="true">Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>
      </DemoSection>

      <DemoSection
        title="Secondary & Icon Buttons"
        description="Secondary buttons can be used with primary buttons or as by themselves. Icon buttons are a good way to communicate more information about the button’s action."
      >
        <VerticalButtonGroup
          title="Secondary"
          buttonProps={{ feel: "secondary" }}
        >
          <Button>Rest</Button>
          <Button data-force-hover-state="true">Hover</Button>
          <Button data-force-active-state="true">Active</Button>
          <Button data-force-focus-state="true">Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>

        <VerticalButtonGroup
          title="Buttons with icons"
          buttonProps={{
            icon: iconElement,
          }}
        >
          <Button>Rest</Button>
          <Button data-force-hover-state="true">Hover</Button>
          <Button data-force-active-state="true">Active</Button>
          <Button data-force-focus-state="true">Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>

        <VerticalButtonGroup
          title="Icon only"
          buttonProps={{
            icon: iconElement,
          }}
        >
          <React.Fragment>
            <Button css={{ marginRight: 6 }} icon={iconElement} />
            <Button css={{ marginLeft: 6 }} variant="fab" icon={iconElement} />
          </React.Fragment>
          <React.Fragment>
            <Button
              css={{ marginRight: 6 }}
              data-force-hover-state="true"
              icon={iconElement}
            />
            <Button
              css={{ marginLeft: 6 }}
              data-force-hover-state="true"
              variant="fab"
              icon={iconElement}
            />
          </React.Fragment>
          <React.Fragment>
            <Button
              css={{ marginRight: 6 }}
              data-force-active-state="true"
              icon={iconElement}
            />
            <Button
              css={{ marginLeft: 6 }}
              data-force-active-state="true"
              variant="fab"
              icon={iconElement}
            />
          </React.Fragment>
          <React.Fragment>
            <Button
              css={{ marginRight: 6 }}
              data-force-focus-state="true"
              icon={iconElement}
            />
            <Button
              css={{ marginLeft: 6 }}
              data-force-focus-state="true"
              variant="fab"
              icon={iconElement}
            />
          </React.Fragment>
          <React.Fragment>
            <Button css={{ marginRight: 6 }} disabled icon={iconElement} />
            <Button
              css={{ marginLeft: 6 }}
              disabled
              variant="fab"
              icon={iconElement}
            />
          </React.Fragment>
        </VerticalButtonGroup>
      </DemoSection>
      <DemoSection
        title="Simple Button"
        description="As the name implies, the Simple button is a simpler approach on the standard buttons. It provides a lot of flexibility many buttons side-by-side and doesn’t clutter the interface as much as a standard button."
      >
        <VerticalButtonGroup
          title="Basic simple button"
          buttonProps={{ feel: "flat" }}
          buttonCss={{
            color: colors.grey.darker,
          }}
          darkButtonCss={{
            color: colors.grey.light,
          }}
        >
          <Button>Rest</Button>
          <Button data-force-hover-state="true">Hover</Button>
          <Button data-force-active-state="true">Active</Button>
          <Button data-force-focus-state="true">Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>

        <VerticalButtonGroup
          title="Simple color button"
          buttonProps={{ color: colors.blue.base, feel: "flat" }}
        >
          <Button>Rest</Button>
          <Button data-force-hover-state="true">Hover</Button>
          <Button data-force-active-state="true">Active</Button>
          <Button data-force-focus-state="true">Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>

        <VerticalButtonGroup
          title="Simple button with icon"
          buttonProps={{ feel: "flat", icon: iconElement }}
          buttonCss={{
            color: colors.grey.darker,
          }}
          darkButtonCss={{
            color: colors.grey.light,
          }}
        >
          <Button>Rest</Button>
          <Button data-force-hover-state="true">Hover</Button>
          <Button data-force-active-state="true">Active</Button>
          <Button data-force-focus-state="true">Focused</Button>
          <Button disabled>Disabled</Button>
        </VerticalButtonGroup>
      </DemoSection>
    </div>
  ));
