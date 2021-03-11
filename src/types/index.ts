

export interface IdentifiedItem {
    id: any;
}

export interface Position {
    x: number,
    y: number
}

export type HorizontalAlignment = "left" | "right" | "center";

export type TextStyle = "bold" | "italic" | "underlined";

export type setStatePayload<T> = T | ((item: T) => T) 


export type Filter<T> = (value: T, index: number, array: T[]) => boolean;