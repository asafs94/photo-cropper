import { CSSProperties } from "@material-ui/core/styles/withStyles";

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

export const parseStyleToState = (style: CSSProperties = {}) => {
  const {
    textDecorationLine,
    fontStyle,
    fontWeight,
    textAlign,
    fontSize,
    fontFamily
  } = style;
  return {
    bold: isBold(fontWeight),
    underlined: isUnderlined(textDecorationLine),
    italic: isItalic(fontStyle),
    fontSize: parseFontSizetoNumber(fontSize),
    alignment: getAlignment(textAlign),
    fontFamily: fontFamily || "Roboto",
  };
};
