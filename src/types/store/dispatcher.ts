import { Dispatch } from "react";
import { DispatchAction } from "./dispatch";

export default class Dispatcher<State, ActionType> {

    protected readonly dispatch: Dispatch<DispatchAction<State, ActionType>>;

    constructor( dispatch: Dispatch<DispatchAction<State, ActionType>> ){
        this.dispatch = dispatch;
    }

}