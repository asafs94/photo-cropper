import { useCallback, useState } from "react"


export function useToggleable(defaultOn: boolean = false) : [boolean, (value?: any) => void] {
    const [on, setOn] = useState<boolean>(defaultOn);

    const toggle = useCallback( (value?: any)=>{
        if( typeof value !== "boolean" ){
            setOn( _on => !_on );
        } else {
            setOn(value);
        }
    }, [setOn]);

    return [on, toggle];
}