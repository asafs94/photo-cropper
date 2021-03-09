import { fade, makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  imageSize: { width: string | number, height: string | number }
}

export default makeStyles<Theme, StyleProps>((theme) => {
  return {
    Root: {
      height: '600px',
      width: '700px',
      maxWidth: "100%",
      maxHeight: "100%",
      background: fade(theme.palette.common.black, 0.2),
      padding: theme.spacing(),
      boxSizing: 'border-box',
      display: "grid",
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto 1fr auto",
      justifyItems: "center",
      gridGap: theme.spacing(),
      
    },
    Toolbar: {
      width: '100%',
      boxSizing: 'border-box',
    },
    EditableArea: {
      width: '100%',
      height: '100%'
    },
    Editable:{
      position: "relative",
      boxSizing: 'border-box',
      height: ({imageSize}) => imageSize.height,
      width: ({imageSize}) => imageSize.width
    },
    Image: {
      width: "100%",
      height: "100%",
      background: theme.palette.background.paper,
      margin: "auto",
    },
    SaveButton:{
      width: '100%'
    },
  };
});
