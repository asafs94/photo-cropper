import { fade, makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  imageSize: { width: string | number, height: string | number }
}

export default makeStyles<Theme, StyleProps>((theme) => {
  const size = 450;
  return {
    Root: {
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
      width: size,
      boxSizing: 'border-box',
    },
    EditableArea: {
      width: size,
      height: size,
      
      
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
      width: size
    }
  };
});
