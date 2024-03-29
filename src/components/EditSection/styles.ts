import { makeStyles, Theme } from "@material-ui/core";

interface Props {
  filesExist: boolean;
}

export default makeStyles<Theme, Props>((theme) => {
  return {
    Root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
    },
    Toolbar: {
      padding: theme.spacing(),
      marginBottom: theme.spacing(),
      display: 'flex',
      justifyContent: 'space-between'
    },
    UploadPreview: {
      width: 200,
      height: 200,
      overflow: "auto",
      marginBottom: theme.spacing(),
    },
    PreviewButtons: {
      width: "100%",
      visibility: ({ filesExist }: any) => (filesExist ? "visible" : "hidden"),
      display: "flex",
    },
    PreviewButton: {
      flex: 1,
    },
    TextField:{
      margin: [[theme.spacing(), 0]],
    }
  } as any;
});
