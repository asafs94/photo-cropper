import { Action, SettingsActions, UIActions } from "./actions";
import { SettingsState, UIState } from "./reducers";
import { RecursivePartial } from '../index';

export interface DispatchAction<State,ActionType> extends Action<State,ActionType> {
    payload: RecursivePartial<State>;
}


export interface UIDispatchAction extends DispatchAction<UIState, UIActions> {

}

export interface SettingsDispatchAction extends DispatchAction<SettingsState, SettingsActions> {
    
}

export type RootDispatch = UIDispatchAction | SettingsDispatchAction;