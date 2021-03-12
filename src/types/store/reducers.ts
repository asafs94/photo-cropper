import { Modal } from "../Modal";

export interface UIState {
    modal?: Modal,
    drawer: boolean,
}

export interface SettingsState {
    wheelSensitivity:{
        cropper: number,
        viewer: number
    }
}


export interface RootState {
    settings: SettingsState,
    ui: UIState
}