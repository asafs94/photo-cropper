import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React, { useCallback, useEffect, useRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import DragHandleIcon from '@material-ui/icons/DragHandle';
import Draggable, { DraggableEventHandler } from "react-draggable";
import useStyles from "./styles";
import { ClickAwayListener } from "@material-ui/core";

interface Props {
  textStyle?: CSSProperties;
  onFocus?: (event: FocusEvent | React.FocusEvent) => void;
  onBlur?: (event: FocusEvent | React.FocusEvent) => void;
  focused?: boolean;
  selected?: boolean;
  displayMode?: boolean;
  html: string,
  setHtml: (html: any)=> void,
  onSelect?: (event: React.MouseEvent) => void;
  onDeselect?: () => void;
  position: { x: number, y: number },
  handleDrag: DraggableEventHandler
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
  onDeselect, 
  position,
  handleDrag
}: Props) {
  const classes = useStyles({ textStyle, selected });

  const editable = useRef<any>();

  const onChange = useCallback(
    (event: ContentEditableEvent) => {
      setHtml(event.target.value);
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

  const handleDeselect = useCallback(() => {
    editable.current.blur();
    onDeselect && onDeselect(); 
  },[onDeselect])

  const [Wrapper, WrapperProps] = onDeselect ? [ClickAwayListener as any, { onClickAway: handleDeselect }] : [React.Fragment, {}]

  return (
    <Wrapper {...(WrapperProps)}>
        <Draggable position={position} onDrag={handleDrag} disabled={!selected || displayMode} handle={`.${classes.Handle}`} bounds="parent">
            <div className={classes.Root} onClick={onSelect}>
                {selected && !displayMode && <DragHandleIcon className={classes.Handle} />}
                <ContentEditable
                contentEditable={!displayMode}
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
    </Wrapper>
  );
}
