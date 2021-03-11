import { Snackbar } from '@material-ui/core';
import React, { useState } from 'react';


interface Props {
    children: React.ReactNode
}

type Alert = {
    message: string,
    autoHideDuration?: number | null,
}

export const AlertContext = React.createContext<(alert:Alert) => void>(()=>{})

export default function AppAlertProvider({children}: Props) {
    
    const [alert, setAlert] = useState<Alert>();
    const autoHideDuration = typeof alert?.autoHideDuration === "undefined"? 1000 : alert?.autoHideDuration;

    return (
        <AlertContext.Provider value={setAlert}>
            {children}
            <Snackbar autoHideDuration={autoHideDuration} message={alert?.message || ''} open={Boolean(alert)} onClose={()=>setAlert(undefined)} />
        </AlertContext.Provider>
    )
}
