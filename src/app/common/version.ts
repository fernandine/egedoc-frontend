import { Document } from "./document";
import { User } from "./user";

export interface Version {
  id: string;
  creationDate: Date;
  code: string;
  description: string;
  document: Document;
  user: User;
}
