import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme)=>{
    return {
        Root:{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0,
            transition: 'opacity 300ms ease-in-out',
            padding: theme.spacing(5),
            "&:hover":{
                opacity: 0.5
            },
        },
        Icon:{
            color: theme.palette.text.disabled,
            width: "100%",
            height: "100%"
        },
        "@media print":{
            Root:{
                visibility: "hidden"
            }
        }
    }
})

export default useStyles;