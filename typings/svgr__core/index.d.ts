declare module "@svgr/core" {
  export interface Config {
    /**
     * Specify a custom config file.
     *
     * @see https://www.smooth-code.com/open-source/svgr/docs/options/#file-extension
     */
    configFile?: string;

    /**
     * Specify a custom extension for generated files.
     *
     * @see https://www.smooth-code.com/open-source/svgr/docs/options/#file-extension
     */
    ext?: string;

    /**
     * Replace SVG "width" and "height" value by "1em" in order to make SVG size
     * inherits from text size.
     *
     * @see https://www.smooth-code.com/open-source/svgr/docs/options/#native
     */
    icon?: boolean;

    /**
     * Modify all SVG nodes with uppercase and use a specific template with
     * react-native-svg imports. All unsupported nodes will be removed.
     *
     * Override using the API with native: { expo: true } to template SVG nodes
     * with the ExpoKit SVG package. This is only necessary for 'ejected'
     * ExpoKit projects where import 'react-native-svg' results in an error.
     *
     * @see https://www.smooth-code.com/open-source/svgr/docs/options/#native
     */
    native?: boolean | { expo: boolean };

    /**
     * Remove width and height from root SVG tag.
     *
     * @see https://www.smooth-code.com/open-source/svgr/docs/options/#dimensions
     */
    dimensions?: boolean;

    /**
     * All properties given to component will be forwarded on SVG tag. Possible
     * values: "start", "end" or false.
     *
     * @see https://www.smooth-code.com/open-source/svgr/docs/options/#expand-props
     */
    expandProps?: string;

    /**
     * Use Prettier to format JavaScript code output.
     *
     * @see https://www.smooth-code.com/open-source/svgr/docs/options/#prettier
     */
    prettier?: boolean;

    prettierConfig?: object;

    svgo?: boolean;

    svgoConfig?: object;

    ref?: boolean;

    replaceAttrValues?: Record<string | number, string | number>;

    svgProps?: Record<string, string | number>;

    titleProp?: boolean;

    template?: (
      api: any,
      opts: Config,
      state: {
        componentName: string;
        props: object;
        imports: any;
        exports: any;
        jsx: any;
      }
    ) => any;

    plugins?: ReadonlyArray<string>;
  }

  const svgr: (code: string, config: Config, state: any) => Promise<string>;

  export default svgr;
}
