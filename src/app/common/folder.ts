
export interface Folder {

  id: string;
  name: string;
  creationDate: Date;
  code: string;
  favorite: boolean;
  folderLike: boolean;
  approver: string;
  responsible: string;
  //subfolders: Folder[];
  parentFolderId: number;
  //review: Review[];
  //documents: Document;
  documentCount?: string;

}
