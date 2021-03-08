import googleFonts from './../googlefonts.json';
import axios from 'axios';
import GoogleFont from '../types/GoogleFont';
import webFontLoader from 'webfontloader';

export const fetchGoogleFonts = async (sort: string = "popularity") => {
    const response = await axios.get("https://www.googleapis.com/webfonts/v1/webfonts?key="+googleFonts.apiKey+"&sort="+sort);
    return response.data.items;
}


export const loadFonts = (fonts: GoogleFont[]) => {
    return new Promise<void>((resolve, reject)=>{
        webFontLoader.load({ 
            google: { 
                families: fonts.map(font => font.family),
            }, 
            active: resolve,
            inactive: reject
    }) 
 })
}