

export const isImageFile = (file: File) => {
    return file && file['type'].split('/')[0] === 'image';
}

export const lineBreakCount = (str: string) => {
	return((str.match(/[^\n]*\n[^\n]*/gi)?.length || 0));
}