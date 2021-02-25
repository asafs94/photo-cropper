import { fade, makeStyles } from "@material-ui/core";

export default makeStyles((theme) => {
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
    Editable: {
      width: size,
      height: size,
      position: "relative",
      boxSizing: 'border-box',
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
