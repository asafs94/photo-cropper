import React, { useContext } from "react";
import AppImage from "../components/AppImage/AppImage";
import { useEditableImage } from "../utils/hooks/single-image";
import { AlertContext } from '../hoc/AppAlerts';
import { useStore } from "../utils/hooks";

export default function AppImageContainer({
  id,
  className,
  cropDisabled,
  onContextMenu
}: any) {
  const { image, setCrop: setPosition, setZoom, lock, unlock } = useEditableImage(id); 
  const { settings } = useStore();
  const setAlert = useContext(AlertContext)
  if (!image) {
    return null;
  }

  const { zoom, crop, url, textboxes, locked } = image;

  const handleClick = (event: React.MouseEvent) => {
   if(locked){
    setAlert({ message: `Image is locked. Right click to unlock.`, autoHideDuration: 4000  })
   }
  }

  return (
        <AppImage
          crop={crop}
          zoom={zoom}
          setCrop={setPosition}
          setZoom={setZoom}
          textboxes={textboxes}
          cropDisabled={locked || cropDisabled}
          className={className}
          src={url}
          onContextMenu={onContextMenu}
          onClick={handleClick}
          locked={locked}
          zoomSensitivity={settings.wheelSensitivity.cropper}
        />
  );
}
