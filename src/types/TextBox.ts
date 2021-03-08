import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { Color } from "react-color";
import { v4 } from "uuid";
import { Position } from ".";
import { isBold, isUnderlined, parseStyleToState } from "../utils/textStylesUtil";

export default class TextBox {
  private _id: string;
  private _style: CSSProperties;
  private _position: Position;
  content: string;
  private _state: {
    bold: boolean;
    underlined: boolean;
    italic: boolean;
    alignment: "right" | "left" | "center";
    fontSize: number;
    fontFamily: string;
    color: Color,
  };

  constructor(
    position?: Position,
    content?: string,
    style?: CSSProperties,
    id?: string
  ) {
    this._position = position || { x: 0, y: 0 };
    this._style = style || {};
    if(!this._style.fontFamily){
      this._style.fontFamily = "Roboto"
    }
    this._state = {
      bold: isBold(style?.fontWeight),
      underlined: isUnderlined(style?.textDecoration),
      italic: false,
      alignment: "left",
      fontSize: 14,
      fontFamily: "Roboto",
      color: { r: 0, g: 0, b: 0, a: 1 }
    };
    this._id = id || v4();
    this.content = content || "";
  }

  get id() {
    return this._id;
  }

  get style() {
    return this._style;
  }

  set style(style: CSSProperties) {
    this._state = parseStyleToState(style);
    this._style = style;
  }

  get position() {
    return this._position;
  }

  set position(position: Position) {
    this._position = position;
  }

  get state() {
    return this._state;
  }

  appendStyle(style: CSSProperties) {
    this.style = { ...this.style, ...style };
  }

  toggleBold = (forceValue?: number | string) => {
    const valueExists = typeof forceValue !== "undefined";
    let style = {};
    if (valueExists) {
      style = { fontWeight: forceValue };
    } else {
      style = { fontWeight: this.state.bold ? "unset" : "bold" };
    }
    this.appendStyle(style);
  };

  toggleUnderlined = ( forceValue? : boolean ) => {
    const valueExists = typeof forceValue !== "undefined";
    let style = {};
    if(valueExists){
      const isUnderlined = forceValue;
      style = { textDecorationLine: isUnderlined ? "unset" : "underline" };
    } else {
      style = { textDecorationLine: this.state.underlined? "unset" : "underline" }
    }
    this.appendStyle(style)
  }

  toggleItalic = ( forceValue? :boolean ) => {
    const valueExists = typeof forceValue !== "undefined";
    let style = {};
    if(valueExists){
      const isItalic = forceValue;
      style = { fontStyle: isItalic ? "unset" : "italic" };
    } else {
      style = { fontStyle: this.state.italic? "unset" : "italic" }
    }
    this.appendStyle(style)
  }

  setAlignment = ( value: "center" | "left" | "right" ) => {
    this.appendStyle({ textAlign: value })
  }

  setFontSize = (fontSize: number) => {
    this.appendStyle({ fontSize });
  }
  
  setFontFamily = (fontFamily: string) => {
    this.appendStyle({ fontFamily });
  }

  setColor = (color: string) => {
    this.appendStyle({ color });
  }

  clone = () => {
    const clonedTextbox = new TextBox(this.position, this.content, this.style);
    return clonedTextbox;
  }
}
