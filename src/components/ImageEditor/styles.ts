import { fade, makeStyles } from "@material-ui/core";


export default makeStyles( theme => {
    return {
        Root:{
            width: '75vh',
            height: '75vh',
            background: fade(theme.palette.common.black, 0.2),
            padding: theme.spacing(),
            '@media (orientation: portrait)':{
                width: '100vw',
                height: '100vh',
            }
        },
        Editable:{
            width: 300,
            height: 300,
            position: 'relative',
            margin: 'auto'
        },
        Image:{
            width: '100%',
            height: '100%',
            background: theme.palette.background.paper,
            margin: 'auto'
        }
    }
} )