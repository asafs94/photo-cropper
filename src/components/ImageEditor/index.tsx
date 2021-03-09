import { Button, Dialog, DialogActions, DialogTitle, Paper } from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DraggableEventHandler } from "react-draggable";
import useStyles from "./styles";
import TextBox from "./TextBox";
import TextBoxObject from "../../types/TextBox";
import Toolbar from "./Toolbar";
import { setItemById } from "../../utils";
import {
  useEditableImage,
  useImageTextboxes,
} from "../../utils/hooks/single-image";
import AppImage from "../AppImage/AppImage";
import ZoomWrapper from "../ZoomWrapper";
import useSingleTextbox from "../../utils/hooks/single-textbox";
import { useStateWithPromise } from "../../utils/hooks";

export default function ImageEditor({ imageId, imageSize, onClose, closeEditor }: any) {
  const classes = useStyles({ imageSize });
  const [selected, setSelected] = useState<string>();
  const [saveBeforeExitDialog, setSaveBeforeExitDialog] = useStateWithPromise<boolean>(false);
  const { image, setCrop, setZoom, lock } = useEditableImage(imageId);
  const { setTextboxes, submitTextboxes, textboxes, dirty } = useImageTextboxes(
    imageId
  );
  const { textbox: selectedTextbox, setAlignment, setColor, setFontFamily, setFontSize, toggleStyle } = useSingleTextbox(selected, textboxes, setTextboxes);
  const selectedTextboxHandlers = { setAlignment, setColor, setFontFamily, setFontSize, toggleStyle };
  const dragParentRef = useRef();

  useEffect(()=>{
    if(closeEditor){
      if(dirty){
        setSaveBeforeExitDialog(true);
      } else {
        closeEditor.resolve();
      }
    }
  },[closeEditor, dirty]);

  const save = useCallback(()=>{
    submitTextboxes();
    lock();
  },[submitTextboxes, lock]);
  
  const onDialogResponse = useCallback((response: "discard" | "save") => async () => {
    if(response === "save"){
      save();
    }
    await setSaveBeforeExitDialog(false);
    closeEditor.resolve();
  },[save, setSaveBeforeExitDialog, closeEditor])

  const onSave = useCallback(() => {
    save();
    onClose && onClose();
  }, [save, onClose]);

  const setHtml = useCallback(
    (id: string) => (_content: string) => {
      setTextboxes(
        setItemById(id, (textbox) => {
          textbox.content = _content;
          return textbox;
        })
      );
    },
    [setTextboxes]
  );

  const deselect = useCallback(
    (id: string) => () => {
      setSelected((_selected) => (_selected === id || !id ? "" : _selected));
    },
    [setSelected]
  );

  const getOnlyUsedTextBoxes = useCallback(
    (selectedId: string | undefined) => (allTextboxes: TextBoxObject[]) => {
      return allTextboxes.filter(
        (textbox) => textbox.content || textbox.id === selectedId
      );
    },
    []
  );

  useEffect(() => {
    setTextboxes(getOnlyUsedTextBoxes(selected));
  }, [selected, setTextboxes, getOnlyUsedTextBoxes]);

  const addNewTextBox = useCallback(() => {
    const _textbox = new TextBoxObject({ x: 0, y: 0 });
    setSelected(_textbox.id);
    setTextboxes((_tb) => {
      return [..._tb, _textbox];
    });
  }, [setSelected, setTextboxes]);

  const handleDrag: (id: string) => DraggableEventHandler = useCallback(
    (id: string) => (event, data) => {
      event.stopPropagation()
        setTextboxes(
          setItemById(id, (textbox) => {
            textbox.position = data;
            return textbox;
          })
        );
    },
    [setTextboxes]
  );

  const onSelect = useCallback(
    (id: string) => (event: React.MouseEvent) => {
      event.stopPropagation();
      setSelected(id);
    },
    [setSelected]
  );

  if(!image){
    return null;
  }

  return (
    <Paper className={classes.Root}>
      <Toolbar
        className={classes.Toolbar}
        addTextBox={addNewTextBox}
        selectedTextbox={selectedTextbox}
        selectedTextboxHandlers={selectedTextboxHandlers}
      />
      <div className={classes.EditableArea}>
      <ZoomWrapper>
      <Paper innerRef={dragParentRef} className={classes.Editable} onClick={deselect("")}>
        <AppImage
          cropDisabled={true}
          className={classes.Image}
          textboxes={[]}
          crop={image.crop}
          setCrop={setCrop}
          zoom={image.zoom}
          setZoom={setZoom}
          src={image.url}
        />
        {textboxes.map((textbox) => (
          <TextBox
            key={textbox.id}
            html={textbox.content}
            setHtml={setHtml(textbox.id)}
            onSelect={onSelect(textbox.id)}
            selected={selected === textbox.id}
            handleDrag={handleDrag(textbox.id)}
            position={textbox.position}
            textStyle={textbox.style}
            parentElement={dragParentRef?.current}
          />
        ))}
      </Paper>
      </ZoomWrapper>
      </div>
      <Button
        className={classes.SaveButton}
        onClick={onSave}
        fullWidth
        variant="contained"
        color="primary"
      >
        Save
      </Button>
      <Dialog open={saveBeforeExitDialog}>
        <DialogTitle>Should save changes?</DialogTitle>
        <DialogActions>
          <Button onClick={onDialogResponse("discard")}>Discard</Button>
          <Button color="primary" onClick={onDialogResponse("save")}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
