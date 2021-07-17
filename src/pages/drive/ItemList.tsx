import React from "react";
import List from "@material-ui/core/List";
import { Item, File, Folder } from "../../types";
import FileItem from "./FileItem";
import FolderItem from "./FolderItem";

const ItemList: React.FC<{ data: Item[] }> = ({ data }) => {
  const items = data.map((item, k) => {
    switch (item.type) {
      case "file":
        return <FileItem key={k} item={item as File} />;
      case "folder":
        return <FolderItem key={k} item={item as Folder} />;
      default:
        return null;
    }
  });
  return <List>{items}</List>;
};

export default ItemList;
