import { cleanup, render } from "@testing-library/react";
import React from "react";
import { useSpaceKitProvider, SpaceKitProvider } from "../SpaceKitProvider";

afterEach(cleanup);

it("when provider has `disableAnimation` set to `true`, that value will be set in consumer", () => {
  const textDisableAnimationsTrue = "disableAnimationsTrue";
  const textDisableAnimationsFalse = "disableAnimationsFalse";

  const Component: React.FC = () => {
    const spaceKitProvider = useSpaceKitProvider();

    return (
      <div>
        {spaceKitProvider.disableAnimations
          ? textDisableAnimationsTrue
          : textDisableAnimationsFalse}
      </div>
    );
  };

  const { getByText } = render(
    <SpaceKitProvider disableAnimations>
      <Component />
    </SpaceKitProvider>
  );

  getByText(textDisableAnimationsTrue);
});

it("when provider has `disableAnimation` set to `false`, that value will be set in consumer", () => {
  const textDisableAnimationsTrue = "disableAnimationsTrue";
  const textDisableAnimationsFalse = "disableAnimationsFalse";

  const Component: React.FC = () => {
    const spaceKitProvider = useSpaceKitProvider();

    return (
      <div>
        {spaceKitProvider.disableAnimations
          ? textDisableAnimationsTrue
          : textDisableAnimationsFalse}
      </div>
    );
  };

  const { getByText } = render(
    <SpaceKitProvider disableAnimations={false}>
      <Component />
    </SpaceKitProvider>
  );

  getByText(textDisableAnimationsFalse);
});

it("when no provider is used, `disableAnimation` is set to default value of `false`", () => {
  const textDisableAnimationsTrue = "disableAnimationsTrue";
  const textDisableAnimationsFalse = "disableAnimationsFalse";

  const Component: React.FC = () => {
    const spaceKitProvider = useSpaceKitProvider();

    return (
      <div>
        {spaceKitProvider.disableAnimations
          ? textDisableAnimationsTrue
          : textDisableAnimationsFalse}
      </div>
    );
  };

  const { getByText } = render(<Component />);

  getByText(textDisableAnimationsFalse);
});
