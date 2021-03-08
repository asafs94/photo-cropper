import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const gap = theme.spacing(); 
  return {
    Root: {
      display: "flex",
      alignItems: 'center',
      boxSizing: "border-box",
      flexWrap: "wrap",
      padding: gap,
    },
    Button:{
        fontSize: 'calc(1rem)',
        lineHeight: 1,
        minHeight: "100%"
    },
    FontSelect:{
      width: "100%",
      height: "100%"
    },
    TextField: {
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      display: "flex",
      border: '1px solid '+theme.palette.divider,
      borderRadius: 4,
      "&:focus-within":{
        borderColor: theme.palette.primary.main,
        borderWidth: 3, 
      },
      "& input":{
        padding: "3px 8px",
      },
    }
  };
});

export default useStyles;
