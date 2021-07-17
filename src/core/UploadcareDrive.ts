import axios from "axios";
import { Drive, File, Folder, ItemType } from "../types";

type Options = {
  type: string;
  id: string;
  name: string;
  publicKey: string;
  secretKey: string;
};

class UploadcareDrive implements Drive {
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

  get publicKey() {
    return this.options.publicKey;
  }

  makeHeaders() {
    return {
      Accept: "application/vnd.uploadcare-v0.5+json",
      Authorization: `Uploadcare.Simple ${this.publicKey}:${this.options.secretKey}`,
    };
  }

  async getFiles(): Promise<File[]> {
    const resp = await axios.get("https://api.uploadcare.com/files/", {
      headers: this.makeHeaders(),
    });
    if (!isOK(resp.status)) {
      throw new Error(JSON.stringify(resp.data));
    }
    return resp.data.results.map((f) => ({
      type: "file",
      id: f.uuid,
      name: f.original_filename,
      created_at: new Date(f.datetime_uploaded),
      url: f.original_file_url,
    }));
  }

  async getFolders(): Promise<Folder[]> {
    return [];
  }
}

function isOK(status: number) {
  return status >= 200 && status < 300;
}

export default UploadcareDrive;
