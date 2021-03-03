import { useCallback, useContext, useEffect, useState } from "react"
import { useSingle } from ".";
import { ImageContext } from "../../hoc/ImageProvider"
import { Position } from "../../types";
import { CroppableImage } from "../../types/CroppableImage";
import EditableImage from "../../types/EditableImage";
import TextBox from "../../types/TextBox";


const useSingleEditableImage = (id: string) => {
    const { images, setImages } = useContext(ImageContext);
    return useSingle(id, images, setImages);
}


export const useEditableImage = (id: string) => {
    const [image, setImage] = useSingleEditableImage(id)

    const setPosition = useCallback( (position: Position) => {
        setImage((c) => { 
            c.position = position;
            return c;
         });
    }, [setImage, id] )

    const setZoom = useCallback((zoom: number)=>{
       setImage(c => {
           c.zoom = zoom;
           return c;
       })
    }, [setImage, id])



    return { setPosition, image, setZoom }

}


export const useImageTextboxes = (imageId: string) => {
    const [ croppable, setCroppable ] = useSingleEditableImage(imageId);
    const [ textboxes, setTextboxes ] = useState<TextBox[]>([]);

    const submitTextboxes = useCallback(()=>{
        setCroppable(croppable => {
            let editable;
            if(croppable instanceof EditableImage){
                editable = croppable as EditableImage;
                editable.textboxes = textboxes;
            } else {
                editable = new EditableImage({ croppableImage: croppable });
                editable.textboxes = textboxes;
            }
            return editable;
        })
    },[setCroppable])

    const getTextboxes = useCallback(()=>{
        if(croppable instanceof EditableImage){
            const textboxesCopy = JSON.parse(JSON.stringify((croppable as EditableImage).textboxes)) as TextBox[];
            return textboxesCopy;
        } else {
            return [];
        }
    },[croppable])

    useEffect(()=>{
        setTextboxes(getTextboxes());
    },[setTextboxes, getTextboxes]);

    return { textboxes, setTextboxes, submitTextboxes }

 }



const applyCroppablePropsToAll = (croppable: CroppableImage) => (croppables: Array<CroppableImage>) => {
    const _croppables = [...croppables];
    _croppables.forEach( c => {
        c.position = croppable.position;
        c.zoom = croppable.zoom;
    });
    return _croppables;
}