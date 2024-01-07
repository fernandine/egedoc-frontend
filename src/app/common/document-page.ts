import { Document } from "./document";

export interface DocumentPage {
  documents: Document[];
  totalElements: number;
  totalPages?: number;
}
