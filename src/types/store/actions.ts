
export enum SettingsActions {
    setWheelSensitivity="setWheelSensitivity",
} 

export enum UIActions {
    openModal="openModal",
    closeModal="closeModal"
}


export interface Action<State,ActionType> {
    type: ActionType
}
