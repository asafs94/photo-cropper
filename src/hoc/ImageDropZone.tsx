
import { fade, makeStyles, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'

interface Props {
    children: React.ReactNode,
    onDrop?: (files: FileList) => void
}

const useStyles = makeStyles(theme => {
    return {
        DropZone:{
            position: 'fixed',
            top: 5,
            left: 5,
            right: 5,
            bottom: 5,
            border: `${theme.palette.primary.main} 2px dashed`,
            alignItems: 'center',
            justifyContent: 'center',
            background: fade(theme.palette.divider, 0.2),
            display: ({dragging}: any) => dragging? "flex" : "none",
            zIndex: 2000
        },
        Text: {
            color: theme.palette.background.paper,
            WebkitTextStroke: `1px solid ${theme.palette.primary.main}`
        }
    }
})

export default function ImageDropZone({children, onDrop}: Props) {
    
    const [dragging, setDragging] = useState(false);
    const dragCount = useRef(0);
    const classes = useStyles({dragging});

    const onDragEnter = useCallback(( event: DragEvent )=>{
        event.preventDefault();
        event.stopPropagation();
        const fileList = event.dataTransfer && event.dataTransfer.items
        const _files = Array.from((fileList as DataTransferItemList || []));
        if(_files[0] && _files.some( file => file.kind !== "string" )){
            console.log(_files[0]);
            dragCount.current ++;
            setDragging(true)
        }
    },[setDragging]);

    const onDragLeave = useCallback(( event: DragEvent )=>{
        event.preventDefault();
        event.stopPropagation();
        dragCount.current --;
        if(dragCount.current === 0){
            setDragging(false);
        }
    }, [setDragging]);
    
    const onDragOver = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
    },[])

    useEffect(()=>{
        document.addEventListener("dragenter", onDragEnter, false);
        document.addEventListener("dragover", onDragOver, false)
        document.addEventListener("dragleave", onDragLeave, false);
        document.addEventListener("drop", _onDrop, false);
        return () => {
            document.removeEventListener("dragenter", onDragEnter, false);
            document.removeEventListener("dragover", onDragOver, false)
            document.removeEventListener("dragleave", onDragLeave, false);
            document.removeEventListener("drop", _onDrop, false);
        }
    },[])

    const _onDrop = useCallback((event: DragEvent)=>{
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer?.files;
        event.dataTransfer?.clearData()
        setDragging(false);
        if(files){
            onDrop && onDrop(files);
        }
    },[setDragging, onDrop])

    return (
        <>
            {children}
            <div className={classes.DropZone}>
                <Typography variant="h4" className={classes.Text} >Drop Files Here</Typography>
            </div>
        </>
    )
}
