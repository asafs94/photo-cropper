import { makeStyles, Theme } from "@material-ui/core";

interface Props {
    filesExist: boolean
}

export default makeStyles<Theme, Props>((theme)=> {
    return {
        Toolbar:{
            padding: theme.spacing(),
            marginBottom: theme.spacing()
        },
        UploadPreview:{
            width: 200,
            height: 200,
            overflow: 'auto',
            marginBottom: theme.spacing()
        },
        PreviewButtons:{
            width: '100%',
            visibility: ({filesExist}) => filesExist? 'visible' : 'hidden',
            display: 'flex'
        },
        PreviewButton: {
            flex: 1,
        }
    }
})