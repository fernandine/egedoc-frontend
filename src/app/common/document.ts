import { Tag } from "primeng/tag";
import { AccessPermission } from "./access-permission";
import { ApprovalStatus } from "./enums/approval-status";
import { DocumentType } from "./enums/document-type";
import { Confidential } from './enums/confidential.enum';
import { Version } from "./version";

export interface Document {

  id: number;
  name: string;
  category: string;
  description: string;
  creationDate: Date;
  lastUpdate: Date;
  dueDate: Date;
  temporality: number;
  purge: Date;
  approved: boolean;
  allowDownload: boolean;
  favorite: boolean;
  itemLike: boolean;
  digitalSignature: string;
  code: string;
  metadata: string;
  note: string;
  confidential: Confidential
  responsible: string;
  notify: boolean;
  reference: string;
  fileUris: string[];
  documentType: DocumentType;
  approvalStatus: ApprovalStatus;
  accessPermission: AccessPermission;
  folderId: number;
  tags: string[];
  versions: Version[];
  editing?: boolean;
}
