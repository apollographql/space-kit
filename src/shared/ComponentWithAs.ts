/**
 * all the types `as` can be
 */
export type AsType = React.ReactElement | keyof JSX.IntrinsicElements;

export type ComponentWithAs<
  OriginalComponentProps,
  DefaultAs extends AsType
> = <
  // This doesn't include `React.ComponentType` because I couldn't figure out
  // how to correctly type it's `P` (props) generic. The default is `{}`, which
  // will cause TypeScript to prevent any props besides `PropWithChildren{}`. If
  // we use `<any>`, then (for whatever reason), TypeScript stops checking the
  // props when `as extends keyof JSX.IntrinsicElements`.
  As extends AsType = DefaultAs
>(
  props: React.PropsWithChildren<
    ({ as?: As }) &
      OriginalComponentProps &
      (As extends keyof JSX.IntrinsicElements
        ? JSX.IntrinsicElements[As]
        : As extends React.ReactElement
        ? {}
        : never)
  >
) => ReturnType<React.FC>;
