import axios from "axios";
import trimStart from "lodash/trimStart";
import { Drive, Item, File } from "../types";
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

function trimPrefix(s: string, prefix: string) {
  return s.startsWith(prefix) ? s.slice(prefix.length) : s;
}

// https://blog.logrocket.com/programmatic-file-downloads-in-the-browser-9a5186298d5c/
function downloadBlob(blob, filename) {
  // Create an object URL for the blob object
  const url = URL.createObjectURL(blob);

  // Create a new anchor element
  const a = document.createElement("a");

  // Set the href and download attributes for the anchor element
  // You can optionally set other attributes like `title`, etc
  // Especially, if the anchor element will be attached to the DOM
  a.href = url;
  a.download = filename || "download";

  // Click handler that releases the object URL after the element has been clicked
  // This is required for one-off downloads of the blob content
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener("click", clickHandler);
    }, 150);
  };

  // Add the click event listener on the anchor element
  // Comment out this line if you don't want a one-off download of the blob content
  a.addEventListener("click", clickHandler, false);

  // Programmatically trigger a click on the anchor element
  // Useful if you want the download to happen automatically
  // Without attaching the anchor element to the DOM
  // Comment out this line if you don't want an automatic download of the blob content
  a.click();
}
