import { Segment } from "./segment";

export interface Tester {
  id: string;
  name: string;
  email: string;
  notification: boolean;
  phone: string;
  selected: Segment;
  position: string;
  companyName: string;
  numberOfEmployees: number;
  accessUrl: string;
  data: Date;
}
