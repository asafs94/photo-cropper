import { Button, Typography } from '@material-ui/core'

import React, { useCallback, useRef, useState } from 'react'

export default function ImageUpload({onUpload}: any) {

    const inputRef = useRef<any>();
    const [files, setFiles] = useState<Array<any>>([]);

    const handleClick = useCallback(()=>{
        inputRef.current.click();
    },[])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>)=>{
        const _files = Array.from((event.target.files as FileList));
        _files.forEach( file => {
            (file as any).url = URL.createObjectURL(file);
        })
        if(_files.length){
            setFiles(_files);
        }
    },[setFiles]);

    const upload = ()=>{
        onUpload(files)
    }

    return (
        <div>
          <Button onClick={handleClick}>Upload Images</Button>
          <Typography>
              {files.length} files chosen
          </Typography>
          {files.map( file => <div key={file.url} style={{ border: '1px solid gray', display:'inline-block', margin: 2, width: 75, height: 75, backgroundImage: `url(${file.url})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              </div>)}
            {files.length && <Button onClick={upload} >Use Images</Button>}
            <input style={{ display: 'none' }} ref={inputRef} type='file' multiple name='image-upload' accept="image/*" onChange={handleChange} ></input>  
        </div>
    )
}
