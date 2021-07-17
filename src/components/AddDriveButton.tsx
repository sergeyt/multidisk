import { useState } from "react";
import { mutate } from "swr";
import MuiLink from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { addDrive } from "../core/store";

export default function AddDriveButton() {
  const [open, setOpen] = useState(false);
  const [valid, setValid] = useState(false);

  const close = () => {
    setOpen(false);
  };

  const getFormData = () => {
    const getValue = (id: string) => {
      const input = document.getElementById(id) as HTMLInputElement;
      return input?.value;
    };
    return ["name", "publicKey", "secretKey"].reduce((a, k) => {
      const val = getValue(k);
      a[k] = val;
      return a;
    }, {} as any);
  };

  const handleChange = () => {
    const data = getFormData();
    setValid(Object.keys(data).every((k) => !!data[k]));
  };

  const handleCreate = async () => {
    const data = getFormData();
    await addDrive({
      type: "uploadcare",
      ...data,
    });
    await mutate("/drives");
    close();
  };

  return (
    <>
      <Button
        color="secondary"
        onClick={(e) => {
          setOpen(true);
        }}
      >
        Add Drive
      </Button>
      <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Drive</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This app stores your Uploadcare keys locally in browser storage so
            don't worry be happy :). See{" "}
            <MuiLink
              href="https://uploadcare.com/about/privacy_policy/"
              target="_blank"
            >
              privacy policy
            </MuiLink>{" "}
            to learn more.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="publicKey"
            label="Public Key"
            type="text"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="secretKey"
            label="Secret Key"
            type="text"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary" disabled={!valid}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
