import { IdentifiedItem, setStatePayload } from "../types";
import { PlaceholderImage } from "../types/Placeholder";


export const isImageFile = (file: File) => {
    return file && file['type'].split('/')[0] === 'image';
}

export const lineBreakCount = (str: string) => {
	return((str.match(/[^\n]*\n[^\n]*/gi)?.length || 0));
}

/**
 * Returns a setter of a specific item with an id in an array.
 * @param id 
 * @param callback 
 */
export function setItemById<T extends IdentifiedItem>( id: any, setState: setStatePayload<T> ){
    return (array: Array<T>) => {
        return array.map( item => {
            if(item.id === id){
                if( typeof setState === "function" ){
                    item = setState(item);
                } else {
                    item = setState;
                }
            }
            return item;
        })
    }
}


export function getItemById<T extends IdentifiedItem>(id: any, array: T[]){
    return array.find(byId(id));
}


export const byId = (id: any) => (item: IdentifiedItem) => {
    return item.id === id;
}


export function removeDuplicates<T>(arr: Array<T>){
    return Array.from(new Set(arr));
}


export async function appendImages<EditableImage>( oldArray: EditableImage[], newArray: EditableImage[], maxLength: number, solveConflict: (oldArray: EditableImage[], newArray: EditableImage[], maxLength: number) => Promise<EditableImage[]> | EditableImage[] ) {
    const oldArray_withoutPlaceholders = oldArray.filter( image => !(image instanceof PlaceholderImage) );
    if( oldArray_withoutPlaceholders.length + newArray.length > maxLength ){
        return await solveConflict(oldArray, newArray, maxLength);
    };
    return [...oldArray_withoutPlaceholders, ...newArray];
}

export function capitalize( str: string ){
    return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
}