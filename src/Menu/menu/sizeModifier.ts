/* eslint-disable @typescript-eslint/ban-ts-ignore */
// import { Instance, ReferenceElement } from "tippy.js";
import computeAutoPlacement from "@popperjs/core/lib/utils/computeAutoPlacement";
import detectOverflow from "@popperjs/core/lib/utils/detectOverflow";
import getOppositePlacement from "@popperjs/core/lib/utils/getOppositePlacement";
import getOppositeVariationPlacement from "@popperjs/core/lib/utils/getOppositeVariationPlacement";
import getVariation from "@popperjs/core/lib/utils/getVariation";
import {
  BasePlacement,
  Boundary,
  Modifier,
  ModifierArguments,
  Padding,
  Placement,
  RootBoundary,
  start,
} from "@popperjs/core";

interface Options {
  allowedAutoPlacements: Array<Placement>;
  altBoundary: boolean;
  boundary: Boundary;
  fallbackPlacements: Array<Placement>;
  flipVariations: boolean;
  padding: Padding;
  rootBoundary: RootBoundary;
}

/**
 * Get the base of a `Placement`, meaning strip off `-start` and `-end`
 *
 * This will also work with `auto`, which is why this is modified from the
 * internal popper version
 */
function getBasePlacement(
  placement: Placement | "auto"
): BasePlacement | "auto" {
  return (placement.split("-")[0] as any) as BasePlacement | "auto";
}

function getExpandedFallbackPlacements(placement: Placement): Array<Placement> {
  if (getBasePlacement(placement) === "auto") {
    return [];
  }

  const oppositePlacement = getOppositePlacement(placement);

  return [
    getOppositeVariationPlacement(placement),
    oppositePlacement,
    getOppositeVariationPlacement(oppositePlacement),
  ];
}

interface OverflowDict {
  placement: Placement;
  overflow: ReturnType<typeof detectOverflow>;
  mainVariationSide: BasePlacement;
  altVariationSide: BasePlacement;
  basePlacement: ReturnType<typeof getBasePlacement>;
}

/**
 * Given a list of `OverflowDict` and the `state`, find the `OverflowDict` that
 * should be displayed. Returns the first placement that will fit without
 * scrolling, and if there are none, then the placement that will require the
 * _leaset_ amount of scrolling.
 */
function findMinimumOverflowPlacement({
  overflowDicts,
  state,
}: {
  overflowDicts: readonly OverflowDict[];
  state: ModifierArguments<Options>["state"];
}) {
  const overflowsWithOverflowMap = overflowDicts.map((overflowDict) => {
    const { y } = state.modifiersData.preventOverflow || { y: 0 };
    const { height } = state.rects.popper;
    const [basePlacement] = overflowDict.placement.split("-");

    const heightProp = basePlacement === "top" ? "top" : "bottom";

    return {
      overflowDict,
      overflowPixels: Math.max(0, overflowDict.overflow[heightProp]),
      // The `overflow` can be negative here; this is how the container can
      // expand when we are resizing to expose more of the clipped content.
      maxHeight: height - overflowDict.overflow[heightProp] - y,
    };
  });

  overflowsWithOverflowMap.sort((a, b) => {
    if (b.overflowPixels !== a.overflowPixels) {
      return a.overflowPixels - b.overflowPixels;
    }

    // If the heights are the same then we have no overflow in these two
    // placements. We must prioritize the user-specified placement order here.
    // While `overflowed` is already in the correct order. Preserving original
    // sort order is explicitly stated to not be stable in the
    // [`Array.prototype.sort`
    // spec](http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.sort)
    //
    // We could build an index for the indicies, but I don't think we'll have
    // any performance issues because the placement lists are short.
    const aPlacementWeight = overflowDicts.findIndex(
      (overflow) => overflow.placement === a.overflowDict.placement
    );
    const bPlacementWeight = overflowDicts.findIndex(
      (overflow) => overflow.placement === b.overflowDict.placement
    );

    return aPlacementWeight - bPlacementWeight;
  });

  return overflowsWithOverflowMap[0];
}

/**
 * Padding can be applied to `preventOverflow`, `flip`, or this modifier. Go
 * through all the modifier options to find it
 */
function getPaddingFromState(
  state: ModifierArguments<Options>["state"]
): Padding {
  return state.orderedModifiers.reduce<Padding>((accumulator, modifier) => {
    if (typeof modifier.options?.padding != "undefined") {
      accumulator = modifier.options.padding;
    }

    return accumulator;
  }, 0);
}

