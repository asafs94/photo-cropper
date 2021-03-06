import { RGBColor } from "react-color";
import { HorizontalAlignment } from ".";
import { FontWeightHandler, TextShadow, TextStroke } from "./StylesDefinitions";

export default interface TextState {
    bold: FontWeightHandler;
    underlined: boolean;
    italic: boolean;
    alignment: HorizontalAlignment;
    fontSize: number;
    fontFamily: string;
    color: RGBColor,
    shadow: TextShadow,
    stroke: TextStroke
}