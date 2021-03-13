import { Button, Popover, Slider, Typography } from "@material-ui/core";
import Border from "@material-ui/icons/BorderColor";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AlphaPicker, RGBColor, TwitterPicker } from "react-color";

export default function StrokePicker({ stroke={ width:0, color: { r:0, g:0,b:0, a: 1 } }, onChange, classes, disabled }: any) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<any>();
  const [width, setWidth] = useState<number>(stroke.width);
  const [color, setColor] = useState<RGBColor>(stroke.color);

  useEffect(()=>{
    onChange({width, color})
  },[onChange, width, color])

  const setAlpha = useCallback(
    (alpha: number) => {
      setColor(c => ({ ...c, a: alpha }))
    },
    [setColor],
  )

  return (
    <div>
      <Button disabled={disabled} className={classes.button} variant="outlined" innerRef={buttonRef} onClick={()=>setOpen(true)}>
        <Border fontSize="inherit" />
      </Button>
      <Popover open={open} onClose={()=> setOpen(false)} anchorEl={buttonRef.current} anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }} >
          <div style={{ width: 260, padding: 20, userSelect: 'none' }}>
            <Typography gutterBottom>Width</Typography>
            <Slider value={width} valueLabelDisplay="auto" min={0} max={10} step={0.5} marks={[0,5,10].map(v=>({ value: v, label: `${v}px` }))} onChange={(e,v)=>setWidth(v as number)} ></Slider>
            <Typography gutterBottom variant='button' color='textSecondary' >Color</Typography>
            <TwitterPicker color={color} onChange={(color)=> setColor(c => ({ ...color.rgb, a: c.a }))} styles={{ default: { card: { borderRadius: 0, boxShadow: 'none' },  body: { padding: 0 } } }} width='100%' triangle={"hide"} />
            <Typography gutterBottom >Alpha</Typography>
            <AlphaPicker color={color} onChange={(color)=> setAlpha(color.rgb.a as number)} width={"calc(100% - 9px)"} />
          </div>
      </Popover>
    </div>
  );
}
