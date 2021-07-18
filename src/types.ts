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
  driveId: string;
  getItems(): Promise<Item[]>;
}

export interface Drive {
  options: any;
  provider: string;

  getItems(): Promise<Item[]>;
  deleteFile(fileId: string): Promise<void>;
  getFolder(folderId: string): Promise<Folder>;
}
