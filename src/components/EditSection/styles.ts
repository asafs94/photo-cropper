import { makeStyles, Theme } from "@material-ui/core";

interface Props {
    filesExist: boolean
}

export default makeStyles<Theme, Props>((theme)=> {
    return {
        UploadPreview:{
            width: 200,
            height: 200
        },
        LoadButton:{
            width: '100%',
            visibility: ({filesExist}) => filesExist? 'visible' : 'hidden',
        }
    }
})