import { Position } from ".";
import { CroppableImage } from "./CroppableImage";
import TextBox from "./TextBox";


interface ConstructorPayload {
    croppableImage?: CroppableImage,
    file?: File,
    position?: Position,
    zoom?: number,
    url?: string
}

export default class EditableImage extends CroppableImage {
    private _textboxes: Array<TextBox> 

    constructor(payload: ConstructorPayload){
        if(payload.croppableImage){
            const { url, id, position, zoom } = payload.croppableImage;
            super(undefined, position, zoom, url, id);
        } else {
            const { file, position, zoom, url } = payload;
            super(file, position, zoom, url);
        }
        this._textboxes = [];
    }

    set textboxes( textboxes: TextBox[] ){
        this._textboxes = textboxes;
    }

    get textboxes(){
        return this._textboxes;
    }
}