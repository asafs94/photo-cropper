import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { getItemById, setItemById } from "..";
import { IdentifiedItem } from "../../types";



export function useSingle<T extends IdentifiedItem>( id: any, array: T[], setArray: Dispatch<SetStateAction<T[]>>){
    const [ item, setItem ] = useState<T>();

    useEffect(() => {
        const _item = getItemById(id, array);
        setItem( _item )
    }, [id, array, setItem]);

    const _setItem = useCallback(( setAction: SetStateAction<T> ) => {
        setArray( setItemById( id, setAction ) );
    }, [setArray, id])


    return [item, _setItem] as const;
}