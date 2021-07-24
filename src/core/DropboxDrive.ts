import axios from "axios";
import trimStart from "lodash/trimStart";
import { Drive, Item, File } from "../types";
import { checkResponseOK, downloadBlob, trimPrefix } from "./utils";

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

  async getItems(folderId: string = ""): Promise<Item[]> {
    if (!folderId.startsWith("/")) {
      folderId = "/" + folderId;
    }
    const resp = await this.axios().post(
      "https://api.dropboxapi.com/2/files/list_folder",
      {
        path: folderId === "/" ? "" : folderId,
      }
    );
    checkResponseOK(resp);
    return resp.data.entries.map((entry) => {
      if (entry[".tag"] === "file") {
        return {
          type: "file",
          id: trimPrefix(entry.id, "id:"),
          name: entry.name,
          path: entry.path_display,
          createdAt: new Date(entry.server_modified),
          driveId: this.id,
          size: entry.size,
          download: async () => {
            const resp = await this.axios().post(
              "https://content.dropboxapi.com/2/files/download",
              undefined,
              {
                headers: {
                  "Dropbox-API-Arg": JSON.stringify({ path: entry.id }),
                },
                responseType: "blob",
              }
            );
            downloadBlob(resp.data, entry.name);
          },
        } as File;
      }
      return {
        type: "folder",
        id: trimStart(entry.path_display, "/"),
        name: entry.name,
        path: entry.path_display,
        driveId: this.id,
      } as Item;
    });
  }

  async deleteFile(fileId: string): Promise<void> {
    const resp = this.axios().post(
      "https://api.dropboxapi.com/2/file_requests/delete",
      {
        ids: [fileId],
      }
    );
    checkResponseOK(resp);
  }

  deleteFolder(folderId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  axios() {
    return axios.create({
      headers: {
        Authorization: `Bearer ${this.options.accessToken}`,
        "Content-Type": "application/json",
      },
    });
  }
}
