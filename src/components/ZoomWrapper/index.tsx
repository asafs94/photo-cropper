import React, { useCallback, useEffect, useRef, useState } from "react";
import { Fab, makeStyles, MenuItem, Select } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";

const useStyles = makeStyles((theme) => {
  return {
    Wrapper: {
      width: "100%",
      height:  "100%",
      position: "relative",
      overflow: "hidden",
      cursor: "grab"
    },
    Settings: {
      position: "sticky",
      top: "calc( 100% - 70px )",
      left: 0,
      zIndex: 1,
      alignSelf: "flex-start",
      '&>div':{
        position: 'absolute',
        left:0,
        top: 35,
        width: 'fit-content',
        height: 'fit-content',
        display: "grid",
        gridGap: theme.spacing(),
        gridTemplateColumns: "auto auto auto",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }
    },
    Select: {
      width: 190,
    },
    Content: {
      width: "fit-content",
      height: "fit-content",
      position: "absolute",
      top: ({childSize}: any) =>  `calc(50% - ${childSize.height/2}px)` ,
      left: ({childSize}: any) =>  `calc(50% - ${childSize.width/2}px)`,
      margin: "auto",
      transform: ({ scale, translate }: any) => `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
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
}

const selectOptions: Array<"fit" | number> = ["fit", 0.25, 0.5, 0.75, 1];

const ZoomWrapper = ({ children: child, defaultOption = "fit" }: Props) => {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({x: 0, y: 0});
  const [option, setOption] = useState<"fit" | number>(defaultOption);
  const [fitScale, setFitScale] = useState<number>(0);
  const [customOption, setCustomOption] = useState<null | number>(null);
  const [childSize, setChildSize] = useState({ width: 0, height: 0 });
  const [dragging, setDragging] = useState(false)
  const mousePosition = useRef({ x: 0, y:0 });
  const ref = useRef<any>();
  const childRef = useRef<any>();
  const classes = useStyles({ scale, fitScale, childSize, translate });

  const calcFitScale = useCallback(() => {
    const wrapper = ref.current;
    const container = wrapper.getBoundingClientRect();
    const child = childRef.current;
    const childSize = { width: child.clientWidth, height: child.clientHeight };
    setChildSize(childSize)
    const ratio = {
      width: container.width / child.clientWidth,
      height: container.height / child.clientHeight,
    };
    if (ratio.height < 1 || ratio.width < 1) {
      if (ratio.height < ratio.width) {
        setFitScale(ratio.height);
      } else {
        setFitScale(ratio.width);
      }
    }
  }, [setScale]);

  const setZoom = useCallback(
    (_option: "fit" | number) => {
      if (_option === "fit") {
        setScale(fitScale);
      } else {
        setScale(_option);
      }
    },
    [setScale, fitScale]
  );

  useEffect(() => {
    const child = childRef.current;
    (child as HTMLDivElement).scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "center",
    });
  }, [scale]);

  useEffect(() => {
    calcFitScale();
    window.addEventListener("resize", calcFitScale, false);
    return () => {
      window.removeEventListener("resize", calcFitScale, false);
    };
  }, []);

  const onSelect = useCallback(
    (
      event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
    ) => {
      const value = event.target.value as "fit" | number;
      setCustomOption(null);
      setOption(value);
    },
    [setOption, setCustomOption, setZoom, fitScale]
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
  }, [fitScale, option]);

  const onDrag = useCallback((event: React.MouseEvent)=>{
    event.preventDefault();
    if(dragging){
      const {x,y} = mousePosition.current;
      const delta = { x: event.clientX - x, y: event.clientY - y };
      mousePosition.current = { x: event.clientX, y: event.clientY };
      setTranslate((t)=>{
        return {
          x: t.x + delta.x,
          y: t.y + delta.y
        }
      })
    }
  },[setTranslate, dragging])

  const setPosition = (event: React.MouseEvent) => {
    mousePosition.current = { x: event.clientX, y: event.clientY };
    setDragging(true)
  }

  const onDrop = (event: MouseEvent) =>{
    setDragging(false)
  }

  useEffect(()=>{
    document.addEventListener('mouseup', onDrop, false)
    return () =>{
      document.removeEventListener('mouseup', onDrop, false)
    }
  },[])

  const onWheel = (event: React.WheelEvent) =>{
    const delta = -event.deltaY/1000;
    setCustomOption(scale + delta);
  }

  return (
    <div ref={ref} onWheel={onWheel} onMouseDown={setPosition} onMouseMove={onDrag} className={classes.Wrapper} >
      <div className={classes.Settings}>
        <div>
          <Select
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
          </Select>
          <Fab size="small" color="primary" onClick={onAddZoom}>
            <Add />
          </Fab>
          <Fab
            size="small"
            color="primary"
            onClick={onSubtractZoom}
            disabled={scale - 0.05 < 0}
          >
            <Remove />
          </Fab>
        </div>
      </div>
      <div ref={childRef}  className={classes.Content}>
        {child}
      </div>
    </div>
  );
};

export default ZoomWrapper;
