import { makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
    disabled?: boolean
}


export default makeStyles<Theme, StyleProps>(theme => {
    return {
        Root:{
            overflow: 'hidden',
            position: 'relative',
        },
        CropperContainer: ({disabled}) => ({
            cursor: disabled? 'default': 'move',
        }),
        CropArea: ({disabled}) => ({
            cursor: disabled? 'default': 'move',
            color: 'transparent !important'
        }),
        CropMedia:{
        }
    }
})