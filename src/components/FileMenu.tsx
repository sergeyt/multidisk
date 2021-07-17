import React from "react";
import { mutate } from "swr";
import MenuItem from "@material-ui/core/MenuItem";
import useConfirmation from "./Confirmation";
import MoreMenu from "./MoreMenu";
import { deleteFileById } from "../core/store";

const FileMenu: React.FC<{ driveId: string; fileId: string }> = ({
  driveId,
  fileId,
}) => {
  const deleteConfirmation = useConfirmation(
    "Are you sure you'd like to delete this file?",
    async () => {
      await deleteFileById(driveId, fileId);
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

export default FileMenu;
