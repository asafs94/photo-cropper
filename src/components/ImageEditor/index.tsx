import { Button, Paper } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { DraggableEventHandler } from "react-draggable";
import AppCroppable from "../../containers/AppCroppable";
import useStyles from "./styles";
import TextBox from "./TextBox";
import TextBoxObject from "../../types/TextBox";
import Toolbar from "./Toolbar";
import { setItemById } from "../../utils";

export default function ImageEditor({ imageId }: any) {
  const classes = useStyles({});
  const [selected, setSelected] = useState<string>();
  const [textBoxes, setTextBoxes] = useState<Array<TextBoxObject>>([]);

  const setHtml = useCallback(
    (id: string) => (_content: string) => {
      setTextBoxes(setItemById(id, (textbox) => (textbox.content = _content)));
    },
    [setTextBoxes]
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
    setTextBoxes(getOnlyUsedTextBoxes(selected));
  }, [selected, setTextBoxes, getOnlyUsedTextBoxes]);

  const addNewTextBox = useCallback(() => {
    const _textbox = new TextBoxObject({ x: 0, y: -250 });
    setSelected(_textbox.id);
    setTextBoxes((_tb) => {
      return [..._tb, _textbox];
    });
  }, [setSelected, setTextBoxes]);

  const handleDrag: (id: string) => DraggableEventHandler = useCallback(
    (id: string) => (event, data) => {
      setTextBoxes(setItemById(id, (textbox) => (textbox.position = data)));
    },
    [setTextBoxes]
  );

  const toggleBold = useCallback(() => {
    setTextBoxes(setItemById(selected, (textbox) => textbox.toggleBold()));
  }, [selected, setTextBoxes]);

  const toggleUnderlined = useCallback(() => {
    setTextBoxes(
      setItemById(selected, (textbox) => textbox.toggleUnderlined())
    );
  }, [selected, setTextBoxes]);

  const toggleItalic = useCallback(()=>{
      setTextBoxes(
          setItemById(selected, (textbox)=> textbox.toggleItalic())
      )
  },[selected, setTextBoxes])

  const onSelect = useCallback(
    (id: string) => (event: React.MouseEvent) => {
      event.stopPropagation();
      setSelected(id);
    },
    [setSelected]
  );

  const alignTextBox = useCallback((alignment: "center" | "left" | "right") => () =>{
    setTextBoxes(setItemById(selected, textbox => textbox.setAlignment(alignment)));
  },[setTextBoxes, selected])

  const setFontSize = useCallback((fontSize: number) => {
    setTextBoxes(setItemById(selected, item => item.setFontSize(fontSize)))
  }, [setTextBoxes, selected])

  const selectedTextBoxState = textBoxes.find( textbox => textbox.id === selected )?.state

  return (
    <Paper className={classes.Root}>
      <Toolbar
        className={classes.Toolbar}
        toggleUnderlined={toggleUnderlined}
        toggleItalic={toggleItalic}
        toggleBold={toggleBold}
        selected={Boolean(selected)}
        addTextBox={addNewTextBox}
        alignText={alignTextBox}
        selectedState={selectedTextBoxState}
        setFontSize={setFontSize}
      />
          <Paper className={classes.Editable} onClick={deselect("")}>
              <AppCroppable id={imageId} disabled={true} className={classes.Image} />
              {textBoxes.map((textbox) => (
                <TextBox
                  key={textbox.id}
                  html={textbox.content}
                  setHtml={setHtml(textbox.id)}
                  onSelect={onSelect(textbox.id)}
                  selected={selected === textbox.id}
                  handleDrag={handleDrag(textbox.id)}
                  position={textbox.position}
                  textStyle={textbox.style}
                />
              ))}
          </Paper>
      <Button className={classes.SaveButton} fullWidth variant="contained" color="primary">Save</Button>
    </Paper>
  );
}
