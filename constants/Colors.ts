/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#ffffff";

//         ["light",     "dark"]
const colors = {
  primary: ["#39ebb0", "#1dbe88"],

  secondary: ["#89ccf0", "#053c59"],
  text: ["#106c57", "#f0efef"],
  background: ["#ffffff", "#052b3f"],
  tint: [tintColorLight, tintColorDark],
  icon: ["#1dbe88", "#1dbe88"],
  tabIconDefault: ["#687076", "#9BA1A6"],
  tabIconSelected: [tintColorLight, tintColorDark],
  error: ["#9f0e0e", "#b9330f"],
};

export const Colors = {
  light: Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [key, value[0]])
  ),

  dark: Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [key, value[1]])
  ),
};
