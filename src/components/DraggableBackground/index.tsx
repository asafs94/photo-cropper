import { useMediaQuery } from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { Point } from "react-easy-crop/types";
import useStyles from "./styles";

interface Props {
  src?: string;
  className?: string;
  style?: object;
  zoomSensitivity?: number;
  setZoom: (zoom: number) => void;
  setPosition: (location: Point) => void;
  zoom: number;
  position: Point;
  onContextMenu:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}

export default function DraggableBackground({
  src = "",
  className = "",
  zoomSensitivity = 1,
  setZoom,
  setPosition,
  zoom,
  position,
  onContextMenu,
}: Props) {
  const classes = useStyles();
  const rootClassNames = [classes.Root, className].join(" ");
  const containerRef = useRef<any>();
  const [cropSize, setCropSize] = useState({ width: 0, height: 0 });
  const timeoutRef = useRef<any>();
  const isPrintView = useMediaQuery("print");

  const handleDoubleClick = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const resetCropSize = useCallback(() => {
    clearTimeout(timeoutRef.current);
    const container = containerRef.current as HTMLDivElement;
    if (!container) {
      timeoutRef.current = setTimeout(resetCropSize, 0);
    } else {
      setCropSize({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    }
  }, [setCropSize]);

  useEffect(() => {
    resetCropSize();
  }, []);

  return (
    <div
      className={rootClassNames}
      onTouchStart={ (event) => event.stopPropagation() }
      onWheel={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
      ref={containerRef}
      onDoubleClick={handleDoubleClick}
      onContextMenu={onContextMenu}
    >
      <Cropper
        crop={position}
        cropSize={cropSize}
        disableAutomaticStylesInjection={isPrintView}
        zoom={zoom}
        image={src}
        onCropChange={setPosition}
        onZoomChange={setZoom}
        showGrid={false}
        restrictPosition={false}
        minZoom={0.1}
      />
    </div>
  );
}
