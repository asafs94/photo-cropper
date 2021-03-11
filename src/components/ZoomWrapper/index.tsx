import React, { useCallback, useEffect, useRef, useState } from "react";
import { Fab, fade, makeStyles, MenuItem, Select } from "@material-ui/core";
import { Add, Remove, PanTool } from "@material-ui/icons";
import { measureDistance } from "../../utils";
import { useStateWithPromise } from "../../utils/hooks";

const useStyles = makeStyles((theme) => {
  return {
    Wrapper: {
      width: "100%",
      height: "100%",
      position: "relative",
      overflow: "hidden",
      cursor: "grab",
      boxSizing: "border-box",
    },
    Settings: {
      position: "sticky",
      top: "100%",
      left: 0,
      zIndex: 1,
      alignSelf: "flex-start",
      "&>div": {
        position: "absolute",
        left: 0,
        bottom: -20,
        width: "fit-content",
        height: "fit-content",
        display: "grid",
        gridGap: theme.spacing(),
        gridTemplateColumns: "auto auto auto auto",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    Select: {
      width: 190,
      maxWidth: '40vw',
    },
    Content: {
      width: "fit-content",
      height: "fit-content",
      position: "absolute",
      top: ({ childSize }: any) => `calc(50% - ${childSize.height / 2}px)`,
      left: ({ childSize }: any) => `calc(50% - ${childSize.width / 2}px)`,
      margin: "auto",
      cursor: "initial",
      transform: ({ scale, translate }: any) =>
        `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
    },
    MoveModeOverlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: fade(theme.palette.background.default,0.2),
      zIndex: 2,
      cursor: "grab"
    },
    "@media print": {
      Content: {
        transform: "none !important",
      },
      Settings: {
        display: "none",
      },
    },
  };
});

interface Props {
  children: React.ReactChild;
  defaultOption?: "fit" | number;
  removeSelect?: boolean,
  removeZoomControllers?: boolean,
  removePanTool?: boolean
}

const selectOptions: Array<"fit" | number> = ["fit", 0.25, 0.5, 0.75, 1];

const ZoomWrapper = ({ children: child, defaultOption = "fit", removeSelect, removeZoomControllers, removePanTool }: Props) => {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [option, setOption] = useStateWithPromise<"fit" | number>(defaultOption);
  const [fitScale, setFitScale] = useState<number>(0);
  const [customOption, setCustomOption] = useState<null | number>(null);
  const [childSize, setChildSize] = useState({ width: 0, height: 0 });
  const [dragging, setDragging] = useState(false);
  const [moveMode, setMoveMode] = useState(false);
  const [pinching, setPinching] = useState(false);
  const distanceBetwwenFingers = useRef(0);
  const mousePosition = useRef({ x: 0, y: 0 });
  const ref = useRef<any>();
  const childRef = useRef<any>();
  const moveModeOverlayRef = useRef<any>();
  const classes = useStyles({ scale, fitScale, childSize, translate, moveMode });

  const calcFitScale = useCallback(() => {
    const wrapper = ref.current;
    const container = wrapper.getBoundingClientRect();
    const child = childRef.current;
    const childSize = { width: child.clientWidth, height: child.clientHeight };
    setChildSize(childSize);
    const ratio = {
      width: container.width / child.clientWidth,
      height: container.height / child.clientHeight,
    };
    if (ratio.height < 1 || ratio.width < 1) {
      if (ratio.height < ratio.width) {
        setFitScale(ratio.height*0.95);
      } else {
        setFitScale(ratio.width*0.95);
      }
    } else {
      setFitScale(1)
    }
  }, [setFitScale]);

  const setZoom = useCallback(
    (_option: "fit" | number) => {
      if (_option === "fit") {
        setScale(fitScale);
      } else {
        setScale(_option)
      }
    },
    [setScale, fitScale]
  );

  const setPosition = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      let obj: any;
      if ((event as any).changedTouches) {
        obj = (event as React.TouchEvent).changedTouches[0];
      } else {
        obj = event;
      }
      mousePosition.current = { x: obj.clientX, y: obj.clientY };
      setDragging(true);
    },
    [setDragging]
  );

  const centerChild = useCallback(()=>{
    const child = childRef.current;
    (child as HTMLDivElement).scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "center",
    });
  },[])

  useEffect(() => {
    calcFitScale();
    window.addEventListener("resize", calcFitScale, false);
    return () => {
      window.removeEventListener("resize", calcFitScale, false);
    };
  }, []);

  const onSelect = useCallback(
    async (
      event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
    ) => {
      const value = event.target.value as "fit" | number;
      setCustomOption(null);
      await setOption(value);
      centerChild();
    },
    [setOption, setCustomOption, centerChild]
  );

  const onAddZoom = useCallback(() => {
    setCustomOption(scale + 0.05);
  }, [setCustomOption, scale]);

  const onSubtractZoom = useCallback(() => {
    setCustomOption(scale - 0.05);
  }, [setCustomOption, scale]);

  useEffect(() => {
    if (customOption) {
      setOption(customOption);
    }
  }, [customOption, setOption]);

  useEffect(() => {
    setZoom(option);
    if(selectOptions.includes(option)){
      setTranslate({ x: 0, y: 0 })
    }
  }, [option, fitScale, setTranslate, setZoom]);

  const onDrag = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      event.preventDefault();
      const child = childRef.current as HTMLDivElement;
      if(child.contains(event.target as Node) && !moveMode){
        return;
      }
      let obj: any;
      if ((event as any).changedTouches) {
        obj = (event as React.TouchEvent).changedTouches[0];
      } else {
        obj = event;
      }
      if (dragging) {
        const { x, y } = mousePosition.current;
        const delta = { x: obj.clientX - x, y: obj.clientY - y };
        mousePosition.current = { x: obj.clientX, y: obj.clientY };
        const relativeDelta = { x: delta.x/scale, y: delta.y/scale };
        setTranslate((t) => {
          return {
            x: t.x + relativeDelta.x,
            y: t.y + relativeDelta.y,
          };
        });
      }
    },
    [setTranslate, dragging, moveMode, scale]
  );

  const onDrop = useCallback(
    (event: MouseEvent | TouchEvent) => {
      setDragging(false);
    },
    [setDragging]
  );

  useEffect(() => {
    document.addEventListener("mouseup", onDrop, false);
    document.addEventListener("touchend", onDrop, false);
    return () => {
      document.removeEventListener("mouseup", onDrop, false);
      document.removeEventListener("touchend", onDrop, false);
    };
  }, []);

  const onWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const child = childRef.current as HTMLDivElement;
    if(child.contains(event.target as Node) && !moveMode){
      return;
    }
    const delta = -event.deltaY / 1000;
    const result = scale + delta < 0.05? 0.05 : scale + delta;
    setCustomOption(result);
  };

  const onPinch = useCallback((event: React.TouchEvent) => {
    if(!pinching){
      return;
    }
    const points = Array.from(event.touches).map( point => ({ x: point.clientX, y: point.clientY }) );
    const currentDistance = measureDistance(points[0], points[1]);
    const oldDistance = distanceBetwwenFingers.current; 
    let ratio = (currentDistance/oldDistance);
    let _scale = Math.max(scale*ratio, 0.05);
    setCustomOption(_scale)
    distanceBetwwenFingers.current = currentDistance;
  },[setCustomOption, pinching, scale])

  const onTouchMove = useCallback( (event: React.TouchEvent) => {
    const child = childRef.current as HTMLDivElement;
    if(child.contains(event.target as Node) && !moveMode){
      return;
    }
    switch(event.touches.length){
      case 1: {
        onDrag(event);
        break;
      }
      case 2: {
        onPinch(event);
        break;
      }
    }
  },[onDrag, onPinch, moveMode])

  const setDistanceBetweenFingers = useCallback((event: React.TouchEvent)=>{
    const point1 = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    const point2 = { x: event.touches[1].clientX, y: event.touches[1].clientY };
    const distance = measureDistance(point1, point2);
    distanceBetwwenFingers.current = distance;
    setPinching(true);
  },[setPinching]);

  const onTouchStart = useCallback((event: React.TouchEvent)=>{
    const child = childRef.current as HTMLDivElement;
      if(child.contains(event.target as Node) && !moveMode){
        return;
      }
    switch(event.touches.length){
      case 1: {
        setPosition(event);
        break;
      }
      case 2: {
        setDistanceBetweenFingers(event);
        break;
      }
    }
  },[setPosition, setDistanceBetweenFingers, moveMode])


  const onTouchEnd = useCallback(()=>{
    setPinching(false);
    distanceBetwwenFingers.current = 0;
  },[setPinching])


  return (
    <div
      ref={ref}
      onWheel={onWheel}
      onMouseDown={setPosition}
      onMouseMove={onDrag}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      className={classes.Wrapper}
    >
      <div className={classes.Settings}>
        <div>
          { !removeSelect && <Select
            className={classes.Select}
            value={option}
            onChange={onSelect}
            variant="outlined"
          >
            {selectOptions.map((_option, index) => (
              <MenuItem key={`zoom-${_option}`} value={_option}>
                {_option === "fit"
                  ? `Fit to screen (${(fitScale * 100).toFixed()}%)`
                  : `${(_option * 100).toFixed()}%`}
              </MenuItem>
            ))}
            {customOption && (
              <option value={customOption} style={{ display: "none" }}>
                {(customOption * 100).toFixed()}%{}
              </option>
            )}
          </Select>}
          { !removeZoomControllers && <Fab size="small" color="primary" onClick={onAddZoom}>
            <Add />
          </Fab>}
          {!removeZoomControllers && <Fab
            size="small"
            color="primary"
            onClick={onSubtractZoom}
            disabled={scale - 0.05 < 0}
          >
            <Remove />
          </Fab>}
          { !removePanTool && <Fab size="small" color={moveMode? "primary": "default"} onClick={() => setMoveMode(m => !m) } ><PanTool /></Fab>}
        </div>
      </div>
      <div ref={childRef} className={classes.Content}>
        {child}
        {moveMode && <div ref={moveModeOverlayRef} className={classes.MoveModeOverlay} />}
      </div>
    </div>
  );
};

export default ZoomWrapper;
