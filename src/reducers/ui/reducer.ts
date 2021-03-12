import { Reducer, useReducer } from "react";
import { UIActions } from "../../types/store/actions";
import { UIDispatchAction } from "../../types/store/dispatch";
import { UIState } from "../../types/store/reducers";


const reducer: Reducer<UIState, UIDispatchAction> = (state, action) => {
    switch(action.type){
        case UIActions.openModal:{
            return {
                ...state,
                modal: action.payload.modal,
            }
        }
        case UIActions.closeModal:{
            return {
                ...state,
                modal: undefined,
            }
        }
        default:
            return state;
    }
};



export default function useUIReducer(){
    return useReducer(reducer, { modal: undefined, drawer: false })
}