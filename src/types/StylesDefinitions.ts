import { RGBColor } from "react-color";
import { rgbColorsAreEqual } from "../utils/textStylesUtil";

export type TextShadowPayload = {
    h: number,
    v: number,
    blurRadius: number,
    color?: RGBColor
}

export class TextShadow {

    isEqual(t2: TextShadow){
        const { h, v,blurRadius, color } = this;        
        const equalColors = !color && !t2.color || rgbColorsAreEqual(color as RGBColor, t2.color as RGBColor);
        return  h === t2.h && v === t2.v && blurRadius === t2.blurRadius && equalColors
    }

    /**
         * The position of the horizontal shadow in pixels. Negative values are allowed.
         */
    h: number;	
    /**
     * The position of the vertical shadow in pixels. Negative values are allowed.
     */
    v: number;
    /**
     * The blur radius in pixels.
     */
    blurRadius: number;
    /**
     * The color of the shadow.
     */
    color?: RGBColor

    constructor({h, v, blurRadius, color} : TextShadowPayload = { h:0, v:0, blurRadius: 0 }){
        this.h = h;
        this.v = v;
        this.blurRadius = blurRadius;
        this.color = color;
    }

    parseToCss(){
        const { color } = this;
        const parsedColor = color? `rgba(${color.r},${color.g},${color.b},${color.a})` : '';
        return `${this.v}px ${this.h}px ${this.blurRadius}px ${parsedColor}`;
    }
}


export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | "normal" | "bold" | "bolder" | "lighter";

export class FontWeightHandler {
    private _value: FontWeight;
    private _isBold: boolean;

    constructor(value: FontWeight){
        this._isBold = this.parseIsBold(value);
        this._value = value;
    }

    set value (value: FontWeight){
        this._isBold = this.parseIsBold(value);
        this._value = value;
    } 

    get value (){
        return this._value;
    }

    get isBold (){
        return this._isBold;
    }

    parseIsBold(value: FontWeight){
        if( [100,200,300,400,"lighter","normal"].includes(value) ){
            return false;
        } else {
            return true;
        }
    }

    toggleBold(){
        if(this.isBold){
            this.value = "normal";
        } else {
            this.value = "bold";
        }
    }


}