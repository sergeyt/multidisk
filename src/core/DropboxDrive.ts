import axios, { AxiosResponse } from "axios";
import { Drive, ItemType, Item, File, Folder } from "../types";

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
    // TODO check folder exists
    // return new DropboxFolder(this, folderId);
    throw new Error("not implemented");
  }

  axios() {
    return axios.create({
      headers: {
        Authorization: `Bearer ${this.options.accessToken}`,
      },
    });
  }
}

function isOK(status: number) {
  return status >= 200 && status < 300;
}

function checkResponseOK(resp: AxiosResponse) {
  if (!isOK(resp.status)) {
    throw new Error(JSON.stringify(resp.data));
  }
}

class DropboxFolder implements Folder {
  constructor(private drive: DropboxDrive, entry: any) {
    this.id = entry.id;
    this.name = entry.name;
    this.path = entry.path_display;
  }

  id: string;
  name: string;
  path: string;

  get type(): ItemType {
    return "folder";
  }

  getItems(): Promise<Item[]> {
    return Promise.resolve([]);
  }
}
