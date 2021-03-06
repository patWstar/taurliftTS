import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primaryColor: string;
    secondaryColorLight: string;
    secondaryColorDark: string;
    textColor: string;

    navBarColor: string;
    containerBackgroundPrimary: string;
    containerBackgroundSecondary: string;

    fontSmall: string;
    fontMedium: string;
    fontMediumLarge: string;
    fontLarge: string;
    fontExtraLarge: string;
    fontExtremeLarge: string;
  }
}

export const theme: DefaultTheme = {
  //Color Palette
  primaryColor: "#3498db",
  secondaryColorLight: "#2ecc71",
  secondaryColorDark: "#1b914c",
  textColor: "#f5f4eb",

  navBarColor: "#0c0c0c",
  containerBackgroundPrimary: "rgba(0, 0, 0, 0.6)",
  containerBackgroundSecondary: "#1a1818",

  fontSmall: "0.75rem",
  fontMedium: "1.25rem",
  fontMediumLarge: "1.5rem",
  fontLarge: "2rem",
  fontExtraLarge: "3rem",
  fontExtremeLarge: "3.4rem",
};
