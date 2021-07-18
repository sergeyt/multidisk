import { Drive, ItemType, Item } from "../types";

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

  get driveType() {
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

  getItems(): Promise<Item[]> {
    return Promise.resolve([]);
  }

  deleteFile(fileId: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
