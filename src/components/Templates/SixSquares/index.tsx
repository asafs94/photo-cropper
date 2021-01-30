import React, { useEffect, useState } from 'react';
import DraggableBackground from '../../DraggableBackground';
import classes from './styles.module.scss'

interface SixSquares_Props {
    srcs?: Array<string>
}

export default function SixSquares({ srcs=[] }: SixSquares_Props) {

    const [_srcs, setSrcs] = useState(srcs);

    useEffect(()=>{
        let newSrcs;
        if(srcs.length >= 6){
            newSrcs = srcs.slice(0,5);
        } else {
            newSrcs = [...srcs, ...new Array(6-srcs.length).fill('')];
        }
        setSrcs(newSrcs);
    },[srcs])

    return (
        <div className={classes.Root}>
            {_srcs.map((src,index) => <DraggableBackground className={classes.Square} key={src+index} src={src}/> ) }
        </div>
    )
}
