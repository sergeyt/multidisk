export type ItemType = "drive" | "folder" | "file";

export interface Item {
  type: ItemType;
  id: string;
  name: string;
}

export interface File extends Item {
  driveId: string;
  size: number;
  createdAt: Date;
  url: string;
}

export interface Folder extends Item {
  getItems(): Promise<Item[]>;
}

export interface Drive extends Folder {
  options: any;
  provider: string;
  deleteFile(fileId: string): Promise<void>;
}
