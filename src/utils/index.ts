import { IdentifiedItem, setStatePayload } from "../types";


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