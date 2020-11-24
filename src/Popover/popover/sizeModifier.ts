import computeAutoPlacement from "@popperjs/core/lib/utils/computeAutoPlacement";
import detectOverflow from "@popperjs/core/lib/utils/detectOverflow";
import getOppositePlacement from "@popperjs/core/lib/utils/getOppositePlacement";
import getOppositeVariationPlacement from "@popperjs/core/lib/utils/getOppositeVariationPlacement";
import {
  BasePlacement,
  Boundary,
  Modifier,
  ModifierArguments,
  Padding,
  Placement,
  Rect,
  RootBoundary,
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

/**
 * Find the placement with the minimum vertical overflow. If there is a tie
 * between placements, the first placement wins.
 */
function findPlacementWithMinimumVerticalOverflow({
  placementOverflows,
  popperRect,
  preventOverflow = { x: 0, y: 0 },
}: {
  placementOverflows: {
    placement: Placement;
    overflow: ReturnType<typeof detectOverflow>;
  }[];
  popperRect: Rect;
  preventOverflow?: { x: number; y: number };
}) {
  const { height } = popperRect;
  const { y } = preventOverflow;

  const placementCalculations = placementOverflows.map(
    ({ placement, overflow }) => {
      const verticalOverflow =
        overflow[getBasePlacement(placement) === "top" ? "top" : "bottom"];

      return {
        placement,
        overflowPixels: Math.max(0, verticalOverflow),
        // The `overflow` can be negative here; this is how the container can
        // expand when we are resizing to expose more of the clipped content.
        maxHeight: height - verticalOverflow - y,
      };
    }
  );

  // Sort `placementCalculations` by which placement has the least overflow
  // pixels. If there is a tie, use the preferred placement.
  placementCalculations.sort((a, b) => {
    if (b.overflowPixels !== a.overflowPixels) {
      return a.overflowPixels - b.overflowPixels;
    }

    // If the heights are the same then we have no overflow in these two
    // placements. We must prioritize the user-specified placement order here.
    // While `overflowed` is already in the correct order, preserving original
    // sort order is explicitly stated to not be stable in the
    // [`Array.prototype.sort`
    // spec](http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.sort)
    //
    // We could build an index for the indicies, but I don't think we'll have
    // any performance issues because the placement lists are short.
    const aPlacementWeight = placementOverflows.findIndex(
      (overflow) => overflow.placement === a.placement
    );
    const bPlacementWeight = placementOverflows.findIndex(
      (overflow) => overflow.placement === b.placement
    );

    return aPlacementWeight - bPlacementWeight;
  });

  return placementCalculations[0];
}

/**
 * Generate a list of `Placement`s given the modifier options
 */
function buildPlacementsList({
  state,
  options,
}: ModifierArguments<Options>): readonly Placement[] {
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
   *
   * Copied verbatim from popper's flip modifier source; @see
   * https://github.com/popperjs/popper-core/blob/de867743d4b841af88675691064c8271452e150f/src/modifiers/flip.js#L55-L59
   */
  const fallbackPlacements =
    options.fallbackPlacements ||
    (isBasePlacement || !options.flipVariations
      ? [getOppositePlacement(preferredPlacement)]
      : getExpandedFallbackPlacements(preferredPlacement));

  /**
   * Aggregate of all placements, including preferred and fallbacks.
   *
   * This is copied verbatim from the popper's flip modifier source; @see
   * https://github.com/popperjs/popper-core/blob/de867743d4b841af88675691064c8271452e150f/src/modifiers/flip.js#L61-L77
   */
  return [preferredPlacement, ...fallbackPlacements].reduce<Placement[]>(
    (acc, placement) => {
      return acc.concat(
        getBasePlacement(placement) === "auto"
          ? computeAutoPlacement(state, {
              ...options,
              placement,
            } as any)
          : placement
      );
    },
    []
  );
}

/**
 * Calculate the placement and max size
 */
function getPlacementAndMaxSize(
  modifierArguments: ModifierArguments<Options>
): {
  placement: Placement;
  maxSize: { height: number };
} {
  const { state, options } = modifierArguments;
  const placements = buildPlacementsList(modifierArguments);

  /**
   * Array calculated from `placements` with the calculated values of each
   * `placement`. This will be used to determine if we're capable of flipping
   * the element to display it or of we have to set the `max-height` too.
   */
  const placementOverflows = placements.map((placement) => ({
    placement,
    overflow: detectOverflow(state, {
      ...options,
      placement,
    }),
  }));

  const minimumOverflowPlacement = findPlacementWithMinimumVerticalOverflow({
    placementOverflows,
    popperRect: state.rects.popper,
    preventOverflow: state.modifiersData.preventOverflow,
  });

  return {
    placement: minimumOverflowPlacement.placement,
    maxSize: {
      height: minimumOverflowPlacement.maxHeight,
    },
  };
}

/**
 * Popper [modifier](https://popper.js.org/docs/v2/modifiers/) based on popper's
 * built-in [flip]() modifier and the community
 * [`maxSize`](https://www.npmjs.com/package/popper-max-size-modifier). Neither
 * of those fit our needs because the `flip` modifier can't make an element
 * scrollable and the max size modifier only sets the max size, it doesn't try
 * to figure out the best position to use with a max size.
 *
 * This combines the logic of those two to create a modifier that will behave
 * exactly like `flip`, but if there are no placements that can display the
 * element in it's entirety, it'll find the placement that can show the most
 * content with a max-height.
 */
export const sizeModifier: Modifier<"maxSize", Options> = {
  name: "maxSize",
  enabled: true,
  phase: "main",
  requiresIfExists: ["offset", "preventOverflow", "flip"],
  // `_skip` is a custom property we use internally to prevent us from flipping
  // more than once in a single tick.
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
      // If we're applying a new position, then all other modifiers need to be
      // completely re-run, which is what setting `state.reset = true` does.
      // @see https://popper.js.org/docs/v2/modifiers/#fn
      modifierArguments.state.reset = true;
    }
  },
};
