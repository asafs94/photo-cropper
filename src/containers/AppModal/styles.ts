import { makeStyles, Theme } from "@material-ui/core";


const useStyles = makeStyles( (theme:Theme) => {
    return {
        Root: {
            
        },
        Header:{
            borderBottom: `1px solid ${theme.palette.divider}`,
            background: theme.palette.grey[200],
            display: 'grid',
            gridTemplateColumns: '60px 1fr 60px',
            alignItems: 'center',
            justifyContent: 'center',
            justifyItems: 'center',
            height: 36,
        },
        CloseButton:{
            gridColumn: '3/4'
        },
        ModalName:{
           gridColumn: '2/3'
        }
    }
} )


export default useStyles;