import { makeStyles, Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

interface StyleProps {
  textStyle: CSSProperties;
  selected: boolean;
}

export default makeStyles<Theme, StyleProps>((theme) => {
  return {
    Root: {
      width: "fit-content",
      height: "fit-content",
    },
    Input: {
      width: "fit-content",
      height: "fit-content",
      padding: theme.spacing(),
      outlineColor: theme.palette.primary.main,
      outline: ({ selected }) =>
        selected ? `2px solid ${theme.palette.primary.main}` : "none",
    },
    Handle: {
      position: "absolute",
      top: "100%",
      left: "100%",
      cursor: "move",
      border: `2px solid ${theme.palette.text.primary}`,
      borderRadius: "50%",
    },
  };
});
