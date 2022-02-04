import { makeStyles, Theme } from "@material-ui/core";

export default makeStyles( (theme: Theme) => {
    return {
        Root: {
            display: 'grid',
            gridTemplateColumns: 'repeat( 4, min-content)',
            width: 'fit-content',
            height: 'fit-content',
        },
        Coin:{
            width: '4cm',
            height: '4cm',
            margin: '1.5mm',
            border: `3px solid ${theme.palette.primary.main}`,
            borderRadius: '100%',
            overflow: 'hidden',
        },
        '@media print':{
            Coin:{
                border: `1px solid ${theme.palette.primary.main}`,
                width: '4cm',
                height: '4cm',
                margin: '1.5mm',
                transform: 'scaleX(-1)',
                borderRadius: '100%',
                overflow: 'hidden',
            }
        }
    }
} )