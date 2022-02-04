import { Reducer, useEffect, useReducer } from "react";
import { SettingsActions } from "../../types/store/actions";
import { SettingsDispatchAction } from "../../types/store/dispatch";
import { SettingsState } from "../../types/store/reducers";
import initialSettingsState from "./initialState";

const reducer: Reducer<SettingsState, SettingsDispatchAction> = (state, action) => {
    switch(action.type){
        case SettingsActions.setWheelSensitivity:{
            return {
                ...state,
                wheelSensitivity: {
                    ...state.wheelSensitivity,
                    ...action.payload.wheelSensitivity,
                }
            }
        }
        default:
            return state;
    }
} 

const fetchSettingsFromLS = (initial: SettingsState) => {
    const stringifiedLsSettings = localStorage.getItem('settings');
    const lsSettings = stringifiedLsSettings? JSON.parse(stringifiedLsSettings) : null;
    if(lsSettings){
        return lsSettings;
    } else {
        return initial;
    }
}

const useSettingsReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialSettingsState, fetchSettingsFromLS)

    useEffect(()=>{
        //Whenever state changes -> save to LS
        if(state){
            localStorage.setItem("settings", JSON.stringify(state));
        }
    }, [state])

    return [state, dispatch] as const;
}

export default useSettingsReducer