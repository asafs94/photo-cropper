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


function App() {
  const paperRef = useRef<any>();
  const appRef = useRef<any>();
  const classes = useStyles();
  const [drawerOpen, toggleDrawer] = useToggleable(false);
  const [headerNote, setHeaderNote] = useState("");
  const [footerNote, setFooterNote] = useState("");
  const { croppableImages, uploadFiles, onClear } = useContext(ImageContext);
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
              <SixSquares croppableImages={croppableImages} />
              <Typography component="footer" className={classes.Note}>
                <TextWithLineBreaks>{footerNote}</TextWithLineBreaks>
              </Typography>
            </A4>
          </ZoomWrapper>
        </main>
        <Dialog open={false}>
          <ImageEditor imageId={croppableImages[0] && croppableImages[0].id || ''} />
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
            loaded={!!croppableImages.length}
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
