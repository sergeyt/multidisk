import axios from "axios";
import { Drive, File, Item } from "../types";
import { checkResponseOK } from "./utils";

type Options = {
  type: string;
  id: string;
  name: string;
  publicKey: string;
  secretKey: string;
};

export default class UploadcareDrive implements Drive {
  private _options: Options;

  constructor(options: Options) {
    this._options = options;
  }

  get options(): Options {
    return this._options;
  }

  get provider() {
    return this.options.type;
  }

  get id() {
    return this.options.id;
  }

  get name() {
    return this.options.name;
  }

  axios() {
    return axios.create({
      headers: {
        Accept: "application/vnd.uploadcare-v0.5+json",
        Authorization: `Uploadcare.Simple ${this.options.publicKey}:${this.options.secretKey}`,
      },
    });
  }

  async getItems(folderId?: string): Promise<Item[]> {
    const resp = await this.axios().get("https://api.uploadcare.com/files/");
    checkResponseOK(resp);
    return resp.data.results.map(
      (f) =>
        ({
          type: "file",
          driveId: this.id,
          id: f.uuid,
          name: f.original_filename,
          createdAt: new Date(f.datetime_uploaded),
          url: f.original_file_url,
          size: f.size,
        } as File)
    );
  }

  async deleteFile(fileId: string): Promise<void> {
    const resp = await this.axios().delete(
      `https://api.uploadcare.com/files/${fileId}/`
    );
    checkResponseOK(resp);
  }

  deleteFolder(folderId: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
