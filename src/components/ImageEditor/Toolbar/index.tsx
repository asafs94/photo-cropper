import React from "react";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import {
  Button,
  Paper,
  ButtonGroup,
  InputBase,
  Grid,
  Tooltip,
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
import FontSelect from "../../FontSelect";
import { useAppFonts } from "../../../utils/hooks/fonts";
import ColorPicker from "../ColorPicker";
import { TextStyle, HorizontalAlignment } from "../../../types";
import { RGBColor } from "react-color";
import TextBox from "../../../types/TextBox";
import ShadowPicker from "../ShadowPicker";
import { TextShadowPayload, TextStrokePayload } from "../../../types/StylesDefinitions";
import StrokePicker from "../StrokePicker";

interface Props {
  className?: string;
  addTextBox: () => void;
  selectedTextbox?: TextBox;
  selectedTextboxHandlers?: {
    toggleStyle: (styleType: TextStyle) => void;
    setAlignment: (alignment: "center" | "left" | "right") => void;
    setFontSize: (fontSize: number) => void;
    setFontFamily: (fontFamily: string) => void;
    setColor: (color: RGBColor) => void,
    setTextShadow: (textShadow: TextShadowPayload) => void,
    setTextStroke: (textStroke: Partial<TextStrokePayload>) => void
  }
}

export default function Toolbar({
  addTextBox,
  className,
  selectedTextbox,
  selectedTextboxHandlers = {
    toggleStyle: () => {},
    setAlignment: () => {},
    setFontSize: () => {},
    setFontFamily: () => {},
    setColor: () => {},
    setTextShadow: () => {},
    setTextStroke: () =>{}
  },
}: Props) {
  const classes = useStyles();
  const rootClassName = [classes.Root, className].join(" ");
  const { toggleStyle, setAlignment, setFontSize, setFontFamily, setColor, setTextShadow, setTextStroke } = selectedTextboxHandlers;
  const { bold, italic, underlined, alignment, fontSize, fontFamily, color, shadow, stroke } = selectedTextbox?.state || {};
  const { fontsByLanguage } = useAppFonts()

  const _toggleStyle = (style: TextStyle) => () => toggleStyle(style);

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
    alignmentType: HorizontalAlignment
  ) => any = (alignmentType: HorizontalAlignment) => {
    let props = {
      onClick: () => setAlignment && setAlignment(alignmentType),
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
      <Grid container spacing={1} alignItems='center'>
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
          <FontSelect exampleText={{ value: selectedTextbox?.content || '', style: selectedTextbox?.style }} disabled={!selectedTextbox} onChange={setFontFamily} className={classes.FontSelect} fontsByLanguage={fontsByLanguage} selectedFont={fontFamily || ''} />
        </Grid>
        <Grid item xs={5}>
          <div className={classes.TextField} >
          <InputBase 
              placeholder="Size"
              disabled={!selectedTextbox}
              value={fontSize}
              type="number"
              onChange={(event) => {
                setFontSize(Number(event.target.value));
              }} />
          </div>
        </Grid>
        <Grid item xs={2}>
          <ColorPicker disabled={!selectedTextbox} className={classes.Button} color={color} onChange={setColor} />
        </Grid>
        <Grid item xs={4}>
          <ButtonGroup className={classes.ButtonGroup} disabled={!selectedTextbox}>
            <Button
              {...getProps(bold?.isBold || false)}
              className={classes.Button}
              onClick={_toggleStyle("bold")}
            >
              <FormatBold fontSize="inherit" />
            </Button>
            <Button
              {...getProps(italic || false)}
              className={classes.Button}
              onClick={_toggleStyle("italic")}
            >
              <FormatItalic fontSize="inherit" />
            </Button>
            <Button
              {...getProps(underlined || false) }
              className={classes.Button}
              onClick={_toggleStyle("underlined")}
            >
              <FormatUnderlined fontSize="inherit" />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={4}>
          <ButtonGroup className={classes.ButtonGroup} disabled={!selectedTextbox}>
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
        <Grid item xs={1}>
              <ShadowPicker textShadow={shadow} onChange={setTextShadow} disabled={!selectedTextbox} classes={{ button: classes.Button }} />
        </Grid>
        <Grid item xs={1}>
              <StrokePicker stroke={stroke} onChange={setTextStroke} classes={{ button: classes.Button }} disabled={!selectedTextbox} />
        </Grid>
      </Grid>
    </Paper>
  );
}
