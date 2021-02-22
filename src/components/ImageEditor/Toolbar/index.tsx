import React from "react";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import { Button, Paper, ButtonGroup } from "@material-ui/core";
import useStyles from "./styles";
import {
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatBold,
  FormatUnderlined,
  FormatItalic,
} from "@material-ui/icons";

interface Props {
  className?: string;
  addTextBox: () => void;
}

export default function Toolbar({ addTextBox, className }: Props) {
  const classes = useStyles();
  const rootClassName = [classes.Root, className].join(" ");
  return (
    <Paper className={rootClassName}>
      <Button
        className={classes.Button}
        variant="outlined"
        onClick={addTextBox}
        style={{ marginRight: "auto" }}
      >
        <TextFieldsIcon fontSize="inherit" />
      </Button>
      <ButtonGroup>
        <Button className={classes.Button}>
          <FormatBold fontSize="inherit" />
        </Button>
        <Button className={classes.Button}>
          <FormatItalic fontSize="inherit" />
        </Button>
        <Button className={classes.Button}>
          <FormatUnderlined fontSize="inherit" />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button className={classes.Button}>
          <FormatAlignLeft fontSize="inherit" />
        </Button>
        <Button className={classes.Button}>
          <FormatAlignCenter fontSize="inherit" />
        </Button>
        <Button className={classes.Button}>
          <FormatAlignRight fontSize="inherit" />
        </Button>
      </ButtonGroup>
    </Paper>
  );
}
