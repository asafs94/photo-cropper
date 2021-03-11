import { SetStateAction, useCallback, useContext, useEffect, useState } from "react"
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

    const lock = useCallback(()=>{
        setImage(c => {
            c.locked = true;
            return c;
        })
    },[setImage, id])

    const unlock = useCallback(()=>{
        setImage(c => {
            c.locked = false;
            return c;
        })
    },[setImage, id])


    return { setCrop, image, setZoom, lock, unlock }

}


export const useImageTextboxes = (imageId: string) => {
    const [ image, setImage ] = useSingleEditableImage(imageId);
    const [ textboxes, setTextboxes ] = useState<TextBox[]>([]);
    const [ dirty, setDirty ] = useState<boolean>(false)

    const submitTextboxes = useCallback(()=>{
        setImage(editable => {
            editable.textboxes = textboxes;
            return editable;
        })
    },[setImage, textboxes])

    const getTextboxes = useCallback(()=>{
        const textboxesCopy = image?.textboxes.map( textbox => textbox.clone() ) || [];
        return textboxesCopy;
    },[image])


    useEffect(()=>{
        setTextboxes(getTextboxes());
    },[setTextboxes, getTextboxes]);

    useEffect(()=>{
        if(image){
            setDirty(didTextboxesChange(image.textboxes, textboxes));
        }
    }, [setDirty, image, textboxes])

    const didTextboxesChange = useCallback((textboxes1: TextBox[], textboxes2: TextBox[])=>{
        if(textboxes1.length !== textboxes2.length){
            return true;
        }
        return textboxes1.some( (t1,index) => !textboxes1[index].isEqualbyValues(textboxes2[index]) );
    },[])

    return { textboxes, setTextboxes, submitTextboxes, dirty }

 }



const applyCroppablePropsToAll = (croppable: CroppableImage) => (croppables: Array<CroppableImage>) => {
    const _croppables = [...croppables];
    _croppables.forEach( c => {
        c.crop = croppable.crop;
        c.zoom = croppable.zoom;
    });
    return _croppables;
}