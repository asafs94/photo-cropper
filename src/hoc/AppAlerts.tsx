import { Snackbar } from '@material-ui/core';
import React, { useState } from 'react';


interface Props {
    children: React.ReactNode
}

type Alert = {
    message: string,
    autoHideDuration?: number,
}

export const AlertContext = React.createContext<(alert:Alert) => void>(()=>{})

export default function AppAlertProvider({children}: Props) {
    
    const [alert, setAlert] = useState<Alert>();
    
    return (
        <AlertContext.Provider value={setAlert}>
            {children}
            <Snackbar autoHideDuration={alert?.autoHideDuration || 1000} message={alert?.message || ''} open={Boolean(alert)} onClose={()=>setAlert(undefined)} />
        </AlertContext.Provider>
    )
}
