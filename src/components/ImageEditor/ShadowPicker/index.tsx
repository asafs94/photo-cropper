import { Button, Popover, Slider, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AlphaPicker, Color, RGBColor, TwitterPicker } from "react-color";
import ShadowIcon from "../../../resources/icons/ShadowIcon";
import { TextShadow, TextShadowPayload } from "../../../types/StylesDefinitions";

interface Props {
  disabled?: boolean;
  classes: {
    button?: string;
  };
  onChange: (textShadow: TextShadowPayload) => void,
  textShadow?: TextShadow
}


export default function ShadowPicker({ disabled, classes = {}, onChange, textShadow = new TextShadow({ h:0, v:0, blurRadius: 0 }) }: Props) {
  const [open, setOpen] = useState(false);
  const [vShadow, setV] = useState(textShadow.v);
  const [hShadow, setH] = useState(textShadow.h);
  const [blur, setBlur] = useState(textShadow.blurRadius);
  const [color, setColor] = useState(textShadow.color || { r: 0, b:0, g: 0, a: 1 });
  const buttonRef = useRef<any>();

  useEffect(()=>{
    onChange({ h: hShadow, v: vShadow, blurRadius: blur, color: color });
  },[blur, color, hShadow, vShadow, onChange])

  const setAlpha = useCallback((a: number)=>{
    setColor(color => {
      return {
        ...color,
        a,
      }
    })
  },[setColor])

  const setValue = (setter: React.Dispatch<React.SetStateAction<number>>) => (
    event: React.ChangeEvent<{}>,
    value: number | number[]
  ) => {
    const _val = value as number[];
    if (_val.every((v) => v === 0)) {
      setter(0);
    } else if (_val[1] === 0) {
      setter(_val[0]);
    } else if (_val[0] === 0) {
      setter(_val[1]);
    } else {
      setter((v) => {
        return _val.find((val) => val !== v) || 0;
      });
    }
  };

  const marks = (value: number) =>[{ value: -20, label: '-20' },{ value: 0, label: '0' }, {value: value, label: `${value}`} , { value: 20, label: '20' }]

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        ref={buttonRef}
        disabled={disabled}
        className={classes.button}
        variant="outlined"
      >
        <ShadowIcon />
      </Button>
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={buttonRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div style={{ width: 260, padding: 20 }}>
          <Typography gutterBottom>
            Vertical Offset
          </Typography>
          <Slider
            min={-20}
            max={20}
            value={vShadow < 0 ? [vShadow, 0] : [0, vShadow]}
            onChange={setValue(setV)}
            marks={marks(vShadow)}
          />
          <Typography gutterBottom>
            Horizontal Offset
          </Typography>
          <Slider
            min={-20}
            max={20}
            value={hShadow < 0 ? [hShadow, 0] : [0, hShadow]}
            onChange={setValue(setH)}
            marks={marks(hShadow)}
          />
          <Typography gutterBottom>Blur Radius</Typography>
          <Slider
            min={0}
            max={20}
            value={blur}
            onChange={(e,v)=> setBlur(v as number)}
            marks={marks(blur)}
          />
          <Typography gutterBottom variant='button' color='textSecondary' >Color</Typography>
          <TwitterPicker color={color} onChange={(color)=> setColor(c => ({ ...color.rgb, a: c.a }))} styles={{ default: { card: { borderRadius: 0, boxShadow: 'none' },  body: { padding: 0 } } }} width='100%' triangle={"hide"} />
          <Typography gutterBottom >Alpha</Typography>
          <AlphaPicker color={color} onChange={(color)=> setAlpha(color.rgb.a as number)} width={"calc(100% - 9px)"} />
        </div>
      </Popover>
    </div>
  );
}
