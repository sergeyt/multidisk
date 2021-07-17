import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import { Folder } from "../../types";

const useStyles = makeStyles((theme) => ({
  item: {
    cursor: "pointer",
  },
}));

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

export default FolderItem;
