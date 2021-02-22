import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const gap = theme.spacing(); 
  return {
    Root: {
      display: "flex",
      alignItems: 'center',
      flexWrap: 'nowrap',
      boxSizing: "border-box",
      padding: gap,
      '&>*:not(:first-child)':{
          marginLeft: gap,
      }
    },
    Button:{
        fontSize: 'calc(1rem + 2px)',
        lineHeight: 1
    }
  };
});

export default useStyles;
