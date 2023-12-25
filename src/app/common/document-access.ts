import { Department } from "./department";
import { User } from "./user";

export interface DocumentAccess {

  id: string;
  document: Document[];
  department: Department;
  user: User;
}
