import React, { createContext, useCallback, useEffect, useState } from 'react'
import EditableImage from '../types/EditableImage';
import { PlaceholderImage } from '../types/Placeholder';

interface ImageContextValue {
    order?: Array<any>,
    setOrder?: React.Dispatch<React.SetStateAction<any[]>>,
    images: Array<EditableImage>,
    uploadFiles?: (files: FileList) => void,
    setImages: React.Dispatch<React.SetStateAction<EditableImage[]>>,
    onClear: () => void
}

export const ImageContext = createContext<ImageContextValue>({ images: [], setImages: () => { }, onClear: () => {} });

interface ImageProviderProps {
    children: React.ReactNode
}

export default function ImageProvider({ children }: ImageProviderProps) {

    const [images, setImages] = useState<Array<EditableImage>>([]); //Will be useState<Array<ImageFile>> later on
    const [order, setOrder] = useState<Array<any>>([]);
    const maxAmount = 6;

    const uploadFiles = useCallback((files: FileList) => {
        let _images = Array.from(files).map(file => new EditableImage({file}));
        setImages(_images);
    }, [setImages])

    useEffect(()=>{
        if(images.length < maxAmount){
            setImages( c=> {
                const newImages = [...c];
                const differenceFromMax = maxAmount - c.length;
                for(let i=0; i < differenceFromMax; i++){
                        newImages.push(new PlaceholderImage());
                }
                return newImages;
            } )
        }
    },[images, setImages])

    useEffect(() => {
        setOrder(images.map(({ id }) => id));
    }, [images, setOrder]);

    const onClear = useCallback(()=>{
        setImages([]);
    },[setImages])

    return (
        <ImageContext.Provider value={{ order, setOrder, images, uploadFiles, setImages, onClear }}>
            {children}
        </ImageContext.Provider>
    )
}
