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
            width: `calc (100% - ${drawerWidth}px)`,
            height: '100%',
            display: 'flex',
            padding: theme.spacing(),
            boxSizing: 'border-box',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: drawerWidth,
            overflow: 'hidden',
        },
        Drawer: {
            boxSizing: 'border-box',
            width: drawerWidth,
            padding: theme.spacing(),
        },
        '@media print':{
            Root:{
                '& :not($Main, $Main *)':{
                    visibility: 'hidden'
                }
            }
        }
    }
} )