import { Document } from "./document";

export interface Version {
  id: number;
  timestamp: Date;
  number: number;
  content: string;
  document: Document;
}
