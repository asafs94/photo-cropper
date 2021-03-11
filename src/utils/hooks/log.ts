import { useCallback, useState } from "react"



export const useLog = () => {
    const [logs, setLogs] = useState<string[]>([]);

    const log = useCallback((log: string)=>{
        setLogs( _logs => {
            _logs.push(log);
            return _logs;
        } )
    },[setLogs]);
    
    const clearLogs = useCallback(()=>{
        setLogs([]);
    },[setLogs])

    return [logs, log, clearLogs] as const
}