import { useCallback, useContext, useEffect, useState } from "react"
import { ImageContext } from "../../hoc/ImageProvider"
import { Position } from "../../types";
import { CroppableImage } from "../../types/CroppableImage";



interface CroppableProperties {
    position?: { x: number, y: number},
    zoom?: number
}


export const useCroppable = (id: string) => {
    const { croppableImages, setCroppables } = useContext(ImageContext);
    const [croppable, setCroppable] = useState<CroppableImage>()
    

    useEffect(() => {
        setCroppable(croppableImages?.find( _croppable => _croppable.id === id));
    }, [id, setCroppable, croppableImages]);

    const setPosition = useCallback( (position: Position) => {
        setCroppables(setCroppablePosition(id, position));
    }, [setCroppables, id] )

    const setZoom = useCallback((zoom: number)=>{
        setCroppables(setCroppableZoom(id, zoom))
    }, [setCroppables, id])

    return { setPosition, croppable, setZoom }

}


const setCroppablePosition = (id: string, position: Position) => (croppables: Array<CroppableImage>)  => {
    const _croppables = [...croppables];
    const croppable = _croppables.find(c=> c.id === id);
    if(!croppable){
        return croppables;
    }
    croppable.position = position;
    return _croppables;
}

const setCroppableZoom = (id: string, zoom: number) => (croppables: Array<CroppableImage>)  => {
    const _croppables = [...croppables];
    const croppable = _croppables.find(c=> c.id === id);
    if(!croppable){
        return croppables;
    }
    croppable.zoom = zoom;
    return _croppables;
}