import { useCallback, useContext, useEffect, useState } from "react"
import { useSingle } from ".";
import { ImageContext } from "../../hoc/ImageProvider"
import { Position } from "../../types";
import { CroppableImage } from "../../types/CroppableImage";
import TextBox from "../../types/TextBox";


const useSingleEditableImage = (id: string) => {
    const { images, setImages } = useContext(ImageContext);
    return useSingle(id, images, setImages);
}


export const useEditableImage = (id: string) => {
    const [image, setImage] = useSingleEditableImage(id)

    const setCrop = useCallback( (crop: Position) => {
        setImage((c) => { 
            c.crop = crop;
            return c;
         });
    }, [setImage, id] )

    const setZoom = useCallback((zoom: number)=>{
       setImage(c => {
           c.zoom = zoom;
           return c;
       })
    }, [setImage, id])



    return { setCrop, image, setZoom }

}


export const useImageTextboxes = (imageId: string) => {
    const [ image, setImage ] = useSingleEditableImage(imageId);
    const [ textboxes, setTextboxes ] = useState<TextBox[]>([]);

    const submitTextboxes = useCallback(()=>{
        setImage(editable => {
            editable.textboxes = textboxes;
            return editable;
        })
    },[setImage])

    const getTextboxes = useCallback(()=>{
        const textboxesCopy = JSON.parse(JSON.stringify(image?.textboxes || [])) as TextBox[];
        return textboxesCopy;
    },[image])


    useEffect(()=>{
        setTextboxes(getTextboxes());
    },[setTextboxes, getTextboxes]);

    return { textboxes, setTextboxes, submitTextboxes }

 }



const applyCroppablePropsToAll = (croppable: CroppableImage) => (croppables: Array<CroppableImage>) => {
    const _croppables = [...croppables];
    _croppables.forEach( c => {
        c.crop = croppable.crop;
        c.zoom = croppable.zoom;
    });
    return _croppables;
}