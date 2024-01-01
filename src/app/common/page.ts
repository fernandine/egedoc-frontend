import { Folder } from "./folder";

export interface Page {
folders: Folder[];
totalElements: number;
totalPages?: number;
}
