import { Position } from ".";
import { CroppableImage } from "./CroppableImage";


interface ConstructorPayload {
    croppableImage?: CroppableImage,
    file?: File,
    position?: Position,
    zoom?: number,
    url?: string
}

export default class EditableImage extends CroppableImage {
    layers: Array<any> 

    constructor(payload: ConstructorPayload){
        if(payload.croppableImage){
            const { url, id, position, zoom } = payload.croppableImage;
            super(undefined, position, zoom, url, id);
        } else {
            const { file, position, zoom, url } = payload;
            super(file, position, zoom, url);
        }
        this.layers = [];
    }
}