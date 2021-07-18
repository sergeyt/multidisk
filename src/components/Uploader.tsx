import { mutate } from "swr";
import { Widget } from "@uploadcare/react-widget";
import { Drive } from "../types";

export default function Uploader({ drive }: { drive: Drive }) {
  if (drive.provider === "uploadcare") {
    return (
      <>
        <label>Upload a file:&nbsp;</label>
        <Widget
          publicKey={drive.options.publicKey}
          onChange={() => {
            mutate(`/drive/${drive.id}`);
          }}
        />
      </>
    );
  }
  return null;
}
