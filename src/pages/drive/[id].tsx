import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import FileIcon from "@material-ui/icons/InsertDriveFile";
import { Widget } from "@uploadcare/react-widget";
import { getDrive } from "../../core/store";
import Loader from "../../components/Loader";
import { Item, File, Folder } from "../../types";
import FileMenu from "./FileMenu";

const useStyles = makeStyles((theme) => ({
  item: {
    cursor: "pointer",
  },
  fileLink: {
    display: "flex",
  },
}));

export default function DriveView() {
  const styles = useStyles();
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR(`/drive/${id}/folders`, async () => {
    const drive = await getDrive(String(id));
    const folders = await drive.getFolders();
    const files = await drive.getFiles();
    return { drive, items: (folders as Item[]).concat(files) };
  });
  if (!data) {
    return <Loader />;
  }

  // TODO display empty placeholder with add folder or upload file buttons

  const items = data.items.map((item, k) => {
    switch (item.type) {
      case "file":
        return <FileItem key={k} item={item as File} />;
      case "folder":
        return <FolderItem key={k} item={item as Folder} />;
      default:
        return null;
    }
  });

  return (
    <>
      <Box m={2} mb={2}>
        <label>Upload a file:&nbsp;</label>
        <Widget publicKey={data.drive.publicKey} />
      </Box>
      <List>{items}</List>
    </>
  );
}

const FileItem: React.FC<{ item: File }> = ({ item }) => {
  const styles = useStyles();
  return (
    <ListItem className={styles.item}>
      <ListItemAvatar>
        <Avatar>
          <FileIcon />
        </Avatar>
      </ListItemAvatar>
      <MuiLink href={item.url} className={styles.fileLink} target="_blank">
        <ListItemText
          primary={item.name}
          secondary={formatDate(item.created_at)}
        />
      </MuiLink>
      <ListItemSecondaryAction>
        <FileMenu driveId={item.driveId} fileId={item.id} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const FolderItem: React.FC<{ item: Folder }> = ({ item }) => {
  const styles = useStyles();
  return (
    <Link href={`/folder/${item.id}`}>
      <ListItem className={styles.item}>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.name} />
      </ListItem>
    </Link>
  );
};

function formatDate(val: Date) {
  return DateTime.fromJSDate(val).toFormat("MMM d, yyyy");
}
