import { useTheme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import Select, { components, OptionProps } from "react-select";

const Option : React.FunctionComponent<OptionProps<{
  label: string;
  value: string;
}, false, {
  label: string;
  options: any;
  value: string | null;
}> & { exampleText?: { value: string, style?: CSSProperties } }> = ({ children, exampleText, ...props }) => {

  let style = {};
  if(exampleText?.style){
    style = { ...exampleText.style };
  }
  style = { ...style, textAlign: "right", opacity: 0.8, fontFamily: props.label, fontSize: 30 }

  return (    
      <components.Option {...props}>
        <div>
          {children}
        </div>
        {exampleText && <div style={{ ...style }}>
          {exampleText.value}
        </div>}
      </components.Option>
  );
};

interface Props {
  selectedFont: string;
  fontsByLanguage: Map<string, string[]>;
  className?: string;
  disabled?: boolean;
  onChange?: (fontFamily: string) => void;
  exampleText?: { value: string, style?: CSSProperties };
}

interface Option {
    label: string,
    options?: Option[],
    value: string | null,
}

export default function FontSelect({
  selectedFont,
  fontsByLanguage,
  onChange,
  className,
  disabled = false,
  exampleText
}: Props) {

    const appTheme = useTheme()
    const it = fontsByLanguage.keys();
    let options: {label: string, options: any, value: string | null}[] = [], next = it.next();
    while(!next.done){
        options.push({ label: next.value, value: null, options: fontsByLanguage.get(next.value)?.map( fontFamily => ({ label: fontFamily, value: fontFamily }) ) })
        next = it.next();
    }

    const handleChange = (option: Option | null) => {
        const passedFont: string = option?.value || "Roboto";
        if(onChange){
            onChange(passedFont)
        };
    }

  return (
    <>
      <Select
        isDisabled={disabled}
        options={options}
        value={{ label: selectedFont, value: selectedFont }}
        className={className}
        onChange={handleChange}
        isClearable={false}
        components={{ Option: (props) => <Option {...props} exampleText={exampleText} /> }}
        theme={(theme)=>({
            ...theme,
            colors:{
                ...theme.colors,
                primary: appTheme.palette.primary.main,
                primary25: appTheme.palette.primary.light,
                primary75: appTheme.palette.primary.dark
            }
        })}
        styles={{
          option: (base, option) => ({
            ...base,
            fontFamily: option.data.value,
          }),
        }}
      />
    </>
  );
}
