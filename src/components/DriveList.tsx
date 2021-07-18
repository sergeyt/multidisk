import Link from "next/link";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DriveIcon from "@material-ui/icons/Work";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import List from "@material-ui/core/List";
import { Drive } from "../types";
import DriveMenu from "./DriveMenu";

export default function DriveList({ drives }: { drives: Drive[] }) {
  const items = drives.map((d, k) => (
    <Link href={`/drive/${d.id}`} key={k}>
      <ListItem style={{ cursor: "pointer" }}>
        <ListItemAvatar>
          <Avatar>
            <DriveIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={d.name} secondary={d.driveType} />
        <ListItemSecondaryAction>
          <DriveMenu driveId={d.id} />
        </ListItemSecondaryAction>
      </ListItem>
    </Link>
  ));
  return <List>{items}</List>;
}
