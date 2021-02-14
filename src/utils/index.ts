


export const isImageFile = (file: File) => {
    return file && file['type'].split('/')[0] === 'image';
}