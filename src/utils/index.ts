import { IdentifiedItem } from "../types";


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
export function setItemById<T extends IdentifiedItem>( id: any, callback: (item: T)=>void ){
    return (array: Array<T>) => {
        return array.map( item => {
            if(item.id === id){
                callback(item);
            }
            return item;
        })
    }
}