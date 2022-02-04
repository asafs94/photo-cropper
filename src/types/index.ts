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

export type RecursivePartial<T> = {
    [P in keyof T]?:
      T[P] extends (infer U)[] ? RecursivePartial<U>[] :
      T[P] extends object ? RecursivePartial<T[P]> :
      T[P];
  };

export interface Request<T> { 
    resolve: (value: void | PromiseLike<void>) => void,
    reject: (reason?: any) => void,
 }