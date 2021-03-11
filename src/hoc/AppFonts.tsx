import React, { useEffect, useState } from 'react'
import GoogleFont from '../types/GoogleFont';
import { removeDuplicates } from '../utils';
import { fetchGoogleFonts, loadFonts } from '../utils/fonts';
import { localeCodeToEnglish } from '../utils/locales';

interface Props {
    children: React.ReactElement
}

interface AppFontsContextValue {
    fonts: GoogleFont[],
    languages: string[],
    fontsByLanguage: Map<string, string[]>,
}

export const AppFontsContext = React.createContext<AppFontsContextValue>({ fonts: [], languages: [], fontsByLanguage: new Map<string, string[]>() })

export default function AppFonts({ children }: Props) {

    const [fonts, setFonts] = useState<GoogleFont[]>([]);
    const [languages, setLanguanges] = useState<string[]>([])
    const [fontsByLanguage, setFontsByLanguage] = useState<Map<string, string[]>>(new Map<string, string[]>());

    useEffect(()=>{
        let _languages = navigator.languages.map(localeCodeToEnglish);    //get all navigator locales
        _languages.push('hebrew')                                         //force add "hebrew" - by demand of client.
        _languages = removeDuplicates(_languages);                        //remove duplicates
        _languages = _languages.filter(l => l !== "english");             //remove english (its default in google fonts)
        setLanguanges(_languages);           
        fetchGoogleFonts("popularity")
        .then( (fonts: GoogleFont[]) => {
            const englishFonts = fonts.slice(0,20);                     //Get 20 most popular english fonts
            const otherFonts = fonts.slice(20).filter( font => font.subsets.some( subset => _languages.includes(subset) ) );
            const mergedFonts = [...otherFonts, ...englishFonts];
            setFonts(mergedFonts);
            loadFonts(mergedFonts);
        })
    },[]);

    useEffect(()=>{
        const _fontsBylanguage = new Map<string, string[]>();
        const nonEnglish: string[] = [];
        languages.forEach( language => {
            const arrayOfFonts = fonts.filter( font => font.subsets.includes(language) ).map( font => font.family );
            _fontsBylanguage.set(language, arrayOfFonts);
            nonEnglish.push(...arrayOfFonts);
        })
        _fontsBylanguage.set("english", fonts.map(f=> f.family).filter(f => !nonEnglish.includes(f) ) );
        setFontsByLanguage(_fontsBylanguage);
    },[fonts, languages, setFontsByLanguage])


    return <AppFontsContext.Provider value={{ fonts, languages, fontsByLanguage }} >{children}</AppFontsContext.Provider>
}
