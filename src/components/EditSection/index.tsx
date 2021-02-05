import { Button, IconButton } from '@material-ui/core';
import { PhotoCamera, Print } from '@material-ui/icons';

import React, { useState } from 'react'
import ImageUpload from '../ImageUpload'
import PicturesPreview from './PicturesPreview';
import useStyles from './styles';

export default function Toolbar({onUpload}: any) {

    const [files, setFiles] = useState<any>([]);
    const classes = useStyles({ filesExist: !!files.length })

    const loadImages = () =>{
        onUpload(files);
    }

    return (
        <div>
            <div>
                <ImageUpload onUpload={setFiles}>
                    {(handleClick: ()=> void) => 
                        <IconButton color={files.length? 'primary' : 'default'} onClick={handleClick}>
                            <PhotoCamera/>
                        </IconButton>}
                </ImageUpload>
                <IconButton color="primary" onClick={window.print}>
                    <Print />
                </IconButton>
            </div>

            <div className={classes.UploadPreview}>
                <PicturesPreview urls={files.map((file: any)=> file.url)} />
            </div>
            <Button variant='outlined' color='primary' className={classes.LoadButton} onClick={loadImages}>Load Images</Button>
        </div>
    )
}
