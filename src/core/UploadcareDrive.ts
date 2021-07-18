import axios, { AxiosResponse } from "axios";
import { Drive, File, ItemType, Item } from "../types";

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

  get driveType() {
    return this.options.type;
  }

  get type(): ItemType {
    return "drive";
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

  async getItems(): Promise<Item[]> {
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
}

function isOK(status: number) {
  return status >= 200 && status < 300;
}

function checkResponseOK(resp: AxiosResponse) {
  if (!isOK(resp.status)) {
    throw new Error(JSON.stringify(resp.data));
  }
}
