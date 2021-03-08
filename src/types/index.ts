

export interface IdentifiedItem {
    id: any;
}

export interface Position {
    x: number,
    y: number
}


export type setStatePayload<T> = T | ((item: T) => T) 


export type Filter<T> = (value: T, index: number, array: T[]) => boolean;