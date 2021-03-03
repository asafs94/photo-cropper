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


function App() {
  const paperRef = useRef<any>();
  const appRef = useRef<any>();
  const classes = useStyles();
  const [drawerOpen, toggleDrawer] = useToggleable(false);
  const [headerNote, setHeaderNote] = useState("");
  const [footerNote, setFooterNote] = useState("");
  const { images, uploadFiles, onClear } = useContext(ImageContext);
  const [dialogPayload, setDialogPayload] = useState({ open: false });
  const openContextMenu = useContext(AppContextMenuContext); 
  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
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
              <SixSquares images={images} />
              <Typography component="footer" className={classes.Note}>
                <TextWithLineBreaks>{footerNote}</TextWithLineBreaks>
              </Typography>
            </A4>
          </ZoomWrapper>
        </main>
        <Dialog open={dialogPayload.open} onClose={()=>setDialogPayload({ open: false })} >
          <ImageEditor imageId={images[0] && images[0].id || ''} />
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
