import React from "react";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FileIcon from "@material-ui/icons/InsertDriveFile";
import PdfIcon from "@material-ui/icons/PictureAsPdf";
import MuiLink from "@material-ui/core/Link";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import prettyBytes from "pretty-bytes";
import FileMenu from "./FileMenu";
import { File } from "../types";

const useStyles = makeStyles((theme) => ({
  item: {
    cursor: "pointer",
  },
  fileLink: {
    display: "flex",
  },
}));

const FileItem: React.FC<{ item: File }> = ({ item }) => {
  const styles = useStyles();
  return (
    <ListItem className={styles.item}>
      <ListItemAvatar>
        <Avatar>
          {withExtension(item.name, ".pdf") ? <PdfIcon /> : <FileIcon />}
        </Avatar>
      </ListItemAvatar>
      <MuiLink href={item.url} className={styles.fileLink} target="_blank">
        <ListItemText
          primary={item.name}
          secondary={[prettyBytes(item.size), formatDate(item.createdAt)]
            .filter((t) => !!t)
            .join(" ")}
        />
      </MuiLink>
      <ListItemSecondaryAction>
        <FileMenu driveId={item.driveId} fileId={item.id} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

function withExtension(filename: string, ext: string) {
  return filename && filename.toLowerCase().endsWith(ext);
}

function formatDate(val: Date) {
  return DateTime.fromJSDate(val).toFormat("MMM d, yyyy");
}

export default FileItem;
