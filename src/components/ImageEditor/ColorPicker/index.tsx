import { Button, makeStyles, Popover, Theme } from "@material-ui/core";
import React, { useCallback, useRef, useState } from "react";
import FormatColorTextIcon from "@material-ui/icons/FormatColorText";
import { ColorChangeHandler, SketchPicker, RGBColor } from "react-color";

interface Props {
  color?: RGBColor;
  onChange: (color: RGBColor) => void;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const useStyles = makeStyles<Theme, { color: RGBColor }>((theme) => {
  return {
    Root: {
      color: ({ color }) => {
        const { r, g, b, a } = color;
        return `rgba(${r},${g},${b},${a || 1})`;
      },
    },
  };
});

export default function ColorPicker({
  className,
  disabled,
  color = { r: 0, g: 0, b: 0, a: 1 },
  onChange,
  icon = <FormatColorTextIcon style={{ fontSize: "inherit" }} />,
}: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<any>();
  const classes = useStyles({ color });

  const togglePopover = useCallback(() => {
    setOpen((open) => !open);
  }, [setOpen]);

  const handleChange: ColorChangeHandler = useCallback(
    (color) => {
      onChange(color.rgb);
    },
    [onChange]
  );

  return (
    <>
      <Button
        disabled={disabled}
        className={[classes.Root, className].join(" ")}
        variant="outlined"
        innerRef={buttonRef}
        onClick={togglePopover}
      >
        {icon}
      </Button>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        onClose={togglePopover}
        anchorReference="anchorEl"
        anchorEl={buttonRef.current}
      >
        <SketchPicker color={color} onChange={handleChange} />
      </Popover>
    </>
  );
}
