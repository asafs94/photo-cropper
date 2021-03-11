import { fade, makeStyles } from "@material-ui/core";

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
    ButtonGroup:{
      width: '100%',
    },
    Button:{
        fontSize: 'calc(1rem)',
        lineHeight: 1,
        minHeight: 38,
        width: '100%',
        boxSizing: 'border-box',
        padding: 0,
        minWidth: 'unset'
    },
    FontSelect:{
      width: "100%",
      height: "100%"
    },
    TextField: {
      width: "100%",
      height: "100%",
      minHeight: 38,
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
    },
    TextShadow:{
      textShadow: `4em 4em ${fade(theme.palette.text.primary, 0.5)}`,
      fontSize: 'inherit',
      fontWeight: 700
    }
  };
});

export default useStyles;
