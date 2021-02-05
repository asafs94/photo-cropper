import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Point } from 'react-easy-crop/types';
import useStyles from './styles';


interface Props {
    src?: string,
    className?: string,
    style?: object,
    zoomSensitivity?: number,
    setZoom: (zoom: number) => void,
    setPosition: (location: Point) => void,
    zoom: number,
    position: Point
}


export default function DraggableBackground({ src='', className='', zoomSensitivity=1, setZoom, setPosition, zoom, position } : Props) {
    const classes = useStyles()
    const rootClassNames = [classes.Root, className].join(' ');
    const containerRef = useRef<any>();
    const [cropSize, setCropSize] = useState({ width: 0, height: 0 });

    const handleDoubleClick = () => {
        setZoom(1);
        setPosition({ x:0, y: 0 });
    }

    useEffect(()=>{
        const container = (containerRef.current as HTMLDivElement ).getBoundingClientRect();
        setCropSize({ width: container.width, height: container.height })
    }, [])
    
    return (
        <div className={rootClassNames} ref={containerRef} onDoubleClick={handleDoubleClick} >
            <Cropper 
                    crop={position}
                    cropSize={cropSize}
                    zoom={zoom}
                    image={src}
                    onCropChange={setPosition}
                    onZoomChange={setZoom}
                    showGrid={false}
                    restrictPosition={false}
                    minZoom={0.1}
                />
        </div>
       
    )
}

