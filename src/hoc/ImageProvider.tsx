import React, { createContext, useCallback, useEffect, useState } from 'react'
import { CroppableImage } from '../types/CroppableImage';

interface ImageContextValue {
    order?: Array<any>,
    setOrder?: React.Dispatch<React.SetStateAction<any[]>>,
    croppableImages?: Array<CroppableImage>,
    uploadFiles?: (files: FileList) => void,
    setCroppables: React.Dispatch<React.SetStateAction<CroppableImage[]>>
}

export const ImageContext = createContext<ImageContextValue>({ setCroppables: () => { } });

interface ImageProviderProps {
    children: React.ReactNode
}

export default function ImageProvider({ children }: ImageProviderProps) {

    const [croppableImages, setCroppableImages] = useState<Array<CroppableImage>>([]); //Will be useState<Array<ImageFile>> later on
    const [order, setOrder] = useState<Array<any>>([]);

    const uploadFiles = useCallback((files: FileList) => {
        const _images = Array.from(files).map(file => new CroppableImage(file));
        setCroppableImages(_images);
    }, [setCroppableImages])

    useEffect(() => {
        setOrder(croppableImages.map(({ id }) => id));
    }, [croppableImages, setOrder]);


    return (
        <ImageContext.Provider value={{ order, setOrder, croppableImages, uploadFiles, setCroppables: setCroppableImages }}>
            {children}
        </ImageContext.Provider>
    )
}
