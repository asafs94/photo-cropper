import placeholder from '../resources/placeholder.jpg';
import EditableImage from "./EditableImage";

export class PlaceholderImage extends EditableImage {
    constructor(){
        super({ url: placeholder });
    }
}