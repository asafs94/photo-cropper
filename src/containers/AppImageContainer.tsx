import React from "react";
import AppImage from "../components/AppImage/AppImage";
import { useEditableImage } from "../utils/hooks/single-image";

export default function AppImageContainer({
  id,
  className,
  cropDisabled,
  onContextMenu,
}: any) {
  const { image, setCrop: setPosition, setZoom } = useEditableImage(id); 

  if (!image) {
    return null;
  }

  const { zoom, crop, url, textboxes } = image;

  return (
    <AppImage
      crop={crop}
      zoom={zoom}
      setCrop={setPosition}
      setZoom={setZoom}
      textboxes={textboxes}
      cropDisabled={cropDisabled}
      className={className}
      src={url}
      onContextMenu={onContextMenu}
    />
  );
}
