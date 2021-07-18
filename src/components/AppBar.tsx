import React from "react";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AddUploadcareDriveButton from "./AddUploadcareDriveButton";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
}));

export default function ApplicationBar() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <Typography variant="h6" className={classes.title}>
            MULTIDISK
          </Typography>
        </Link>
        <AddUploadcareDriveButton />
      </Toolbar>
    </AppBar>
  );
}
