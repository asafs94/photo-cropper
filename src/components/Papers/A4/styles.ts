import { makeStyles, Theme } from "@material-ui/core";

export default makeStyles( (theme: Theme) => {
    return {
        Root:{
            width: '210mm',
            height: '297mm',
            overflow: 'hidden',
            margin: 0,
            padding: 0,
        },
        '@media print':{
            Root:{
                position: 'fixed',
                top: 0,
                left: 0,
                border: 'none',
                boxShadow: 'none',
            }
        }
    }
} )