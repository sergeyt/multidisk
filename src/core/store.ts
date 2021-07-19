import localForage from "localforage";
import { nanoid } from "nanoid";
import UploadcareDrive from "./UploadcareDrive";
import { Drive } from "../types";
import DropboxDrive from "./DropboxDrive";

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
  if (!options.name) {
    throw new Error("name is not specified");
  }
  switch (options.type) {
    case "uploadcare":
      if (!options.publicKey) {
        throw new Error("publicKey is not specified");
      }
      if (!options.secretKey) {
        throw new Error("secretKey is not specified");
      }
      return new UploadcareDrive({
        type: "uploadcare",
        id: options.id || nanoid(),
        name: options.name,
        publicKey: options.publicKey,
        secretKey: options.secretKey,
      });
    case "dropbox":
      if (!options.accessToken) {
        throw new Error("accessToken is not specified");
      }
      return new DropboxDrive({
        type: "dropbox",
        id: options.id || nanoid(),
        name: options.name,
        accessToken: options.accessToken,
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

export async function deleteFileById(driveId, fileId: string) {
  const drive = await getDrive(driveId);
  await drive.deleteFile(fileId);
}

export async function deleteFolderById(driveId, folderId: string) {
  const drive = await getDrive(driveId);
  await drive.deleteFolder(folderId);
}
