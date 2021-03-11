import React from "react";
import TextBox from ".";
import TextBoxObject from "../../../types/TextBox";

interface Props {
    textbox: TextBoxObject,
    parent?: HTMLElement 
}

export default function DisplayText({ textbox, parent } : Props) {
  return (
    <TextBox
      html={textbox.content}
      position={textbox.position}
      textStyle={textbox.style}
      displayMode={true}
      parentElement={parent}
    />
  );
}
