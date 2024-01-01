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
  reviews: Review[];
  documents: Document[];
  subFolders: Folder[];
  documentCount: string;
  parentId: number;
  parentFolderName: string;
  editing?: boolean;

}
