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
  approved: boolean;
  documentLike: boolean;
  digitalSignature: string;
  code: string;
  metadata: string;
  confidential: Confidential
  responsible: string;
  notify: boolean;
  reference: string;
  fileUris: string[];
  documentType: DocumentType;
  approvalStatus: ApprovalStatus;
  accessPermission: AccessPermission;
  folderId: number;
  tags: Tag[];
  versions: Version[];
  editing?: boolean;
}
