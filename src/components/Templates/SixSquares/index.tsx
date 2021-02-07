import React from 'react';
import AppCroppable from '../../../containers/AppCroppable';
import { CroppableImage } from '../../../types/CroppableImage';
import useStyles from './styles'

interface SixSquares_Props {
    croppableImages?: Array<CroppableImage>
}

export default function SixSquares({ croppableImages=[] }: SixSquares_Props) {

    const classes = useStyles();
    return (
        <div className={classes.Root}>
            {croppableImages.map((croppable, index) => 
                <AppCroppable className={classes.Square} key={croppable.id} id={croppable.id} />
            )}
        </div>
    )
}
