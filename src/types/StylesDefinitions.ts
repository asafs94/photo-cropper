import { RGBColor } from "react-color";

export interface StyleState {

}


export class TextShadow {
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

    constructor(h: number, v: number, blurRadius: number, color?: RGBColor){
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