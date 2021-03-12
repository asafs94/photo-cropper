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
  onContextMenu?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  disabled?: boolean;
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
  disabled=false
}: Props) {
  const classes = useStyles({disabled});
  const rootClassNames = [classes.Root, className].join(" ");
  const containerRef = useRef<any>();
  const [cropSize, setCropSize] = useState({ width: 0, height: 0 });
  const timeoutRef = useRef<any>();
  const isPrintView = useMediaQuery("print");

  const handleDoubleClick = useCallback(() => {
    if(disabled){
      return;
    } else {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [setPosition, setZoom, disabled]);

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
  }, [resetCropSize]);

  const returnFunctionIfEnabled = useCallback((callback: any) =>{
    if(disabled){
      return () => {};
    } else {
      return callback;
    }
  }, [disabled]);

  const stopPropagation = useCallback((event: Event) => {
    event.stopPropagation()
  }, [])

  return (
    <div
      className={rootClassNames}
      onTouchStart={ returnFunctionIfEnabled(stopPropagation) }
      onWheel={ returnFunctionIfEnabled(stopPropagation)}
      onMouseDown={ returnFunctionIfEnabled(stopPropagation) }
      ref={containerRef}
      onDoubleClick={returnFunctionIfEnabled(handleDoubleClick)}
      onContextMenu={returnFunctionIfEnabled(onContextMenu)}
    >
      <Cropper
        classes={{ containerClassName: classes.CropperContainer , cropAreaClassName: classes.CropArea, mediaClassName: classes.CropMedia}}
        crop={position}
        cropSize={cropSize}
        disableAutomaticStylesInjection={isPrintView || disabled}
        zoom={zoom}
        zoomSpeed={zoomSensitivity}
        image={src}
        onCropChange={returnFunctionIfEnabled(setPosition)}
        onZoomChange={returnFunctionIfEnabled(setZoom)}
        showGrid={false}
        restrictPosition={false}
        minZoom={0.1}
      />
    </div>
  );
}
