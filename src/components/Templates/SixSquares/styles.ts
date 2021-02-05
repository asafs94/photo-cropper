import { makeStyles, Theme } from "@material-ui/core";

export default makeStyles( (theme: Theme) => {
    return {
        Root: {
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            width: 'fit-content',
            height: 'fit-content',
        },
        Square:{
            width: '85mm',
            height: '85mm',
            margin: '1mm',
            border: `1px solid ${theme.palette.divider}`,
        },
        Placeholder:{
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        },
        '@media print':{
            Square:{
                border: 'none',
            }
        }
    }
} )