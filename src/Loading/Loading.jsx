import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "white",
    border: "3px solid black",
  },
}));
export default function Loading() {
  const classes = useStyles();

  return (
    <div>
      <Backdrop open className={classes.backdrop}>
        <CircularProgress
          color="inherit"
          size={110}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.15)",
            zIndex: 1,
            borderRadius: "50%",
          }}
        />
      </Backdrop>
    </div>
  );
}
