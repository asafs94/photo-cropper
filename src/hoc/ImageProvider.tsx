import React, { createContext, useCallback, useEffect, useState } from 'react'
import { CroppableImage } from '../types/CroppableImage';
import { PlaceholderImage } from '../types/Placeholder';

interface ImageContextValue {
    order?: Array<any>,
    setOrder?: React.Dispatch<React.SetStateAction<any[]>>,
    croppableImages: Array<CroppableImage>,
    uploadFiles?: (files: FileList) => void,
    setCroppables: React.Dispatch<React.SetStateAction<CroppableImage[]>>,
    onClear: () => void
}

export const ImageContext = createContext<ImageContextValue>({ croppableImages: [], setCroppables: () => { }, onClear: () => {} });

interface ImageProviderProps {
    children: React.ReactNode
}

export default function ImageProvider({ children }: ImageProviderProps) {

    const [croppableImages, setCroppableImages] = useState<Array<CroppableImage>>([]); //Will be useState<Array<ImageFile>> later on
    const [order, setOrder] = useState<Array<any>>([]);
    const maxAmount = 6;

    const uploadFiles = useCallback((files: FileList) => {
        let _images = Array.from(files).map(file => new CroppableImage(file));
        setCroppableImages(_images);
    }, [setCroppableImages])

    useEffect(()=>{
        if(croppableImages.length < maxAmount){
            setCroppableImages( c=> {
                const newCroppables = [...c];
                const differenceFromMax = maxAmount - c.length;
                for(let i=0; i < differenceFromMax; i++){
                        newCroppables.push(new PlaceholderImage());
                }
                return newCroppables;
            } )
        }
    },[croppableImages, setCroppableImages])

    useEffect(() => {
        setOrder(croppableImages.map(({ id }) => id));
    }, [croppableImages, setOrder]);

    const onClear = useCallback(()=>{
        setCroppableImages([]);
    },[setCroppableImages])

    return (
        <ImageContext.Provider value={{ order, setOrder, croppableImages, uploadFiles, setCroppables: setCroppableImages, onClear }}>
            {children}
        </ImageContext.Provider>
    )
}
