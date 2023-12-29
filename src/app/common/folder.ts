import { Review } from "./review";

export interface Folder {

  id: number;
  name: string;
  creationDate: Date;
  code: string;
  favorite: boolean;
  folderLike: boolean;
  approver: string;
  responsible: string;
  review: Review[];
  //documents: Document;
  documentCount?: string;
  subFolders: Folder[];
  parentId?: number;
}
