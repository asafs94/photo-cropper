import React, { useContext, useRef, useState } from "react";
import "./App.css";
import SixSquares from "./components/Templates/SixSquares";
import A4 from "./components/Papers/A4";
import {
  Drawer,
  Fab,
  Theme,
  useMediaQuery,
  Typography,
  Dialog,
} from "@material-ui/core";
import EditSection from "./components/EditSection";
import { ImageContext } from "./hoc/ImageProvider";
import useStyles from "./AppStyles";
import ZoomWrapper from "./components/ZoomWrapper";
import { useToggleable } from "./utils/hooks/togglables";
import { Menu } from "@material-ui/icons";
import ImageDropZone from "./hoc/ImageDropZone";
import TextWithLineBreaks from "./components/TextWithLinebreaks";
import ImageEditor from "./components/ImageEditor";
import { AppContextMenuContext } from "./hoc/AppContextMenu";
import { byId } from "./utils";


function App() {
  const paperRef = useRef<any>();
  const appRef = useRef<any>();
  const classes = useStyles();
  const imageCurrentSize = "85mm"
  const [drawerOpen, toggleDrawer] = useToggleable(false);
  const [headerNote, setHeaderNote] = useState("");
  const [footerNote, setFooterNote] = useState("");
  const { images, uploadFiles, onClear, setSingleImage } = useContext(ImageContext);
  const [dialogPayload, setDialogPayload] = useState<{ open: boolean, imageId?: string }>({ open: false });
  const openContextMenu = useContext(AppContextMenuContext); 
  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const openImageContextMenu = (id: string) => async (event: React.MouseEvent) => {
    const image = images.find(byId(id));
    const value = await new Promise( (resolve, reject) => {
      openContextMenu({ 
        event, 
        promise: {resolve, reject}, 
        options: [
          { value: 'apply-to-all', text: 'Apply to All', disabled: true }, 
          { value: 'edit', text: 'Edit' },
          { value: image?.locked? 'unlock' : 'lock', text: image?.locked? "Unlock" : "Lock"}
        ] })
    });
    onContextMenuClick({ imageId: id, value })
  }

  const onContextMenuClick = ({ imageId, value }: any) =>{
    switch (value){
      case "edit": {
        setDialogPayload({ open: true, imageId });
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
          <ZoomWrapper>
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
        <Dialog open={dialogPayload.open} onClose={()=>setDialogPayload({ open: false })} >
          <ImageEditor imageId={dialogPayload.imageId} imageSize={{ height: imageCurrentSize, width: imageCurrentSize }} onClose={()=>setDialogPayload({ open: false })} />
        </Dialog>
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
          />
        </Drawer>
      </div>
    </ImageDropZone>
  );
}

export default App;
