import React from "react";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import {
  Button,
  Paper,
  ButtonGroup,
  InputBase,
  Grid,
} from "@material-ui/core";
import useStyles from "./styles";
import {
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatBold,
  FormatUnderlined,
  FormatItalic,
} from "@material-ui/icons";

// import { Autocomplete } from "@material-ui/lab"
// import { useGoogleFonts } from "../../../utils/hooks/fonts";
import GoogleFont from "../../../types/GoogleFont";
import FontSelect from "../../FontSelect";
import { useAppFonts } from "../../../utils/hooks/fonts";
// import FontSelect from "../../FontSelect";

interface Props {
  className?: string;
  addTextBox: () => void;
  selected: boolean;
  toggleBold: () => void;
  toggleUnderlined: () => void;
  toggleItalic: () => void;
  alignText: (alignment: "center" | "left" | "right") => () => void;
  selectedState: any;
  setFontSize: (fontSize: number) => void;
  setFontFamily: (fontFamily: string) => void;
}

export default function Toolbar({
  addTextBox,
  className,
  selected,
  toggleBold,
  toggleUnderlined,
  toggleItalic,
  alignText,
  setFontFamily,
  selectedState,
  setFontSize,
}: Props) {
  const classes = useStyles();
  const rootClassName = [classes.Root, className].join(" ");
  const { bold, italic, underlined, alignment, fontSize, fontFamily } = selectedState || {};
  const { fontsByLanguage } = useAppFonts()

  const getProps: (
    active: boolean
  ) => { color: "default" | "primary"; variant: "outlined" | "contained" } = (
    active: boolean
  ) => {
    return active
      ? { color: "primary", variant: "contained" }
      : { color: "default", variant: "outlined" };
  };

  const getAlignmentProps: (
    alignmentType: "left" | "right" | "center"
  ) => any = (alignmentType) => {
    let props = {
      onClick: alignText(alignmentType),
      color: "default",
      variant: "outlined",
    };
    if (alignmentType === alignment) {
      props = { ...props, color: "primary", variant: "contained" };
    }
    return props;
  };

  return (
    <Paper className={rootClassName}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Button
            className={classes.Button}
            variant="outlined"
            onClick={addTextBox}
          >
            <TextFieldsIcon fontSize="inherit" />
          </Button>
        </Grid>
        <Grid item xs={5}>
          <FontSelect exampleText={{ value: selectedState.value, style: selectedState.style }} disabled={!selected} onChange={setFontFamily} className={classes.FontSelect} fontsByLanguage={fontsByLanguage} selectedFont={fontFamily} />
        </Grid>
        <Grid item xs={5}>
          <div className={classes.TextField} >
          <InputBase 
              placeholder="Size"
              disabled={!selected}
              value={fontSize}
              type="number"
              onChange={(event) => {
                setFontSize(Number(event.target.value));
              }} />
          </div>
        </Grid>
        <Grid item>
          <ButtonGroup disabled={!selected}>
            <Button
              {...getProps(bold)}
              className={classes.Button}
              onClick={() => toggleBold()}
            >
              <FormatBold fontSize="inherit" />
            </Button>
            <Button
              {...{ ...getProps(italic) }}
              className={classes.Button}
              onClick={toggleItalic}
            >
              <FormatItalic fontSize="inherit" />
            </Button>
            <Button
              {...{ ...getProps(underlined) }}
              className={classes.Button}
              onClick={toggleUnderlined}
            >
              <FormatUnderlined fontSize="inherit" />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <ButtonGroup disabled={!selected}>
            <Button {...getAlignmentProps("left")} className={classes.Button}>
              <FormatAlignLeft fontSize="inherit" />
            </Button>
            <Button {...getAlignmentProps("center")} className={classes.Button}>
              <FormatAlignCenter fontSize="inherit" />
            </Button>
            <Button {...getAlignmentProps("right")} className={classes.Button}>
              <FormatAlignRight fontSize="inherit" />
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Paper>
  );
}
