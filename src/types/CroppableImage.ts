import { Position } from ".";
import { v4 } from 'uuid';

export class CroppableImage {

    private _id: string;
    public crop: Position;
    public zoom: number;
    private _url: string; 

    constructor( file?: File, crop? : Position, zoom?: number, url?: string, id?: string ){
        if(!file && !url){
            throw new Error(`Cannot set a new CroppableImage without providing either file or url. Data Provided: ${{file, position: crop, zoom ,url}}` );
        }
        this._id = id || v4();
        this.crop = crop || { x:0, y:0 };
        this.zoom = zoom || 1;
        this._url = file? URL.createObjectURL(file) : (url as string);
    }

    public get id(){
        return this._id;
    }

    public get url(){
        return this._url;
    }

}