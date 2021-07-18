import Link from "next/link";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { SiDropbox as DropboxIcon } from "react-icons/si";
import { FiHardDrive as DriveIcon } from "react-icons/fi";
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
            <Icon type={d.provider} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={d.name} secondary={d.provider} />
        <ListItemSecondaryAction>
          <DriveMenu driveId={d.id} />
        </ListItemSecondaryAction>
      </ListItem>
    </Link>
  ));
  return <List>{items}</List>;
}

const Icon = ({ type }) => {
  switch (type) {
    case "dropbox":
      return <DropboxIcon />;
    default:
      return <DriveIcon />;
  }
};
