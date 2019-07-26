import camelcase from "camelcase";

export function formatComponentName(basename: string): string {
  return camelcase(basename.replace(/@\d+x\d+/, "").replace(/-sl$/, ""), {
    pascalCase: true,
  });
}
