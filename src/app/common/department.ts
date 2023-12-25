import { DocumentAccess } from "./document-access";
import { User } from "./user";

export interface Department {

  id: number;
  name: string;
  description: string;
  organization: string;
  members: User[];
  manager: User;
  documents: Document[];
  documentAccessList: DocumentAccess[];
}
