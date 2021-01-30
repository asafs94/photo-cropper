import { useCallback, useEffect, useState } from "react"



export const useOrderedArray = (sourceArray: Array<any>, limitedLength: number) => {
    
    const [orderedArray, setOrderedArray] = useState(sourceArray);

    useEffect(() => {
        setOrderedArray( ordered => getMatchedSrcArray(ordered, sourceArray, limitedLength) );
    }, [sourceArray, setOrderedArray, limitedLength]);

    const reorderArray = useCallback(
        (newOrdered) => {
            setOrderedArray(newOrdered);
        },
        [setOrderedArray],
    )

    return {
        orderedArray, reorderArray
    }
}


const getMatchedSrcArray = (_ordered: Array<any>, sourceArray: Array<any>, limitedLength: number) => {
    let ordered = new Array(limitedLength).fill(null);
    const opposite = [..._ordered].reverse();
    ordered = Array.from( ordered, item => {
        if(!item && opposite.length){
            return opposite.pop();
        } else {
            return item;
        }
    });
    //Get New only:
    const newItems = sourceArray.filter( item => !ordered.includes(item) ).reverse();
    //Replace non existent with new items:
    ordered = Array.from( ordered, item => {
        const itemDoesntExist = !sourceArray.includes(item);
        if( (!item || itemDoesntExist) && newItems.length){
            return newItems.pop();
        } else if(itemDoesntExist) {
            return null;
        } else {
            return item;
        }
    });
     return ordered;
}


