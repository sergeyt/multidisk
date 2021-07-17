export type ItemType = "drive" | "folder" | "file";

export interface Item {
  type: ItemType;
  id: string;
  name: string;
}

export interface File extends Item {
  driveId: string;
  size: number;
  created_at: Date;
  url: string;
}

export interface Folder extends Item {
  getFiles(): Promise<File[]>;
  getFolders(): Promise<Folder[]>;
}

export interface Drive extends Folder {
  options: any;
  driveType: string;
  publicKey: string;
  deleteFile(fileId: string): Promise<void>;
}
