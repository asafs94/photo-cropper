import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => {
  const drawerWidth = 200 + theme.spacing(2);
  return {
    Root: {
      height: "100%",
      width: "100%",
      overflow: "hidden",
      background: theme.palette.background.default,
    },
    Main: {
      height: "100%",
      display: "flex",
      padding: theme.spacing(),
      boxSizing: "border-box",
      justifyContent: "center",
      overflow: "hidden",
    },
    Drawer: {
      boxSizing: "border-box",
      width: drawerWidth,
      padding: theme.spacing(),
    },
    DrawerFab: {
      position: "fixed",
      top: theme.spacing(),
      right: theme.spacing(),
      zIndex: 1,
    },
    DrawerWrapper: {},
    PrintingPaper:{
        display: "grid",
        gridTemplateRows: "60px 1fr 60px",
        gridTemplateColumns: "1fr",
        justifyItems: "center",
        alignItems: "center",
    },
    Note: {
      color: theme.palette.text.secondary,
      textAlign: "center",
      padding: theme.spacing(),
    },
    "@media print": {
      Root: {
        "& :not($Main, $Main *)": {
          display: "none !important",
        },
      },
      DrawerWrapper: {
        display: "none",
      },
    },
  };
});
