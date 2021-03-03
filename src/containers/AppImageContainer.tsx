import React from "react";
import AppImage from "../components/AppImage/AppImage";
import { useEditableImage } from "../utils/hooks/single-image";

export default function AppImageContainer({
  id,
  className,
  cropDisabled,
  onContextMenu,
}: any) {
  const { image, setPosition, setZoom } = useEditableImage(id); 

  if (!image) {
    return null;
  }

  const { zoom, position, url, textboxes } = image;

  return (
    <AppImage
      crop={position}
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