function getPlacementAndMaxSize({
  state,
  options,
}: ModifierArguments<Options>): {
  placement: Placement;
  maxSize: { height: number };
} {
  const {
    fallbackPlacements: specifiedFallbackPlacements,
    padding = getPaddingFromState(state),
    boundary = "clippingParents",
    rootBoundary = "viewport",
    altBoundary,
    flipVariations = true,
    allowedAutoPlacements,
  } = options;

  /**
   * Preferred placement
   *
   * Taken from options
   */
  const preferredPlacement = state.options.placement;

  /**
   * Base placement from `preferredPlacement`
   */
  const basePlacement = getBasePlacement(preferredPlacement);

  /**
   * Represents if the `preferredPlacement` is a `BasePlacement` (meaning it has
   * no `-begin` or `-end`)
   */
  const isBasePlacement = basePlacement === preferredPlacement;

  /**
   * List of fallback placements
   *
   * Either passed in with `specifiedFallbackPlacements`, or calculated
   * depending on
   * [`flipVariations`](https://popper.js.org/docs/v2/modifiers/flip/#flipvariations)
   */
  const fallbackPlacements =
    specifiedFallbackPlacements ||
    (isBasePlacement || !flipVariations
      ? [getOppositePlacement(preferredPlacement)]
      : getExpandedFallbackPlacements(preferredPlacement));

  /**
   * Aggregate of all placements, including preferred and fallbacks.
   */
  const placements = [preferredPlacement, ...fallbackPlacements].reduce<
    Placement[]
  >((acc, placement) => {
    return acc.concat(
      getBasePlacement(placement) === "auto"
        ? computeAutoPlacement(state, {
            placement,
            boundary,
            rootBoundary,
            padding,
            flipVariations,
            allowedAutoPlacements,
          })
        : placement
    );
  }, []);

  const referenceRect = state.rects.reference;
  const popperRect = state.rects.popper;

  /**
   * Array calculated from `placements` with the calculated values of each
   * `placement`. This will be used to determine if we're capable of flipping
   * the element to display it ir of we have to set the `max-height` too.
   */
  const overflows = placements.map<OverflowDict>((placement) => {
    const basePlacement = getBasePlacement(placement);
    const isStartVariation = getVariation(placement) === start;
    const isVertical = basePlacement === "top" || basePlacement === "bottom";
    const len = isVertical ? "width" : "height";

    const overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding,
    });

    let mainVariationSide: BasePlacement = isVertical
      ? isStartVariation
        ? "right"
        : "left"
      : isStartVariation
      ? "bottom"
      : "top";

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (getOppositePlacement(
        mainVariationSide
      ) as any) as BasePlacement;
    }

    const altVariationSide = (getOppositePlacement(
      mainVariationSide
    ) as any) as BasePlacement;

    return {
      placement,
      overflow,
      mainVariationSide,
      altVariationSide,
      basePlacement,
    };
  });

  const minimumOverflowPlacement = findMinimumOverflowPlacement({
    overflowDicts: overflows,
    state,
  });

  return {
    placement: minimumOverflowPlacement.overflowDict.placement,
    maxSize: { height: minimumOverflowPlacement.maxHeight },
  };
}

export const sizeModifier: Modifier<Options> = {
  name: "maxSize",
  enabled: true,
  phase: "main",
  requiresIfExists: ["offset", "preventOverflow", "flip"],
  data: { _skip: false },
  fn: (modifierArguments) => {
    const { placement, maxSize } = getPlacementAndMaxSize(modifierArguments);

    // Set the max height to be written in the `write` phase. See
    // https://www.npmjs.com/package/popper-max-size-modifier and
    // https://codesandbox.io/s/great-tesla-3roz7 for prior art
    modifierArguments.state.modifiersData[modifierArguments.name] = {
      height: maxSize.height,
    };

    // If the placement has changed and we haven't already changed the
    // placement, then change it.
    if (
      modifierArguments.state.placement !== placement &&
      !modifierArguments.state.modifiersData[modifierArguments.name]._skip
    ) {
      modifierArguments.state.modifiersData[
        modifierArguments.name
      ]._skip = true;
      modifierArguments.state.placement = placement;
      modifierArguments.state.reset = true;
    }
  },
};
