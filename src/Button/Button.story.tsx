import * as CSS from "csstype";
import { ClassNames } from "@emotion/core";
import React, { ComponentProps } from "react";
import { storiesOf } from "@storybook/react";
import { Button } from "./Button";
import { IconShip2 } from "../icons/IconShip2";
import { colors } from "../colors";
import { DemoSection, DemoGroup, DemoGroupProps } from "../shared/DemoSection";
import classnames from "classnames";

const iconElement = <IconShip2 style={{ width: "100%", height: "100%" }} />;

/**
 * Wrap children with a rounded border
 */
const ButtonWrapper: React.FC<{ className?: string }> = ({
  children,
  className,
  ...otherProps
}) => (
  <ClassNames>
    {({ css, cx }) => (
      <div
        {...otherProps}
        className={classnames(
          className,
          cx(
            css({
              border: `1px solid ${colors.silver.dark}`,
              borderRadius: 8,
              margin: 6,
            })
          )
        )}
      >
        {children}
      </div>
    )}
  </ClassNames>
);

// Restrict our stories to only allow customizing the color. Everything else
// should be handled by passing the `color` prop directly to our `Button`.
interface AllowedCss {
  color: CSS.ColorProperty;
}

const VerticalButtonGroup: React.FC<
  {
    buttonCss?: AllowedCss;
    buttonProps?: Partial<Omit<ComponentProps<typeof Button>, "children">>;
    darkButtonCss?: AllowedCss;
  } & DemoGroupProps
> = ({
  buttonProps = {},
  children,
  buttonCss = {},
  darkButtonCss = {},
  ...otherProps
}) => (
  <ClassNames>
    {({ css, cx }) => (
      <DemoGroup {...otherProps}>
        <ButtonWrapper>
          {React.Children.map(children, child => (
            <div style={{ margin: 12 }}>
              {React.cloneElement(child as any, {
                ...buttonProps,
                calssName: classnames(
                  buttonProps.className,
                  cx(css({ ...buttonCss }))
                ),
              })}
            </div>
          ))}
        </ButtonWrapper>
        <ButtonWrapper
          className={cx(
            css({
              backgroundColor: colors.black.base,
            })
          )}
        >
          {React.Children.map(children, child => {
            return (
              <div className={cx(css({ margin: 12 }))}>
                {React.cloneElement(child as any, {
                  ...buttonProps,
                  className: classnames(
                    buttonProps.className,
                    cx(css({ ...buttonCss, ...darkButtonCss }))
                  ),
                  theme: "dark",
                })}
              </div>
            );
          })}
        </ButtonWrapper>
      </DemoGroup>
    )}
  </ClassNames>
);

const DummyNavLink: React.FC<{ to: string; className?: string }> = ({
  to,
  ...otherProps
}) => <a {...otherProps} href={to} />;

storiesOf("Button", module)
  .addParameters({
    options: {
      showPanel: false,
    },
  })
  .add("Catalog", () => (
    <div style={{ color: colors.black.base }}>
      <DemoSection
        title="Button Sizes"
        description="There are three different sizes of buttons, with the most common button being the default size. Small and large buttons are avialble for specific settings. Buttons will expand to fill their content."
      >
        <VerticalButtonGroup title="Standard / Default">
          <Button>Default</Button>
          <Button icon={iconElement} />
          <Button>Default: Expanded</Button>
        </VerticalButtonGroup>

        <VerticalButtonGroup title="Small">
          <Button size="small">Small</Button>
          <Button size="small" icon={iconElement} />
          <Button size="small">Small: Expanded</Button>
        </VerticalButtonGroup>

        <VerticalButtonGroup title="Large">
          <Button size="large">Large</Button>
          <Button size="large" icon={iconElement} />
          <Button size="large">Large: Expanded</Button>
        </VerticalButtonGroup>
      </DemoSection>
      <DemoSection
        title="Render as"
        description='You can use `as` to add a custom render to your button. As accepts a string (`keyof JSX.IntrinsicElements`) representing the dom node you want to render, "button" for example, or a React element, `<Link to="/" />`. All props that we include as part of our implementation will be automatically spread onro your element and your classNames will be merged.'
      >
        <VerticalButtonGroup
          title="anchor via string"
          description='You can pass a string representing the element you want to render. It will be passed as the first argument to `React.createElement`. The props required by `Button` are inferred by the value of `as`. For example, if you use `as="a"`, then `href` will be a valid prop and will be typed on `Button`'
        >
          <ClassNames>
            {({ css, cx }) => (
              <Button
                as={<a href="#" />}
                className={cx(css({ color: colors.blue.base }))}
              >
                Default
              </Button>
            )}
          </ClassNames>
        </VerticalButtonGroup>

        <VerticalButtonGroup
          title="anchor with element"
          description='You can pass a React element to the Button component, `as={<a href="#" />}` for example. Props that are usually added to the root element by `Button` will be spread onto your element via `React.cloneElement` and `className`s will be merged. No props besides the stock `Button` props can be passed to `Button` when using an element, instead pass them directly to your element.'
        >
          <ClassNames>
            {({ css, cx }) => (
              <Button
                as={
                  <a
                    className={cx(css({ color: colors.orange.base }))}
                    href="#"
                  />
                }
              >
                Default
              </Button>
            )}
          </ClassNames>
        </VerticalButtonGroup>

        <VerticalButtonGroup
          title="anchor with component"
          description="If you want to use a custom component, then you must use a React element beacuse we haven't yet figured out the types."
        >
          <ClassNames>
            {({ css, cx }) => (
              <Button
                as={
                  <DummyNavLink
                    to="#"
                    className={cx(css({ color: colors.red.base }))}
                  />
                }
              >
                Default
              </Button>
            )}
          </ClassNames>
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
          buttonProps={{ color: colors.white }}
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
