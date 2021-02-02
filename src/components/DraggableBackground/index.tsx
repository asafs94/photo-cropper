import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import useStyles from './styles';


interface Props {
    src?: string,
    className?: string,
    style?: object,
    zoomSensitivity?: number
}


export default function DraggableBackground({ src='', className='', zoomSensitivity=1 } : Props) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState<number>(1);
    const classes = useStyles()
    const rootClassNames = [classes.Root, className].join(' ');
    const containerRef = useRef<any>();
    const [cropSize, setCropSize] = useState({ width: 0, height: 0 });

    
    const handleZoomChange = (newZoom: number) => {
        setZoom( (oldZoom: number) => {
            let diff =  newZoom - oldZoom;
            return oldZoom + diff*zoomSensitivity;
        } )
    }

    useEffect(()=>{
        const container = (containerRef.current as HTMLDivElement ).getBoundingClientRect();
        setCropSize({ width: container.width, height: container.height })
    }, [])
    return (
        <div className={rootClassNames} ref={containerRef} >
            <Cropper 
                    crop={crop}
                    cropSize={cropSize}
                    zoom={zoom}
                    image={src}
                    onCropChange={setCrop}
                    onZoomChange={handleZoomChange}
                    showGrid={false}
                    restrictPosition={false}
                    minZoom={0.1}
                />
        </div>
       
    )
}

