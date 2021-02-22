import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { useCallback, useEffect, useState } from "react";



interface StyleDescriptor {
    "bold": boolean,
    "fontFamily": string,
    "fontSize": string | number,
    "italic": boolean,
    "underlined": boolean,
}
 type Property = {
     propName: "fontWeight" | "textDecoration" | "fontSize" | "fontStyle" | "fontFamily"
 }

 type BooleanProperty = Property & {
     on: any,
     off: any
 }

 type PropertyName = "bold" | "italic" | "underlined" | "fontFamily" | "fontSize"

const properties : { [key in PropertyName]: Property | BooleanProperty } = {
    bold: {
        propName: "fontWeight",
        on: "600",
        off: "400",
    },
    underlined: {
        propName: "textDecoration",
        on: "underline",
        off: "unset"
    },
    italic: {
        propName: "fontStyle",
        on: "italic",
        off: "unset"
    },
    fontFamily: {
        propName: "fontFamily",
    },
    fontSize: {
        propName: "fontSize",
    }
}

const useTextStyle = (initialStyle: StyleDescriptor = { bold: false, fontFamily: "initial", fontSize: "initial", italic: false, underlined: false }) => {
    const [styleDescriptor, setStyleDescriptor] = useState<StyleDescriptor>(initialStyle);
    const [style, setStyle] = useState<CSSProperties>({});

    const adjustStyles = useCallback(() => {
        setStyle( _style => {
            const styleObject: CSSProperties = { ..._style };
            Object.keys(styleDescriptor).forEach( key => {
                const _key = key as PropertyName;
                const property: Property | BooleanProperty = properties[_key];
                if( (property as BooleanProperty).on ){
                    const { on, off, propName } = property as BooleanProperty
                    styleObject[propName] = styleDescriptor[_key] ? on : off;
                } else {
                    (styleObject[property.propName] as any) = styleDescriptor[_key];
                }
            })
            return styleObject;
        } )
        
      },[setStyle, styleDescriptor])

    useEffect(()=>{
        adjustStyles();
    },[styleDescriptor, adjustStyles]);

    const setProperty = useCallback((propertyName: PropertyName, value?: any)=>()=>{
        if(typeof value !== "undefined"){
            setStyleDescriptor( _s => ({ ..._s, [propertyName]: value }));
        } else {
            setStyleDescriptor( _s => ({ ..._s, [propertyName]: !_s[propertyName] }) );
        }
    },[setStyleDescriptor])

    return { style, styleDescriptor, setProperty }
}



export default useTextStyle;