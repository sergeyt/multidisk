import React from "react";
import isEmpty from "lodash/isEmpty";
import List from "@material-ui/core/List";
import { Item, File, Folder } from "../types";
import FileItem from "./FileItem";
import FolderItem from "./FolderItem";
import Placeholder from "./Placeholder";

const ItemList: React.FC<{ data: Item[] }> = ({ data }) => {
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
        return <FolderItem key={k} item={item as Folder} />;
      default:
        return null;
    }
  });
  return <List>{items}</List>;
};

export default ItemList;
