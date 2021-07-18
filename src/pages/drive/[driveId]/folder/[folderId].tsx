import { useRouter } from "next/router";
import useSWR from "swr";
import { Box } from "@material-ui/core";
import { getDrive } from "../../../../core/store";
import Loader from "../../../../components/Loader";
import ItemList from "../../../../components/ItemList";
import Uploader from "../../../../components/Uploader";

export default function FolderView() {
  const router = useRouter();
  const { driveId, folderId } = router.query;
  const fid = decodeURIComponent(String(folderId));

  const { data } = useSWR(`/drive/${driveId}/folder/${folderId}`, async () => {
    const drive = await getDrive(String(driveId));
    const folder = await drive.getFolder(fid);
    const items = await folder.getItems();
    return { drive, items };
  });
  if (!data) {
    return <Loader />;
  }

  // TODO upload to given folder
  return (
    <>
      <Box m={2} mb={2}>
        <Uploader drive={data.drive} />
      </Box>
      <ItemList data={data.items} />
    </>
  );
}
