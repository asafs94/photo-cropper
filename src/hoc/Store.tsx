import React, { Dispatch } from "react";
import initialSettingsState from "../reducers/settings/initialState";
import useSettingsReducer from "../reducers/settings/reducer";
import useUIReducer from "../reducers/ui/reducer";
import { RootState } from "../types/store/reducers";
import { RootDispatch } from "../types/store/dispatch";

const initialState: RootState = {
  settings: initialSettingsState,
  ui: { drawer: false },
};

export const DispatchContext = React.createContext<Dispatch<RootDispatch>>(
  (action) => {}
);
export const StateContext = React.createContext<RootState>(initialState);

interface Props {
  children: React.ReactNode;
}

const combineDispatch = (...dispatches: Dispatch<any>[]) => (
  action: RootDispatch
) => {
  dispatches.forEach((dispatch) => dispatch(action));
};

export default function Store({ children }: Props) {
  const [settings, settingsDispatch] = useSettingsReducer();
  const [ui, uiDispatch] = useUIReducer();

  const combinedDispatch = React.useCallback(
    combineDispatch(settingsDispatch, uiDispatch),
    [settingsDispatch, uiDispatch]
  );
  const combinedState = React.useMemo(() => ({ settings, ui }), [settings, ui]);

  return (
    <DispatchContext.Provider value={combinedDispatch}>
      <StateContext.Provider value={combinedState}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}
