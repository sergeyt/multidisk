import React from "react";
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
        You don't any drives, but you can create one clicking on ADD DRIVE
        button
      </Placeholder>
    );
  }

  return (
    <>
      <DriveList drives={drives} />
    </>
  );
}
