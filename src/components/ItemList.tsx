import isEmpty from "lodash/isEmpty";
import List from "@material-ui/core/List";
import { Item, File } from "../types";
import FileItem from "./FileItem";
import FolderItem from "./FolderItem";
import Placeholder from "./Placeholder";

export default function ItemList({ data }: { data: Item[] }) {
  if (isEmpty(data)) {
    return (
      <Placeholder>
        This drive is empty, but you can fill it out with something :)
      </Placeholder>
    );
  }

  const items = data.map((item, k) => {
    switch (item.type) {
      case "file":
        return <FileItem key={k} item={item as File} />;
      case "folder":
        return <FolderItem key={k} item={item as Item} />;
      default:
        return null;
    }
  });
  return <List>{items}</List>;
}
