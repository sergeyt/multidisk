import localForage from "localforage";
import UploadcareDrive from "./UploadcareDrive";
import { Drive } from "../types";

const STORAGE_KEYS = {
  drives: "drives",
};

const drives: Drive[] = [];

let loaded = false;

export async function getDrives() {
  if (!loaded) {
    loaded = true;
    drives.length = 0;
    const items: any[] = await localForage.getItem(STORAGE_KEYS.drives);
    for (const options of items) {
      try {
        const drive = createDrive(options);
        drives.push(drive);
      } catch (err) {
        console.log("cant create drive:", err);
      }
    }
  }
  return drives;
}

export async function getDrive(id: string) {
  const drives = await getDrives();
  const d = drives.find((t) => t.id === id);
  if (!d) {
    throw new Error(`drive not found by id '${id}'`);
  }
  return d;
}

export async function addDrive(options: any) {
  const drive = createDrive(options);
  drives.push(drive);
  await saveDrives();
}

function saveDrives() {
  return localForage.setItem(
    STORAGE_KEYS.drives,
    drives.map((t) => t.options)
  );
}

function createDrive(options: any): Drive {
  switch (options.type) {
    case "uploadcare":
      return new UploadcareDrive({
        type: "uploadcare",
        id: options.id || options.publicKey,
        name: options.name,
        publicKey: options.publicKey,
        secretKey: options.secretKey,
      });
    default:
      throw new Error(`Unsupported drive type: ${options.type}`);
  }
}

export async function deleteDriveById(id: string) {
  const i = drives.findIndex((d) => d.id === id);
  if (i < 0) {
    throw new Error(`drive not found by id '${id}'`);
  }
  drives.splice(i, 1);
  await saveDrives();
}
