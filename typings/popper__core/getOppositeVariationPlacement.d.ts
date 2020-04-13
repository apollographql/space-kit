declare module "@popperjs/core/lib/utils/getOppositeVariationPlacement" {
  import { BasePlacement } from "@popperjs/core";

  import { JSXElement } from "@babel/types";

  function getOppositePlacement(placement: BasePlacement): BasePlacement;

  export default getOppositePlacement;
}
