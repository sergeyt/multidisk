import React from "react";
import { mutate } from "swr";
import MenuItem from "@material-ui/core/MenuItem";
import useConfirmation from "./Confirmation";
import { deleteDriveById } from "../core/store";
import MoreMenu from "./MoreMenu";

const DriveMenu: React.FC<{ driveId: string }> = ({ driveId }) => {
  const deleteConfirmation = useConfirmation(
    "Are you sure you'd like to delete this drive?",
    async () => {
      await deleteDriveById(driveId);
      await mutate("/drives");
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

export default DriveMenu;
