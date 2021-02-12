import { makeStyles } from "@material-ui/core";


export default makeStyles( theme => {
    const drawerWidth = 200 + theme.spacing(2);
    return {
        Root:{
            height: '100%',
            width: '100%',
            overflow: 'auto',
            background: theme.palette.background.default
        },
        Main: {
            height: '100%',
            display: 'flex',
            padding: theme.spacing(),
            boxSizing: 'border-box',
            justifyContent: 'center',
            overflow: 'auto',
        },
        Drawer: {
            boxSizing: 'border-box',
            width: drawerWidth,
            padding: theme.spacing(),
        },
        DrawerFab:{
            position: 'fixed',
            top: theme.spacing(),
            right: theme.spacing(),
            zIndex: 1,
        },
        DrawerWrapper:{

        },
        '@media print':{
            Root:{
                '& :not($Main, $Main *)':{
                    display: 'none !important'
                }
            },
            DrawerWrapper:{
                display: 'none'
            }
        },
    }
} )