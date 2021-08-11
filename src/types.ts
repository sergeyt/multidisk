export type ItemType = "file" | "folder";

export interface Item {
  type: ItemType;
  id: string;
  name: string;
  path: string;
  driveId: string;
}

export interface File extends Item {
  size: number;
  createdAt: Date;
  url?: string;
  download?: () => Promise<any>;
}

export interface Drive {
  id: string;
  name: string;
  options: any;
  provider: string;

  getItems(folderId?: string): Promise<Item[]>;
  deleteFile(fileId: string): Promise<void>;
  deleteFolder(folderId: string): Promise<void>;
}
