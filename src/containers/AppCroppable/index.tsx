

import React from 'react'
import DraggableBackground from '../../components/DraggableBackground'
import { useCroppable } from '../../utils/hooks/single-croppable';

interface Props {
    id: string,
    className? : string
}

export default function AppCroppable({id, className}: Props) {

    const { croppable, setPosition, setZoom } = useCroppable(id);

    if(!croppable){
        return null;
    }

    return (
        <DraggableBackground className={className} src={croppable?.url} setPosition={setPosition} setZoom={setZoom} zoom={croppable.zoom} position={croppable.position}  />
    )
}
