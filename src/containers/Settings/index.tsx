import { Slider, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Control from "@material-ui/icons/Games";
import useStyles from "./styles";
import TabPanel from "./components/TabPanel";
import { useDispatch, useStore } from "../../utils/hooks";
import SettingsDispatcher from "../../types/store/dispatchers/settings";



export default function Settings({ defaultTab = "control", closeRequest }: any) {
  const [tab, setTab] = useState<string>(defaultTab);
  const { settings } = useStore();
  const dispatch = useDispatch();
  const settingsDispatcher = useMemo( () => new SettingsDispatcher(dispatch) ,[dispatch]);
  const classes = useStyles();
  const onTabChange = useCallback(
    (event: React.ChangeEvent<{}>, value: string) => {
      setTab(value);
    },
    [setTab]
  );

  useEffect(()=>{
    if(closeRequest){
      closeRequest.resolve();
    }
  },[closeRequest])

  const setProperty = useCallback((propertyName: string)=>(event: React.ChangeEvent<{}>, value: any)=>{
    switch (propertyName){
        case "viewerWheelSensitivity":{
            settingsDispatcher.setWheelSensitivity("viewer", value as number);
            break;
        }
        case "cropperWheelSensitivity":{
            settingsDispatcher.setWheelSensitivity("cropper", value as number);
            break;
        }
    }
  },[settingsDispatcher])

  return (
    <div className={classes.Root}>
      <Tabs
        value={tab}
        onChange={onTabChange}
        orientation="vertical"
        variant="scrollable"
        className={classes.Tabs}
      >
        <Tab value="control" icon={<Control />} label="Control" />
      </Tabs>
      <TabPanel value="control" currentValue={tab}>
        <div>
            <Typography variant="h5" gutterBottom >Wheel Sensitivity</Typography>
            <Typography noWrap >Viewer</Typography>
            <Slider marks={[0.05,0.5,1,1.5,2].map(num => ({ value: num, label: `${num*100}%` }))} min={0.05} max={2} step={0.05} onChange={setProperty("viewerWheelSensitivity")} value={settings.wheelSensitivity.viewer} />
            <Typography  noWrap >Cropper</Typography>
            <Slider marks={[0.05,0.5,1,1.5,2].map(num => ({ value: num, label: `${num*100}%` }))} min={0.05} max={2} step={0.05} onChange={setProperty("cropperWheelSensitivity")} value={settings.wheelSensitivity.cropper} />
        </div>
      </TabPanel>
    </div>
  );
}
