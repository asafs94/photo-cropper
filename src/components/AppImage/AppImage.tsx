import { makeStyles } from "@material-ui/core";
import React, { useRef } from "react";
import DisplayText from "../ImageEditor/TextBox/DisplayText";
import { Position } from "../../types";
import DraggableBackground from "../DraggableBackground";
import TextBox from "../../types/TextBox";
import IconOverlay from "../IconOverLay"
import { Lock } from "@material-ui/icons";

interface Props {
  className?: string;
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  cropDisabled?: boolean;
  src: string,
  crop: Position,
  zoom: number,
  setZoom: (zoom:number) => void,
  setCrop: (crop: Position) => void,
  textboxes: TextBox[],
  onClick?: (event: React.MouseEvent) => void,
  locked?: boolean
}

const useStyles = makeStyles((theme) => {
  return {
    Root:{
      position: "relative",
      width: "100%",
      height: "100%"
    },
    Content: {
      width: "100%",
      height: "100%",
    },
  };
});

export default function AppImage({
  className,
  onContextMenu,
  cropDisabled=false,
  src,
  crop,
  zoom,
  setZoom,
  setCrop,
  textboxes,
  onClick,
  locked=false
}: Props) {

  const classes = useStyles()
  const parentRef = useRef<HTMLDivElement | undefined>()

  return (
    <div ref={ref => parentRef.current = ref? ref : undefined} onClick={onClick} onContextMenu={onContextMenu} className={[classes.Root, className].join(' ')} >
      <DraggableBackground
        className={classes.Content}
        disabled={cropDisabled}
        src={src}
        setPosition={setCrop}
        setZoom={setZoom}
        zoom={zoom}
        position={crop}
      />
      {textboxes.map((textbox) => (
        <DisplayText textbox={textbox} key={textbox.id} parent={parentRef?.current}></DisplayText>
      ))}
      {locked && <IconOverlay IconComponent={Lock}  />}
    </div>
  );
}
