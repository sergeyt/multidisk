import React from "react";
import { mutate } from "swr";
import MenuItem from "@material-ui/core/MenuItem";
import useConfirmation from "./Confirmation";
import MoreMenu from "./MoreMenu";
import { deleteFolderById } from "../core/store";

const FolderMenu: React.FC<{ driveId: string; folderId: string }> = ({
  driveId,
  folderId,
}) => {
  const deleteConfirmation = useConfirmation(
    "Are you sure you'd like to delete this folder?",
    async () => {
      await deleteFolderById(driveId, folderId);
      await mutate(`"/drive/${driveId}"`);
    }
  );

  return (
    <>
      <MoreMenu id={`drive_menu_${driveId}`}>
        <MenuItem onClick={deleteConfirmation.trigger}>Delete</MenuItem>
      </MoreMenu>
      {deleteConfirmation.view}
    </>
  );
};

export default FolderMenu;
