import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { Item } from "../types";
import FolderMenu from "./FolderMenu";

const useStyles = makeStyles((theme) => ({
  item: {
    cursor: "pointer",
  },
}));

const FolderItem: React.FC<{ item: Item }> = ({ item }) => {
  const router = useRouter();
  const styles = useStyles();
  const path = `/drive/${item.driveId}?folder=${encodeURIComponent(item.id)}`;
  return (
    <ListItem
      className={styles.item}
      onClick={(e) => {
        e.preventDefault();
        router.push(path);
      }}
    >
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={item.name} />
      <ListItemSecondaryAction>
        <FolderMenu driveId={item.driveId} folderId={item.id} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default FolderItem;
