import {
  StyleSheet as OriginalStyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";

type StyleFunction = (
  props: any | undefined
) => ViewStyle | TextStyle | ImageStyle;

declare namespace StyleSheetWithProps {
  type NamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle | StyleFunction;
  };

  export function create<T extends NamedStyles<T> | NamedStyles<any>>(
    // The extra & NamedStyles<any> here helps Typescript catch typos: e.g.,
    // the following code would not error with `styles: T | NamedStyles<T>`,
    // but would error with `styles: T & NamedStyles<any>`
    //
    // ```ts
    // StyleSheet.create({
    //   someComponent: { marginLeft: 1, magrinRight: 1 },
    // });
    // ```
    styles: T & NamedStyles<any>
  ): T;
}

export const StyleSheet: typeof StyleSheetWithProps &
  typeof OriginalStyleSheet = OriginalStyleSheet as any;
