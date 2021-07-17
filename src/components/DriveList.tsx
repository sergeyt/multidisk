import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DriveIcon from "@material-ui/icons/Work";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import List from "@material-ui/core/List";
import { Drive } from "../types";
import DriveMenu from "./DriveMenu";

const useStyles = makeStyles((theme) => ({
  item: {
    cursor: "pointer",
  },
}));

const DriveList: React.FC<{ drives: Drive[] }> = ({ drives }) => {
  const styles = useStyles();
  const items = drives.map((d, k) => {
    return (
      <Link href={`/drive/${d.id}`} key={k}>
        <ListItem className={styles.item}>
          <ListItemAvatar>
            <Avatar>
              <DriveIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={d.name} secondary="Jan 9, 2014" />
          <ListItemSecondaryAction>
            <DriveMenu driveId={d.id} />
          </ListItemSecondaryAction>
        </ListItem>
      </Link>
    );
  });
  return <List>{items}</List>;
};

export default DriveList;
