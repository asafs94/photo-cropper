import { IconButton, Paper, TextField } from '@material-ui/core';
import { PhotoCamera, Print, Refresh, Settings } from '@material-ui/icons';

import React, { useCallback, useState } from 'react'
import { lineBreakCount } from '../../utils';
import ImageUpload from '../ImageUpload'
import useStyles from './styles';

export default function Toolbar({onUpload, amount, headerNote, footerNote, setHeaderNote, setFooterNote, openSettings}: any) {

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

    const handleChange = useCallback((event : React.ChangeEvent)=>{
        const { name, value } = (event.target as HTMLInputElement );
        if(lineBreakCount(value) >= 2){
            console.error("Can't enter more than two lines.");
        }
        if( name === "headerNote" ){
            setHeaderNote(value);
        } else {
            setFooterNote(value);
        }
    },[setHeaderNote, setFooterNote])

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
                <IconButton onClick={openSettings}><Settings/></IconButton>
            </Paper>
            <div>
            <TextField
                label="Header Note"
                className={classes.TextField}
                multiline
                rows={2}
                name="headerNote"
                variant="outlined"
                value={headerNote}
                onChange={handleChange}
                />
            <TextField
                label="Footer Note"
                className={classes.TextField}
                multiline
                rows={2}
                variant="outlined"
                value={footerNote}
                onChange={handleChange}
                />
            </div>
        </div>
    )
}
