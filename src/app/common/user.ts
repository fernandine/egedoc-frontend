import { Role } from "./role";

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  roles: Role[];
}
