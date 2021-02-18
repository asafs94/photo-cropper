import { Typography } from '@material-ui/core'
import React from 'react'

interface Props {
    children: string
}


export default function TextWithLineBreaks({children}: Props) {
    return (
        <>
        {children.split('\n').map( (line, index) => index === 0? line : <><br/>{line}</> )}
        </>
    )
}
