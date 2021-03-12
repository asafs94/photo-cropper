import React, { useCallback, useContext, useMemo, useRef, useState } from "react";
import "./App.css";
import SixSquares from "./components/Templates/SixSquares";
import A4 from "./components/Papers/A4";
import {
  Drawer,
  Fab,
  Theme,
  useMediaQuery,
  Typography,
} from "@material-ui/core";
import EditSection from "./components/EditSection";
import { ImageContext } from "./hoc/ImageProvider";
import useStyles from "./AppStyles";
import ZoomWrapper from "./components/ZoomWrapper";
import { useToggleable } from "./utils/hooks/togglables";
import { Menu } from "@material-ui/icons";
import ImageDropZone from "./hoc/ImageDropZone";
import TextWithLineBreaks from "./components/TextWithLinebreaks";
import { AppContextMenuContext } from "./hoc/AppContextMenu";
import { byId } from "./utils";
import { Position } from "./types";
import AppModal from "./containers/AppModal";
import { useDispatch, useStore } from "./utils/hooks";
import { ModalType } from "./types/enums";
import { UIDispatcher } from "./types/store/dispatchers/ui";


function App() {
  const paperRef = useRef<any>();
  const appRef = useRef<any>();
  const classes = useStyles();
  const imageCurrentSize = "85mm"
  const { settings } = useStore();
  const [drawerOpen, toggleDrawer] = useToggleable(false);
  const [headerNote, setHeaderNote] = useState("");
  const [footerNote, setFooterNote] = useState("");
  const { images, uploadFiles, onClear, setSingleImage, setImages } = useContext(ImageContext);
  const [dialogPayload, setDialogPayload] = useState<{ open: boolean, imageId?: string }>({ open: false });
  const [closeEditor, setCloseEditor] = useState< {resolve: Function} | null>(null);
  const openContextMenu = useContext(AppContextMenuContext); 
  const dispatch = useDispatch()
  const uiDispatcher =  useMemo( ()=> new UIDispatcher(dispatch),[dispatch]);
  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const openSettings = useCallback(()=>{
    uiDispatcher.openModal({ type: ModalType.Settings, payload: {} })
  },[uiDispatcher])

  const setImagesCropAndZoom = useCallback((crop: Position, zoom: number) => {
    setImages( images => {
      return images.map( image => {
        image.crop = crop;
        image.zoom = zoom;
        return image;
      } )
    } )
  },[setImages])

  const openImageContextMenu = (id: string) => async (event: React.MouseEvent) => {
    const image = images.find(byId(id));
    const value = await new Promise( (resolve, reject) => {
      openContextMenu({ 
        event, 
        promise: {resolve, reject}, 
        options: [
          { value: 'apply-to-all', text: 'Apply to All (Zoom and Crop)' }, 
          { value: 'edit', text: 'Edit' },
          { value: image?.locked? 'unlock' : 'lock', text: image?.locked? "Unlock" : "Lock"}
        ] })
    });
    onContextMenuClick({ imageId: id, value })
  }

  const onContextMenuClick = ({ imageId, value }: any) =>{
    const image = images.find(byId(imageId));
    switch (value){
      case "apply-to-all":{
        if(image){
          setImagesCropAndZoom(image?.crop, image.zoom);
        }
        break;
      }
      case "edit": {
        uiDispatcher
        .openModal({ type: ModalType.ImageEditor, payload: { imageId, imageSize: { width: imageCurrentSize, height: imageCurrentSize } } })
        break;
      }
      case "lock": {
        setSingleImage(imageId)(
          image => { 
            image.locked = true; 
            return image; 
        });
        break;
      }
      case "unlock": {
        setSingleImage(imageId)(
          image => {
            image.locked = false;
            return image;
          }
        )
        break;
      }
    }
  }

  const initEditorCloseRequest = () => {
    new Promise<any>( (resolve) => {
      setCloseEditor({ resolve });
    }).then(() => {
      setDialogPayload({ open: false });
    }).finally( ()=>{
      setCloseEditor(null);
    })
  }

  return (
    <ImageDropZone onDrop={uploadFiles}>
      <div className={classes.Root} ref={appRef}>
        <Fab
          className={classes.DrawerFab}
          size="small"
          color="primary"
          onClick={toggleDrawer}
        >
          <Menu />
        </Fab>
        <main className={classes.Main}>
          <ZoomWrapper zoomSpeed={settings.wheelSensitivity.viewer}>
            <A4 className={classes.PrintingPaper} rootRef={paperRef}>
              <Typography component="header" className={classes.Note}>
                <TextWithLineBreaks>{headerNote}</TextWithLineBreaks>
              </Typography>
              <SixSquares images={images} onImageContextMenu={openImageContextMenu}/>
              <Typography component="footer" className={classes.Note}>
                <TextWithLineBreaks>{footerNote}</TextWithLineBreaks>
              </Typography>
            </A4>
          </ZoomWrapper>
        </main>
        <AppModal />
        <Drawer
          className={classes.DrawerWrapper}
          onClose={toggleDrawer}
          open={drawerOpen}
          classes={{ paper: classes.Drawer }}
          variant={smallScreen ? "temporary" : "permanent"}
          anchor="right"
        >
          <EditSection
            onUpload={uploadFiles}
            loaded={!!images.length}
            onClear={onClear}
            amount={6}
            headerNote={headerNote}
            footerNote={footerNote}
            setHeaderNote={setHeaderNote}
            setFooterNote={setFooterNote}
            openSettings={openSettings}
          />
        </Drawer>
      </div>
    </ImageDropZone>
  );
}

export default App;
