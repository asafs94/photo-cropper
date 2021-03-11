import { RGBColor } from "react-color";
import { v4 } from "uuid";
import { HorizontalAlignment, Position } from ".";
import { positionsAreEqual } from "../utils";
import StyleHandler from "./StyleHandler";
import { FontWeight, FontWeightHandler, TextShadow } from "./StylesDefinitions";
import TextState from "./TextboxState";


export default class TextBox {
  private _id: string;
  private _position: Position;
  content: string;
  private styleHandler: StyleHandler


  isEqual( t2: TextBox ){
    return this.id === t2.id;
  }

  /**
   * Checks by values if two textboxes are the same. (not by id).
   * @param t1 
   * @param t2 
   */
  isEqualbyValues( t2: TextBox ){
    const t1 = this;
    const equalPositions = positionsAreEqual(t1.position, t2.position);
    const equalContent = t1.content === t2.content;
    const equalStyleHandlerStates = t1.styleHandler.isEqual(t2.styleHandler);
    return equalContent && equalPositions && equalStyleHandlerStates;
  }

  constructor(
    position?: Position,
    content?: string,
    styleHandler?: StyleHandler,
    id?: string
  ) {
    this._position = position || { x: 0, y: 0 };
    this.styleHandler = styleHandler ||  new StyleHandler({
      bold: new FontWeightHandler(400),
      underlined: false,
      italic: false,
      alignment: "left",
      fontSize: 20,
      fontFamily: "Roboto",
      color: { r: 0, g: 0, b: 0, a: 1 },
      shadow: new TextShadow(),
    });
    this._id = id || v4();
    this.content = content || "";
  }

  get id() {
    return this._id;
  }

  get style() {
    return this.styleHandler.style;
  }

  get state(){
    return this.styleHandler.state;
  }

  setStyle( partialStyle: Partial<TextState> ){
    this.styleHandler.setState(partialStyle)
  }

  get position() {
    return this._position;
  }

  set position(position: Position) {
    this._position = position;
  }

  toggleBold = (forceValue?: FontWeight) => {
    this.styleHandler.toggleBold(forceValue)
  };

  toggleUnderlined = ( forceValue? : boolean ) => {
    this.styleHandler.toggleUnderlined(forceValue);
  }

  toggleItalic = ( forceValue? :boolean ) => {
    this.styleHandler.toggleItalic(forceValue);
  }

  setAlignment = ( value: HorizontalAlignment ) => {
    this.styleHandler.setAlignment(value)
  }

  setFontSize = (fontSize: number) => {
    this.styleHandler.setFontSize(fontSize);
  }
  
  setFontFamily = (fontFamily: string) => {
    this.styleHandler.setFontFamily(fontFamily)
  }

  setColor = (color: RGBColor) => {
    this.styleHandler.setColor(color)
  }

  clone = () => {
    const clonedTextbox = new TextBox(this.position, this.content, this.styleHandler);
    return clonedTextbox;
  }
}
