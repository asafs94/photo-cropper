import { makeStyles } from "@material-ui/core";



export default makeStyles(theme => {
    const cursor = ({disabled}: any) => `${disabled? 'default': 'drag'} !important` 
    return {
        Root:{
            overflow: 'hidden',
            position: 'relative',
        },
        CropperContainer:{
            cursor: cursor,
        },
        CropArea:{
            cursor: cursor,
            color: 'transparent !important'
        },
        CropMedia:{
        }
    }
})