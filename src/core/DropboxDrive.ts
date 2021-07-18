import axios from "axios";
import trimStart from "lodash/trimStart";
import { Drive, ItemType, Item, File, Folder } from "../types";
import { checkResponseOK } from "./utils";

type Options = {
  type: string;
  id: string;
  name: string;
  accessToken: string;
};

export default class DropboxDrive implements Drive {
  private _options: Options;

  constructor(options: Options) {
    this._options = options;
  }

  get provider() {
    return "dropbox";
  }
  get id() {
    return this.options.id;
  }
  get name() {
    return this.options.name;
  }
  get options() {
    return this._options;
  }
  get type(): ItemType {
    return "drive";
  }

  async getItems(): Promise<Item[]> {
    const resp = await this.axios().post(
      "https://api.dropboxapi.com/2/files/list_folder",
      {
        path: "",
      }
    );
    checkResponseOK(resp);
    return resp.data.entries.map((entry) => {
      if (entry[".tag"] === "file") {
        return {
          id: entry.id,
          name: entry.name,
          createdAt: new Date(entry.serverModified),
          driveId: this.id,
          url: "",
          size: entry.size,
        } as File;
      }
      return new DropboxFolder(this, entry);
    });
  }

  deleteFile(fileId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  async getFolder(folderId: string): Promise<Folder> {
    // TODO figure out how to get folder info by id
    // for now just list parent folder and find the folder
    const path = parsePath(folderId);
    const parentPath = path.slice(0, path.length - 1).join("/");

    const resp = await this.axios().get(
      "https://api.dropboxapi.com/2/files/list_folder",
      {
        data: {
          path: parentPath,
        },
      }
    );
    checkResponseOK(resp);
    // TODO check next page
    const entry = resp.data.entries.find((t) => t.path_display === folderId);
    return new DropboxFolder(this, entry);
  }

  axios() {
    return axios.create({
      headers: {
        Authorization: `Bearer ${this.options.accessToken}`,
      },
    });
  }
}

function parsePath(path: string) {
  return path.split("/");
}

class DropboxFolder implements Folder {
  constructor(private drive: DropboxDrive, entry: any) {
    this.id = trimStart(entry.path_display, "/");
    this.name = entry.name;
    this.path = entry.path_display;
  }

  id: string;
  name: string;
  path: string;

  get driveId() {
    return this.drive.id;
  }

  get type(): ItemType {
    return "folder";
  }

  getItems(): Promise<Item[]> {
    return Promise.resolve([]);
  }
}
