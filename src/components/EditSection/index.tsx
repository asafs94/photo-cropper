import { Button, IconButton, Paper } from '@material-ui/core';
import { Close, PhotoCamera, Print, Refresh } from '@material-ui/icons';

import React, { useCallback, useState } from 'react'
import ImageUpload from '../ImageUpload'
import PicturesPreview from './PicturesPreview';
import useStyles from './styles';

export default function Toolbar({onUpload, onClear, loaded}: any) {

    const [files, setFiles] = useState<any>([]);
    const classes = useStyles({ filesExist: !!files.length })

    const loadImages = () =>{
        onUpload(files);
    }

    const handleClear = useCallback(
        () => {
            setFiles([]);
            onClear()
        },
        [setFiles],
    ) 

    const handleUpload = useCallback((_files: any[]) => {
        setFiles(_files)
    }, [setFiles])

    return (
        <div>
            <Paper className={classes.Toolbar}>
                <ImageUpload onUpload={handleUpload}>
                    {(handleClick: ()=> void) => 
                        <IconButton color={files.length? 'primary' : 'default'} onClick={handleClick} disabled={!!files.length}>
                            <PhotoCamera/>
                        </IconButton>}
                </ImageUpload>
                <IconButton color="primary" onClick={window.print}>
                    <Print />
                </IconButton>
            </Paper>

            <div className={classes.UploadPreview}>
                <PicturesPreview urls={files.map((file: any)=> file.url)} />
            </div>
            <div className={classes.PreviewButtons}>
                <Button variant='outlined' color='primary' className={classes.PreviewButton} onClick={loadImages}>{ loaded? <Refresh /> : 'Load Images'}</Button>
                {loaded && <Button variant='outlined' color='primary' className={classes.PreviewButton} onClick={handleClear}><Close/></Button>}
            </div>
        </div>
    )
}
