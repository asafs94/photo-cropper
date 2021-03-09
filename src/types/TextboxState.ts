import { RGBColor } from "react-color";
import { HorizontalAlignment } from ".";
import { FontWeightHandler, StyleState, TextShadow } from "./StylesDefinitions";

export default interface TextState extends StyleState {
    bold: FontWeightHandler;
    underlined: boolean;
    italic: boolean;
    alignment: HorizontalAlignment;
    fontSize: number;
    fontFamily: string;
    color: RGBColor,
    shadow: TextShadow
}