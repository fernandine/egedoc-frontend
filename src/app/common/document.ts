import { Tag } from "primeng/tag";
import { Version } from "@angular/core";
import { AccessPermission } from "./access-permission";
import { ApprovalStatus } from "./enums/approval-status";
import { DocumentType } from "./enums/document-type";

export interface Document {

  id: string;
  title: string;
  category: string;
  description: string;
  creationDate: Date;
  lastUpdate: Date;
  dueDate: Date;
  approved: boolean;
  documentLike: boolean;
  digitalSignature: string;
  imageUrl: string;
  code: string;
  metadata: string;

  documentType: DocumentType;
  approvalStatus: ApprovalStatus;
  accessPermission: AccessPermission;

  tags: Tag[];
  versions: Version[];

  folderId: number;
  departmentId: number;
  userId: number;
}
