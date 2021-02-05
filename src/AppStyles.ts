import { makeStyles } from "@material-ui/core";


export default makeStyles( theme => {
    const drawerWidth = 200 + theme.spacing(2);
    return {
        Main: {
            width: '100%',
            overflow: 'auto',
            display: 'flex',
            padding: theme.spacing(),
            boxSizing: 'border-box',
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: drawerWidth + theme.spacing(),
            background: theme.palette.background.default,
        },
        Drawer: {
            boxSizing: 'border-box',
            width: drawerWidth,
            padding: theme.spacing(),
        },
        '@media print':{
            '.App :not($Main, $Main *)':{
                visibility: 'hidden'
            }
        }
    }
} )