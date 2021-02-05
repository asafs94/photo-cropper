import React, { useEffect, useState } from 'react';
import AppCroppable from '../../../containers/AppCroppable';
import { CroppableImage } from '../../../types/CroppableImage';
import { PlaceholderImage } from '../../../types/Placeholder';
import useStyles from './styles'

interface SixSquares_Props {
    croppableImages?: Array<CroppableImage>
}

export default function SixSquares({ croppableImages=[] }: SixSquares_Props) {

    const classes = useStyles();
    const [placeholders, setPlaceholders] = useState<Array<PlaceholderImage>>([]);

    useEffect(()=>{
        let _placeholders;
        if(croppableImages.length >= 6){
            _placeholders = [];
        } else {
            _placeholders = new Array(6 - croppableImages.length).fill(new PlaceholderImage());
        }
        setPlaceholders(_placeholders);
    },[croppableImages.length])

    return (
        <div className={classes.Root}>
            {croppableImages.map((croppable, index) => <AppCroppable className={classes.Square} key={croppable.id} id={croppable.id} />)}
            {placeholders.map( (placeholder, index) => <div key={`${placeholder.id}+${index}`} className={[classes.Square, classes.Placeholder].join(' ')} style={{ backgroundImage: `url(${placeholder.url})`}}></div> )}
        </div>
    )
}
