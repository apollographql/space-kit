// import { Instance, ReferenceElement } from "tippy.js";
import detectOverflow from "@popperjs/core/lib/utils/detectOverflow";
import getBasePlacement from "@popperjs/core/lib/utils/getBasePlacement";
import getOppositePlacement from "@popperjs/core/lib/utils/getOppositePlacement";
import getOppositeVariationPlacement from "@popperjs/core/lib/utils/getOppositeVariationPlacement";
import {
  Padding,
  Boundary,
  RootBoundary,
  Modifier,
  ModifierArguments,
  Placement,
  auto,
  right,
  left,
  top,
  bottom,
} from "@popperjs/core";

interface Options {
  fallbackPlacements: Array<Placement>;
  padding: Padding;
  boundary: Boundary;
  rootBoundary: RootBoundary;
  altBoundary: boolean;
  flipVariations: boolean;
}

function getExpandedFallbackPlacements(placement: Placement): Array<Placement> {
  const oppositePlacement = getOppositePlacement(placement);

  return [
    getOppositeVariationPlacement(placement),
    oppositePlacement,
    getOppositeVariationPlacement(oppositePlacement),
  ];
}

const hash = { left: "right", right: "left", bottom: "top", top: "bottom" };

function sizeFn({ state, options, name }: ModifierArguments<Options>) {
  if (state.modifiersData[name]._skip) {
    return;
  }

  const {
    fallbackPlacements: specifiedFallbackPlacements,
    padding,
    boundary,
    rootBoundary,
    altBoundary,
    flipVariations = true,
  } = options;

  const preferredPlacement = state.options.placement;
  const basePlacement = getBasePlacement(preferredPlacement);
  const isBasePlacement = basePlacement === preferredPlacement;

  const fallbackPlacements =
    specifiedFallbackPlacements ||
    (isBasePlacement || !flipVariations
      ? [getOppositePlacement(preferredPlacement)]
      : getExpandedFallbackPlacements(preferredPlacement));

  const placements = [preferredPlacement, ...fallbackPlacements].reduce(
    (acc, placement) => {
      return acc.concat(
        getBasePlacement(placement) === auto
          ? computeAutoPlacement(state, {
              placement,
              boundary,
              rootBoundary,
              padding,
              flipVariations,
            })
          : placement
      );
    },
    []
  );

  const referenceRect = state.rects.reference;
  const popperRect = state.rects.popper;

  const checksMap = new Map<Placement, boolean[]>();
  let makeFallbackChecks = true;
  let firstFittingPlacement = placements[0];

  for (let i = 0; i < placements.length; i++) {
    const placement = placements[i];
    const basePlacement = getBasePlacement(placement);
    const isStartVariation = getVariation(placement) === start;
    const isVertical = [top, bottom].indexOf(basePlacement) >= 0;
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
        ? right
        : left
      : isStartVariation
      ? bottom
      : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    const altVariationSide = getOppositePlacement(mainVariationSide);

    const checks = [
      overflow[basePlacement] <= 0,
      overflow[mainVariationSide] <= 0,
      overflow[altVariationSide] <= 0,
    ];

    if (checks.every((check) => check)) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    const numberOfChecks = flipVariations ? 3 : 1;

    for (let i = numberOfChecks; i > 0; i--) {
      const fittingPlacement = placements.find((placement) => {
        const checks = checksMap.get(placement);
        if (checks) {
          return checks.slice(0, i).every((check) => check);
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        break;
      }
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}

export const sizeModifier: Modifier<Options> = {
  name: "size",
  enabled: true,
  phase: "main",
  fn: sizeFn,
  requiresIfExists: ["offset"],
  data: { _skip: false },
};
