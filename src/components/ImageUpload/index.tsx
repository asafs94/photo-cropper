import React, { useCallback, useRef } from 'react'

export default function ImageUpload({children, onUpload}: any) {

    const inputRef = useRef<any>();

    const handleClick = useCallback(()=>{
        inputRef.current.click();
    },[])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>)=>{
        const _files = Array.from((event.target.files as FileList));
        _files.forEach( file => {
            (file as any).url = URL.createObjectURL(file);
        })
        if(_files.length){
            onUpload(_files);
        }
    },[onUpload]);

    return (
        <>
        <span>
            {children(handleClick)}
        </span>
        <input style={{ display: 'none' }} ref={inputRef} type='file' multiple name='image-upload' accept="image/*" onChange={handleChange} ></input>  
        </>
    )
}
