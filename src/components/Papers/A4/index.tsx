import { Paper } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

interface A4_Props {
    className?: string,
    children?: React.ReactNode,
    rootRef?: any
}

export default function A4({className='', children, rootRef}: A4_Props) {
    const classes = useStyles();
    const rootClassName=['A4',classes.Root, className].join(' ')
    return (
        <Paper className={rootClassName} ref={rootRef}>
            {children}
        </Paper>
    )
}
