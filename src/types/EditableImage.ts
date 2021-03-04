import { Position } from ".";
import { CroppableImage } from "./CroppableImage";
import TextBox from "./TextBox";


interface ConstructorPayload {
    croppableImage?: CroppableImage,
    file?: File,
    crop?: Position,
    zoom?: number,
    url?: string
}

export default class EditableImage extends CroppableImage {
    private _textboxes: Array<TextBox> 
    locked: boolean;

    constructor(payload: ConstructorPayload){
        const { file, crop, zoom, url } = payload;
        super(file, crop, zoom, url);
        this._textboxes = [];
        this.locked = false;
    }

    set textboxes( textboxes: TextBox[] ){
        this._textboxes = textboxes;
    }

    get textboxes(){
        return this._textboxes;
    }
}