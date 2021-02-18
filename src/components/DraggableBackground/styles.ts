import { makeStyles } from "@material-ui/core";



export default makeStyles(theme => {
    return {
        Root:{
            overflow: 'hidden',
            position: 'relative',
        },
        CropperContainer:{
            cursor: ({disabled}: any) => disabled? 'default': 'initial',
        },
        CropArea:{
            cursor: ({disabled}: any) => disabled? 'default': 'initial',
            color: 'transparent !important'
        },
        CropMedia:{
        }
    }
})