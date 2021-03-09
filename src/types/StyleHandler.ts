import { CSSProperties } from "@material-ui/styles";
import { RGBColor } from "react-color";
import { HorizontalAlignment } from ".";
import { FontWeight } from "./StylesDefinitions";
import TextState from "./TextboxState";

export default class StyleHandler {
    private _state: TextState;
    private _style: CSSProperties;

    constructor( state: TextState ){
       this._state = state;
       this._style = this.getStyle(state);
    }

    get state(){
        return this._state;
    }

    get style(){
        return this._style;
    }

    setState( state: Partial<TextState> ){
        this._state = { ...this._state, ...state };
        this._style = this.getStyle(this._state);
    }

    private getStyle(state: TextState): CSSProperties{
        const { bold, underlined, italic, alignment, shadow, color, fontFamily, fontSize } = state;
        return {
            fontWeight: bold.value,
            fontStyle: italic? "italic" : "unset",
            textDecorationLine: underlined? "underline" : "unset",
            textAlign: alignment,
            textShadow: shadow.parseToCss(),
            color: `rgba(${color.r}, ${color.g},${color.b},${color.a || '1'})`,
            fontFamily,
            fontSize,
        };
    }

    toggleBold( value?: FontWeight ){
        const boldHandler = this.state.bold;
        if(value){
            boldHandler.value = value;
        } else {
            boldHandler.toggleBold();
        }
        this.setState({ bold: boldHandler })
    }

    toggleUnderlined( value?: boolean ){
        let _value;
        if(typeof value === "undefined"){
            _value = !this.state.underlined;
        } else {
            _value = value;
        };
        this.setState({ underlined: _value });
    }

    toggleItalic( value? : boolean ){
        let _value;
        if(typeof value === "undefined"){
            _value = !this.state.italic;
        } else {
            _value = value;
        };
        this.setState({ italic: _value });
    }

    setAlignment( value: HorizontalAlignment ){
        this.setState({ alignment: value });
    }

    setFontSize( value: number ){
        this.setState({ fontSize: value });
    }

    setFontFamily( value: string ){
        this.setState({ fontFamily: value });
    }

    setColor( value: RGBColor ){
        this.setState({ color: value })
    }

    
}