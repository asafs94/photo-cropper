import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { RGBColor } from "react-color";
import { colorValues } from "./colors";

export const isBold = (fontWeight: string | number | undefined) => {
  if (!fontWeight) {
    return false;
  }
  const numericValue =
    typeof fontWeight === "number"
      ? fontWeight
      : isNaN(Number(fontWeight))
      ? undefined
      : Number(fontWeight);
  if (numericValue) {
    return numericValue > 400;
  }
  return ["bold", "bolder"].includes(fontWeight as string);
};

export const isUnderlined = (
  textDecorationLine: string | number | undefined
) => {
  return textDecorationLine === "underline";
};

export const isItalic = (fontStyle: string | undefined) => {
  return fontStyle === "italic";
};

export const parseFontSizetoNumber: (
  fontSize: number | string | undefined
) => number = (fontSize) => {
  if (!fontSize) {
    return 14;
  }
  if (typeof fontSize === "number") {
    return fontSize as number;
  }
  const _fontSize = fontSize as string;
  if (!_fontSize.includes("px")) {
    return 14;
  } else {
    return  Number(_fontSize.replace(/([^0-9])+/i, ""))
  }
};

export const getAlignment: (
  textAlign: string | undefined
) => "center" | "left" | "right" = (textAlign) => {
  if (!textAlign || !["center", "right"].includes(textAlign)) {
    return "left";
  } else {
    return textAlign as "center" | "right";
  }
};

export const colorToRgba = ( color: string = "rgb(0,0,0)" ) => {
 const [r,g,b,a] = colorValues(color) || [0,0,0,0];
 return {r,g,b,a};
}

export const parseStyleToState = (style: CSSProperties = {}) => {
  const {
    textDecorationLine,
    fontStyle,
    fontWeight,
    textAlign,
    fontSize,
    fontFamily,
    color
  } = style;
  return {
    bold: isBold(fontWeight),
    underlined: isUnderlined(textDecorationLine),
    italic: isItalic(fontStyle),
    fontSize: parseFontSizetoNumber(fontSize),
    alignment: getAlignment(textAlign),
    fontFamily: fontFamily || "Roboto",
    color: colorToRgba(color)
  };
};


export const rgbColorsAreEqual = (...colors: RGBColor[]) => {
  const [color1, ...rest] = colors;
  return rest.every( color2 => {
    return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b && color1.a === color2.a;
  })
}