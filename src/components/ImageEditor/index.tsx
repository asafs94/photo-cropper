import { Button, Paper } from "@material-ui/core";
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

export default function ImageEditor({ imageId, imageSize }: any) {
  const classes = useStyles({ imageSize });
  const [selected, setSelected] = useState<string>();
  const { image, setCrop, setZoom } = useEditableImage(imageId);
  const { setTextboxes, submitTextboxes, textboxes } = useImageTextboxes(
    imageId
  );

  const dragParentRef = useRef();

  const onSave = useCallback(() => {
    submitTextboxes();
  }, [submitTextboxes]);

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

  const toggleBold = useCallback(() => {
    setTextboxes(
      setItemById(selected, (textbox) => {
        textbox.toggleBold();
        return textbox;
      })
    );
  }, [selected, setTextboxes]);

  const toggleUnderlined = useCallback(() => {
    setTextboxes(
      setItemById(selected, (textbox) => {
        textbox.toggleUnderlined();
        return textbox;
      })
    );
  }, [selected, setTextboxes]);

  const toggleItalic = useCallback(() => {
    setTextboxes(
      setItemById(selected, (textbox) => {
        textbox.toggleItalic();
        return textbox;
      })
    );
  }, [selected, setTextboxes]);

  const onSelect = useCallback(
    (id: string) => (event: React.MouseEvent) => {
      event.stopPropagation();
      setSelected(id);
    },
    [setSelected]
  );

  const alignTextBox = useCallback(
    (alignment: "center" | "left" | "right") => () => {
      setTextboxes(
        setItemById(selected, (textbox) => {
          textbox.setAlignment(alignment);
          return textbox;
        })
      );
    },
    [setTextboxes, selected]
  );

  const setFontSize = useCallback(
    (fontSize: number) => {
      setTextboxes(
        setItemById(selected, (item) => {
          item.setFontSize(fontSize);
          return item;
        })
      );
    },
    [setTextboxes, selected]
  );

  const selectedTextBoxState = textboxes.find(
    (textbox) => textbox.id === selected
  )?.state;

  if(!image){
    return null;
  }

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
    </Paper>
  );
}
