import { IconButton, Paper } from '@material-ui/core';
import { PhotoCamera, Print, Refresh } from '@material-ui/icons';

import React, { useCallback, useState } from 'react'
import ImageUpload from '../ImageUpload'
import useStyles from './styles';

export default function Toolbar({onUpload, amount}: any) {

    const [files, setFiles] = useState<any>([]);
    const classes = useStyles({ filesExist: !!files.length })

    const handleUpload = useCallback((_files: any[]) => {
        const filesToAdd = _files.slice(0, amount);
        setFiles(filesToAdd);
        onUpload(filesToAdd);
    }, [setFiles, amount, onUpload]);

    const refresh = useCallback(()=>{
        onUpload(files)
    },[files, onUpload])

    return (
        <div>
            <Paper className={classes.Toolbar}>
                <ImageUpload onUpload={handleUpload}>
                    {(handleClick: ()=> void) => 
                        <IconButton onClick={handleClick}>
                            <PhotoCamera/>
                        </IconButton>}
                </ImageUpload>
                <IconButton disabled={!files.length} onClick={refresh} >
                    <Refresh></Refresh>
                </IconButton>
                <IconButton color="primary" onClick={window.print}>
                    <Print />
                </IconButton>
            </Paper>
        </div>
    )
}
