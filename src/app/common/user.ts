import { Department } from "./department";
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
  position:string;
  avatar: string;

  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;


  roles: Role[];
  departmentProfile: DepartmentProfile;
  department: Department;
}
