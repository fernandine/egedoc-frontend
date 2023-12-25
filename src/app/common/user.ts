import { DepartmentProfile } from "./enums/department-profile.enum";
import { Role } from "./role";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  roles: Role[];
  departmentProfile: DepartmentProfile;
}
