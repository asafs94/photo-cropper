import { Button, ButtonGroup, Paper, Typography } from "@material-ui/core";

import React, { useCallback, useEffect, useState } from "react";
import { DraggableEventHandler } from "react-draggable";
import { v4 } from "uuid";
import AppCroppable from "../../containers/AppCroppable";
import useStyles from "./styles";
import TextBox from "./TextBox";
import Toolbar from "./Toolbar";

export default function ImageEditor({ imageId }: any) {
  const classes = useStyles({});
  const [selected, setSelected] = useState<string>();
  const [textBoxes, setTextBoxes] = useState<Array<any>>([]);

  const setHtml = useCallback(
    (key: string) => (newHtml: string) => {
      setTextBoxes((_tb) => {
        const tb = _tb.map((textbox) => {
          if (textbox.key === key) {
            textbox.html = newHtml;
          }
          return textbox;
        });
        return tb;
      });
    },
    [setTextBoxes]
  );

  const deselect = useCallback(
    (key: string) => () => {
      setSelected((_selected) => (_selected === key ? "" : _selected));
    },
    [setSelected]
  );

  const getOnlyUsedTextBoxes = useCallback(
    (selectedKey: string | undefined) => (allTextboxes: any[]) => {
      return allTextboxes.filter(
        (textbox) => textbox.html || textbox.key === selectedKey
      );
    },
    []
  );

  useEffect(() => {
    setTextBoxes(getOnlyUsedTextBoxes(selected));
  }, [selected, setTextBoxes, getOnlyUsedTextBoxes]);

  const addNewTextBox = useCallback(() => {
    const key = v4();
    setSelected(key);
    setTextBoxes((_tb) => {
      return [
        ..._tb,
        {
          key,
          html: "",
          position: { x: 0, y: -250 },
        },
      ];
    });
  }, [setSelected, setTextBoxes]);

  const handleDrag: (key: string) => DraggableEventHandler = useCallback(
    (key: string) => (event, data) => {
      setTextBoxes((_tb) => {
        const tb = _tb.map((textbox) => {
          if (textbox.key === key) {
            textbox.position = data;
          }
          return textbox;
        });
        return tb;
      });
    },
    [setTextBoxes]
  );

  return (
    <Paper className={classes.Root}>
      <Toolbar className={classes.Toolbar} addTextBox={addNewTextBox} />
      <Paper className={classes.Editable}>
        <AppCroppable id={imageId} disabled={true} className={classes.Image} />
        {textBoxes.map((textbox) => (
          <TextBox
            key={textbox.key}
            html={textbox.html}
            setHtml={setHtml(textbox.key)}
            onSelect={() => setSelected(textbox.key)}
            selected={selected === textbox.key}
            onDeselect={deselect(textbox.key)}
            handleDrag={handleDrag(textbox.key)}
            position={textbox.position}
          />
        ))}
      </Paper>
      <Paper></Paper>
    </Paper>
  );
}
