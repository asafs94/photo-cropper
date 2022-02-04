import React from 'react';
import AppImageContainer from '../../../containers/AppImageContainer';
import EditableImage from '../../../types/EditableImage';
import useStyles from './styles'

interface SixSquares_Props {
    images?: Array<EditableImage>;
    onImageContextMenu: (imageId: string) => (event: React.MouseEvent) => void;
}

export default function SixSquares({ images=[], onImageContextMenu }: SixSquares_Props) {

    const classes = useStyles();
    return (
        <div className={classes.Root}>
            {images.map((image, index) => 
                <AppImageContainer onContextMenu={onImageContextMenu(image.id)} className={classes.Square} id={image.id} key={`${image.id}-six-squares`} />
            )}
        </div>
    )
}
