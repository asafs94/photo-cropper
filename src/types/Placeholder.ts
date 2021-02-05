import { CroppableImage } from "./CroppableImage";

import placeholder from '../resources/placeholder.jpg';

export class PlaceholderImage extends CroppableImage {
    constructor(){
        super(undefined, undefined, undefined, placeholder);
    }
}