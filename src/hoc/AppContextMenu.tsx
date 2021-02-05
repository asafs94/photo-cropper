import { Menu, MenuItem } from '@material-ui/core'
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { Position } from '../types';

export const AppContextMenuContext = createContext<(payload: ContextMenuPayload) => void>(()=>{})

interface Option {
    value: string,text: string, onSelect?: any
}

interface ContextMenuPayload {
    options: Array<Option>,
    event: React.MouseEvent | MouseEvent,
}

export default function AppContextMenu({children}: any) {
    const [options, setOptions] = useState<Array<Option>>([]);
    const [position, setPosition] = useState<Position | null>(null);
    const openContextMenu = (payload: ContextMenuPayload) =>{
        payload.event.preventDefault();
        setPosition({x: payload.event.clientX, y: payload.event.clientY});
        setOptions(payload.options)
    }
    
    const closeContextMenu = useCallback(
        () => {
            setPosition(null)
        },
        [setPosition],
    )

    const handleClick = (option: Option) => () =>{
        option.onSelect && option.onSelect();
        closeContextMenu();
    }

    useEffect(()=>{
        const prevent = (event: MouseEvent) => {
            event.preventDefault();
        }
        if(position){
            document.addEventListener('contextmenu',prevent, false)
        } 
        return () => {
            if(position){
                document.removeEventListener('contextmenu',prevent, false)
            }      
        }
    },[position])

    return (
        <AppContextMenuContext.Provider value={openContextMenu}>
          {children} 
          <Menu 
            keepMounted
            open={Boolean(position)}
            onClose={closeContextMenu}
            anchorReference="anchorPosition"
            anchorPosition={position? { top: position.y, left: position.x } : undefined} 
          >
              {options.map(option => <MenuItem key={option.value} onClick={handleClick(option)}>{option.text}</MenuItem>)}
        </Menu> 
        </AppContextMenuContext.Provider>
    )
}
