import React from 'react';
import AppImageContainer from '../../../containers/AppImageContainer';
import EditableImage from '../../../types/EditableImage';
import useStyles from './styles'

interface SixSquares_Props {
    images?: Array<EditableImage>
}

export default function SixSquares({ images=[] }: SixSquares_Props) {

    const classes = useStyles();
    return (
        <div className={classes.Root}>
            {images.map((image, index) => 
                <AppImageContainer className={classes.Square} id={image.id} key={`${image.id}`} />
            )}
        </div>
    )
}
