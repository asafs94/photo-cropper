import React, { createContext, SetStateAction, useCallback, useEffect, useState } from 'react'
import Coins from '../components/Templates/Coins';
import SixSquares from '../components/Templates/SixSquares';
import EditableImage from '../types/EditableImage';
import { PlaceholderImage } from '../types/Placeholder';
import { appendImages, setItemById } from '../utils';

interface ImageContextValue {
    order?: Array<any>,
    setOrder?: React.Dispatch<React.SetStateAction<any[]>>,
    images: Array<EditableImage>,
    uploadFiles?: (files: FileList) => void,
    setImages: React.Dispatch<React.SetStateAction<EditableImage[]>>,
    onClear: () => void,
    setSingleImage: (id: string) => (setAction: SetStateAction<EditableImage>) => void;
    template: Template;
    toggleTemplates(): void;
}

export type Template = typeof TEMPLATES[keyof typeof TEMPLATES];

export const TEMPLATES = {
    COINS: {
      name: 'מטבעות',
      Component: Coins,
      amountOfPictures: 4
    },
    SIX_SQUARES: {
      name: 'ריבועים',
      Component: SixSquares,
      amountOfPictures: 6,
    }
  } as const

export const ImageContext = createContext<ImageContextValue>({ images: [], setImages: () => { }, onClear: () => {}, setSingleImage: () => () => {}, template: TEMPLATES.COINS, toggleTemplates(){} });

interface ImageProviderProps {
    children: React.ReactNode;
}

export default function ImageProvider({ children }: ImageProviderProps) {

    const [images, setImages] = useState<Array<EditableImage>>([]); //Will be useState<Array<ImageFile>> later on
    const [order, setOrder] = useState<Array<any>>([]);
    const [template, setTemlpate] = useState<Template>(TEMPLATES.COINS);
    const toggleTemplates = useCallback(()=>{
        setTemlpate(t => t === TEMPLATES.SIX_SQUARES ? TEMPLATES.COINS :  TEMPLATES.SIX_SQUARES);
    },[])

    const maxAmount = template.amountOfPictures;

    const uploadFiles = useCallback( async (files: FileList) => {
        let newImages = Array.from(files).map(file => new EditableImage({file}));
        const allImages = await appendImages(images, newImages, maxAmount, (oldA, newA, max)=> newA )
        setImages(allImages);
    }, [images, maxAmount])

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
        } else if(images.length > maxAmount) {
            setImages(prev=> {
                return prev.filter((image, index)=> index < maxAmount);
            })
        }
    },[images, maxAmount, setImages])

    useEffect(() => {
        setOrder(images.map(({ id }) => id));
    }, [images, setOrder]);

    const onClear = useCallback(()=>{
        setImages([]);
    },[setImages])

    const setSingleImage = useCallback((id: string)=>(setAction: SetStateAction<EditableImage>)=>{
        setImages(setItemById(id, setAction));
    },[setImages])

    return (
        <ImageContext.Provider value={{ order, setOrder, images, uploadFiles, setImages, onClear, setSingleImage, template, toggleTemplates }}>
            {children}
        </ImageContext.Provider>
    )
}
