import { useRouter } from "next/router";
import useSWR from "swr";
import { Box } from "@material-ui/core";
import { getDrive } from "../../../core/store";
import Loader from "../../../components/Loader";
import ItemList from "../../../components/ItemList";
import Uploader from "../../../components/Uploader";

export default function DriveView() {
  const router = useRouter();
  const { driveId } = router.query;

  const { data } = useSWR(`/drive/${driveId}`, async () => {
    const drive = await getDrive(String(driveId));
    const items = await drive.getItems();
    return { drive, items };
  });
  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <Box m={2} mb={2}>
        <Uploader drive={data.drive} />
      </Box>
      <ItemList data={data.items} />
    </>
  );
}
