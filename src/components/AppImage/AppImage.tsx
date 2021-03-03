import { makeStyles } from "@material-ui/core";
import React from "react";
import DisplayText from "../ImageEditor/TextBox/DisplayText";
import { Position } from "../../types";
import DraggableBackground from "../DraggableBackground";
import TextBox from "../../types/TextBox";

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
}

const useStyles = makeStyles((theme) => {
  return {
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
  textboxes
}: Props) {

  return (
    <div onContextMenu={onContextMenu} >
      <DraggableBackground
        className={className}
        disabled={cropDisabled}
        src={src}
        setPosition={setCrop}
        setZoom={setZoom}
        zoom={zoom}
        position={crop}
      />
      {textboxes.map((textbox) => (
        <DisplayText textbox={textbox} key={textbox.id}></DisplayText>
      ))}
    </div>
  );
}
