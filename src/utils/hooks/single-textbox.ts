import { Dispatch, SetStateAction, useCallback } from "react";
import { RGBColor } from "react-color";
import { useSingle } from ".";
import { capitalize } from "..";
import { HorizontalAlignment, TextStyle } from "../../types";
import TextBox from "../../types/TextBox";



const useSingleTextbox = (id: string | undefined, textboxes: TextBox[], setTextBoxes: Dispatch<SetStateAction<TextBox[]>>) => {
    const [ textbox, setTextbox ] = useSingle(id, textboxes, setTextBoxes);

    const setContent = useCallback(( content: string )=>{
        setTextbox( _textbox => {
            _textbox.content = content;
            return _textbox;
        });
    },[setTextbox]);

    const toggleStyle = useCallback((styleType: TextStyle)=>{
        const toggleFunction = `toggle${capitalize(styleType)}` as "toggleBold" | "toggleItalic" | "toggleUnderlined";
        setTextbox( _textbox => {
            _textbox[toggleFunction]();
            return _textbox;
        })
    },[setTextbox]);

    const setFontSize = useCallback((fontSize: number)=>{
        setTextbox( _textbox => {
            _textbox.setFontSize(fontSize);
            return _textbox;
        } )
    },[setTextbox]);

    const setFontFamily = useCallback((fontFamily: string)=>{
        setTextbox( _textbox => {
            _textbox.setFontFamily(fontFamily);
            return _textbox;
        } )
    },[setTextbox])

    const setColor = useCallback(( color: RGBColor )=>{
        setTextbox( _textbox => {
            _textbox.setColor(color);
            return _textbox;
        } )
    },[setTextbox]);

    const setAlignment = useCallback(( alignment: HorizontalAlignment )=>{
        setTextbox( _textbox => {
            _textbox.setAlignment(alignment);
            return _textbox;
        })
    },[setTextbox])

    return { textbox, setContent, setFontFamily, setFontSize, toggleStyle, setColor, setAlignment };
}


export default useSingleTextbox;