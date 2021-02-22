import { fade, makeStyles } from "@material-ui/core";

export default makeStyles((theme) => {
  const size = 450;
  return {
    Root: {
      width: "75vh",
      height: "75vh",
      background: fade(theme.palette.common.black, 0.2),
      padding: theme.spacing(),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "@media (orientation: portrait)": {
        width: "100vw",
        height: "100vh",
      },
    },
    Toolbar: {
      width: size,
      marginBottom: theme.spacing(),
    },
    Editable: {
      width: size,
      height: size,
      position: "relative",
    },
    Image: {
      width: "100%",
      height: "100%",
      background: theme.palette.background.paper,
      margin: "auto",
    },
  };
});
