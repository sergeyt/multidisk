import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Box } from "@material-ui/core";
import { Widget } from "@uploadcare/react-widget";
import { getDrive } from "../../core/store";
import Loader from "../../components/Loader";
import { Item } from "../../types";
import ItemList from "./ItemList";

export default function DriveView() {
  const router = useRouter();
  const { id } = router.query;

  const { data, revalidate } = useSWR(`/drive/${id}`, async () => {
    const drive = await getDrive(String(id));
    const folders = await drive.getFolders();
    const files = await drive.getFiles();
    return { drive, items: (folders as Item[]).concat(files) };
  });
  if (!data) {
    return <Loader />;
  }

  // TODO display empty placeholder with add folder or upload file buttons

  return (
    <>
      <Box m={2} mb={2}>
        <label>Upload a file:&nbsp;</label>
        <Widget publicKey={data.drive.publicKey} onChange={revalidate} />
      </Box>
      <ItemList data={data.items} />
    </>
  );
}
