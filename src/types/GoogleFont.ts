type GoogleFont = {
    kind: string,
    family: string,
    variants: string[],
    subsets: string[],
    version: string,
    lastModified: string,
    files: {
        [key:string]: string
    }
}

export default GoogleFont;