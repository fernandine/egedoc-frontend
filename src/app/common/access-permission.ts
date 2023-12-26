import { Document } from "./document";

export interface AccessPermission {
  id: number;
  readPermission: boolean;
  writePermission: boolean;
  approvePermission: boolean;

  document: Document;

}
