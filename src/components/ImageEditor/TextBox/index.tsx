import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import DragHandleIcon from '@material-ui/icons/DragHandle';
import Draggable, { DraggableEventHandler } from "react-draggable";
import useStyles from "./styles";

interface Props {
  textStyle?: CSSProperties;
  onFocus?: (event: FocusEvent | React.FocusEvent) => void;
  onBlur?: (event: FocusEvent | React.FocusEvent) => void;
  selected?: boolean;
  displayMode?: boolean;
  html: string,
  setHtml?: (html: any)=> void,
  onSelect?: (event: React.MouseEvent) => void;
  position: { x: number, y: number },
  handleDrag?: DraggableEventHandler,
  parentElement?: HTMLElement,
}

export default function TextBox({
  textStyle = {},
  onFocus,
  onBlur,
  selected = false,
  displayMode = false,
  html,
  setHtml,
  onSelect,
  position,
  handleDrag,
}: Props) {
  const classes = useStyles({ textStyle, selected });

  const editable = useRef<any>();

  const onChange = useCallback(
    (event: ContentEditableEvent) => {
        setHtml && setHtml(event.target.value);
    },
    [setHtml]
  );

  useEffect(() => {
    if (editable.current) {
      editable.current.onfocus = onFocus;
      editable.current.onblur = onBlur;
    }
  }, []);

  useEffect(()=>{
    if(!selected){
      editable.current.blur();
    }
  },[selected])

  return (
        <Draggable defaultClassName={classes.Draggable} position={position} onDrag={handleDrag} disabled={!selected || displayMode} handle={`.${classes.Handle}`} bounds="parent">
            <div className={classes.Root} onClick={onSelect}>
                {selected && !displayMode && <DragHandleIcon className={classes.Handle} />}
                <ContentEditable
                contentEditable={displayMode? "false" : "true"}
                disabled={displayMode}
                innerRef={editable}
                className={classes.Input}
                html={html}
                style={{...textStyle, userSelect: selected? 'auto' : 'none'}}
                onChange={onChange}
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                ></ContentEditable>
            </div>
        </Draggable>
  );
}
