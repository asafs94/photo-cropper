import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    Root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: '100%',
    },
    Tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  }));


  export default useStyles;