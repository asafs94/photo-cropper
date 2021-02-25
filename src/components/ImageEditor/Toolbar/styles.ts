import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const gap = theme.spacing(); 
  return {
    Root: {
      display: "flex",
      alignItems: 'center',
      boxSizing: "border-box",
      padding: gap,
      '&>*:not(:first-child)':{
          marginLeft: gap,
      }
    },
    Button:{
        fontSize: 'calc(1rem + 2px)',
        lineHeight: 1
    },
    Input: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
        maxHeight: 30,
        boxSizing: 'border-box',
        fontSize: 'calc(1rem)',
        lineHeight: 1,
        padding: 0,
        paddingLeft: theme.spacing(0.5),
        '& input':{
          padding: `5px 0 6px`,
        }
    }
  };
});

export default useStyles;
