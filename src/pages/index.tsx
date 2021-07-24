import isEmpty from "lodash/isEmpty";
import useSWR from "swr";
import { getDrives } from "../core/store";
import Loader from "../components/Loader";
import Placeholder from "../components/Placeholder";
import DriveList from "../components/DriveList";

export default function Home() {
  const { data: drives } = useSWR("/drives", getDrives);
  if (!drives) {
    return <Loader />;
  }

  if (isEmpty(drives)) {
    return (
      <Placeholder>
        You have no any drives, but you can create new one just clicking on ADD DRIVE
        button
      </Placeholder>
    );
  }

  return <DriveList drives={drives} />;
}
