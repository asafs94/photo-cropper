import { Paper } from '@material-ui/core'
import React from 'react';
import AppCroppable from '../../containers/AppCroppable';
import useStyles from './styles';

export default function ImageEditor({ imageId }: any) {
    const classes = useStyles({});
    return (
        <Paper className={classes.Root} >
            <div className={classes.Editable}>
                <AppCroppable id={imageId} disabled={true} className={classes.Image} />
            </div>
        </Paper>
    )
}
