import { Button, Popover, Slider, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import ShadowIcon from "../../../resources/icons/ShadowIcon";

interface Props {
  disabled?: boolean;
  classes: {
    button?: string;
  };
}

export default function ShadowPicker({ disabled, classes = {} }: Props) {
  const [open, setOpen] = useState(false);
  const [vShadow, setV] = useState(0);
  const [hShadow, setH] = useState(0);
  const [blur, setBlur] = useState(0);
  const buttonRef = useRef<any>();

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
        <div style={{ width: 250, padding: 20 }}>
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
        </div>
      </Popover>
    </div>
  );
}
