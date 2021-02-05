import classes from '*.module.css';
import { makeStyles, Paper } from '@material-ui/core'
import React from 'react';


const useStyles = makeStyles( theme => {
    return {
        Root:{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            height: 'fit-content',

        },
        Picture:{
            backgroundSize: 'contain', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'center',
            width: `calc( 50% - ${theme.spacing(2)}px )`,
            paddingTop:  `calc( 50% - ${theme.spacing(2)}px )`,
            padding: 0,
            margin: theme.spacing(),
        }
    }
})


export default function PicturesPreview({ urls }: { urls: Array<string> }) {

    const classes = useStyles()
    
    return (
        <div className={classes.Root}>
            {urls.map((url: string, index: number) => {
                return <Paper key={`${url}+${index}`}
                    className={classes.Picture}
                    style={{ backgroundImage: `url(${url})`, }}></Paper>
            })}
        </div>
    )
}
