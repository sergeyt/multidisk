import { useRouter } from "next/router";
import useSWR from "swr";
import { Box } from "@material-ui/core";
import { Widget } from "@uploadcare/react-widget";
import { getDrive } from "../../core/store";
import Loader from "../../components/Loader";
import ItemList from "../../components/ItemList";

export default function DriveView() {
  const router = useRouter();
  const { id } = router.query;

  const { data, revalidate } = useSWR(`/drive/${id}`, async () => {
    const drive = await getDrive(String(id));
    const items = await drive.getItems();
    return { drive, items };
  });
  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <Box m={2} mb={2}>
        <label>Upload a file:&nbsp;</label>
        <Widget
          publicKey={data.drive.options.publicKey}
          onChange={revalidate}
        />
      </Box>
      <ItemList data={data.items} />
    </>
  );
}
