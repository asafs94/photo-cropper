import React from "react";
import TextBox from ".";
import TextBoxObject from "../../../types/TextBox";

interface Props {
    textbox: TextBoxObject
}

export default function DisplayText({ textbox } : Props) {
  return (
    <TextBox
      html={textbox.content}
      position={textbox.position}
      textStyle={textbox.style}
    />
  );
}
