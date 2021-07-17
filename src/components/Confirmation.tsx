import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function useConfirmation(
  message: string,
  action: () => Promise<void>
) {
  const [open, setOpen] = React.useState(false);

  const close = () => {
    setOpen(false);
  };

  const handleOK = async () => {
    try {
      await action();
    } finally {
      close();
    }
  };

  const view = (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOK} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );

  const trigger = () => {
    setOpen(true);
  };

  return { view, trigger };
}
