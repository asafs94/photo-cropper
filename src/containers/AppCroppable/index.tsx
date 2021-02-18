

import React, { useContext } from 'react'
import DraggableBackground from '../../components/DraggableBackground'
import { useCroppable } from '../../utils/hooks/single-croppable';
import { AppContextMenuContext } from '../../hoc/AppContextMenu';

interface Props {
    id: string,
    className? : string,
    disabled?: boolean
}

export default function AppCroppable({id, className, disabled=false}: Props) {

    const { croppable, setPosition, setZoom, applyToAll } = useCroppable(id);
    const openContextMenu = useContext(AppContextMenuContext)

    const generateContextMenuOptions = () => {
        return [
            {
                text: 'Apply to All',
                onSelect: applyToAll,
                value: 'apply-to-all'
            }
        ]
    }

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        openContextMenu({ event, options: generateContextMenuOptions() })
    }

    if(!croppable){
        return null;
    }

    return (
        <DraggableBackground onContextMenu={handleContextMenu} className={className} disabled={disabled} src={croppable?.url} setPosition={setPosition} setZoom={setZoom} zoom={croppable.zoom} position={croppable.position}  />
    )
}
