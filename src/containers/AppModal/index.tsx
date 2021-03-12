import { IconButton, Typography } from '@material-ui/core';
import { Close, Settings as SettingsIcon } from '@material-ui/icons';
import React, { useCallback, useMemo, useState } from 'react'
import ImageEditor from '../../components/ImageEditor';
import ResponsiveModal from '../../components/ResponsiveModal'
import { Request } from '../../types';
import { ModalType } from '../../types/enums';
import { UIDispatcher } from '../../types/store/dispatchers/ui';
import { useDispatch, useStore } from '../../utils/hooks';
import Settings from '../Settings';
import useStyles from './styles';



export default function AppModals() {
    
    const { ui: { modal } } = useStore();
    const dispatch = useDispatch();
    const uiDispatcher = useMemo(()=>new UIDispatcher(dispatch), [dispatch]);
    const classes = useStyles()
    const [closeRequest, setCloseRequest] = useState<Request<void> | null>(null);
    let children: React.ReactNode;
    let modalName: React.ReactNode;
    let ModalIcon: any | null;

    const onClose = useCallback(()=>{
        if(uiDispatcher){
            uiDispatcher.closeModal()
        }
    },[uiDispatcher])

    const initiateCloseRequest = useCallback( async ()=>{
        try{
            await new Promise<void>( (resolve, reject) => {
                setCloseRequest({resolve, reject})
            })
            onClose()
        } catch (error) {
            console.error(error)
        } finally {
            setCloseRequest(null);
        }
        
    },[setCloseRequest,onClose])

    
    switch (modal?.type){
        case ModalType.ImageEditor:{
            modalName = 'Editor';
            ModalIcon = null
            children = <ImageEditor {...modal.payload} onClose={onClose} closeRequest={closeRequest} />
            break;
        }
        case ModalType.Settings:{
            modalName = "Settings";
            ModalIcon = SettingsIcon
            children = <Settings closeRequest={closeRequest} />
            break;
        }
        default: {
            modalName='';
            ModalIcon=null;
            children = null;
        }
    }

    
    return (
        <ResponsiveModal open={Boolean(modal)} >
            <div className={classes.Header} >
                {ModalIcon && <ModalIcon  ></ModalIcon>}
                <Typography variant="button" className={classes.ModalName} >{modalName}</Typography>
                <IconButton size="small" className={classes.CloseButton} onClick={initiateCloseRequest} >
                    <Close />
                </IconButton>
            </div>
            {children}
        </ResponsiveModal>
    )
}
