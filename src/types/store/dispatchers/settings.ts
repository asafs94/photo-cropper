import { SettingsState } from "../reducers";
import Dispatcher from "../dispatcher";
import { SettingsActions } from "../actions";

export default class SettingsDispatcher extends Dispatcher<
  SettingsState,
  SettingsActions
> {
  setWheelSensitivity(place: "cropper" | "viewer", value: number) {
    this.dispatch({ type: SettingsActions.setWheelSensitivity, payload: { wheelSensitivity: {
        [place]: value,
    } } }) ;
  }
}
