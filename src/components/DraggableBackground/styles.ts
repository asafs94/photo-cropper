import { makeStyles } from "@material-ui/core";



export default makeStyles(theme => {
    return {
        Root:{
            overflow: 'hidden',
            position: 'relative',
        },
        CropperContainer:{
            cursor: ({disabled}: any) => disabled? 'default': 'drag',
        },
        CropArea:{
            cursor: ({disabled}: any) => disabled? 'default': 'drag',
            color: 'transparent !important'
        },
        CropMedia:{
        }
    }
})