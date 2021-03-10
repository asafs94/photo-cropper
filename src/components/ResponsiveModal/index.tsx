import { Dialog, DialogProps, makeStyles, Theme, useMediaQuery } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme)=>{
    return {
        paper:{
            width: theme.breakpoints.values.sm,
            height: theme.breakpoints.values.sm,
            [theme.breakpoints.between('xs', 'sm')]:{
                width: '90%',
                height: '90%',
                maxWidth: 'unset',
                maxHeight: 'unset',
            },
            [theme.breakpoints.down('xs')]:{
                width: '100%',
                minWidth: '100%',
                height: '100%',
                maxWidth: 'unset',
                maxHeight: 'unset',
            }
        },
    }
})

export default function ResponsiveModal({ children, classes, ...props }: DialogProps) {
    const innerClasses = useStyles()
    return (
        <Dialog classes={{ 
            paper: [classes?.paper, innerClasses.paper].join(' '),
            ...classes
         }} {...props}>
            {children}
        </Dialog>
    )
}
