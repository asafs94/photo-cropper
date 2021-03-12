import { Modal } from "../../Modal";
import { UIActions } from "../actions";
import Dispatcher from "../dispatcher";
import {UIState } from "../reducers";


export class UIDispatcher extends Dispatcher<UIState,UIActions> {
    
    openModal(payload: Modal){
        return this.dispatch({ type: UIActions.openModal, payload: { modal: payload } });
    }

    closeModal(){
        return this.dispatch({ type: UIActions.closeModal, payload: {} });
    }
}


