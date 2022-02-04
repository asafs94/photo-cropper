import { Button, ButtonGroup, IconButton, Paper, TextField } from '@material-ui/core';
import { PhotoCamera, Print, Refresh, Settings } from '@material-ui/icons';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import React, { useCallback, useState } from 'react'
import { TEMPLATES } from '../../hoc/ImageProvider';
import { lineBreakCount } from '../../utils';
import ImageUpload from '../ImageUpload'
import useStyles from './styles';

export default function Toolbar({ onUpload, amount, headerNote, setHeaderNote, openSettings, template, toggleTemplate }: any) {

    const [files, setFiles] = useState<any>([]);

    const classes = useStyles({ filesExist: !!files.length })

    const handleUpload = useCallback((_files: any[]) => {
        const filesToAdd = _files.slice(0, amount);
        setFiles(filesToAdd);
        onUpload(filesToAdd);
    }, [setFiles, amount, onUpload]);

    const refresh = useCallback(() => {
        onUpload(files)
    }, [files, onUpload])

    const handleChange = useCallback((event: React.ChangeEvent) => {
        const { name, value } = (event.target as HTMLInputElement);
        if (lineBreakCount(value) >= 2) {
            console.error("Can't enter more than two lines.");
        }
        if (name === "headerNote") {
            setHeaderNote(value);
        }
    }, [setHeaderNote])

    return (
        <div className={classes.Root}>
            <Paper className={classes.Toolbar}>
                <ImageUpload onUpload={handleUpload}>
                    {(handleClick: () => void) =>
                        <IconButton onClick={handleClick}>
                            <PhotoCamera />
                        </IconButton>}
                </ImageUpload>
                <IconButton disabled={!files.length} onClick={refresh} >
                    <Refresh></Refresh>
                </IconButton>
                <IconButton color="primary" onClick={window.print}>
                    <Print />
                </IconButton>
                <IconButton onClick={openSettings}><Settings /></IconButton>
            </Paper>
            <ToggleButtonGroup onChange={()=>toggleTemplate()} value={template.name} className={classes.TextField} >
                <ToggleButton  value={TEMPLATES.COINS.name} >{TEMPLATES.COINS.name}</ToggleButton>
                <ToggleButton value={TEMPLATES.SIX_SQUARES.name} >{TEMPLATES.SIX_SQUARES.name}</ToggleButton>
            </ToggleButtonGroup>
            <div>
                <TextField
                    label="מס הזמנה"
                    className={classes.TextField}
                    multiline
                    rows={2}
                    name="headerNote"
                    variant="outlined"
                    dir="rtl"
                    value={headerNote}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}
