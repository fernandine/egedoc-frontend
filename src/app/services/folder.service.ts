import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, first, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Folder } from '../common/folder';
import { Page } from '../common/page';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private apiUrl = environment.apiUrl + '/folders';
  public cache: Folder[] = [];

  private http = inject(HttpClient);

  list(page: number, size: number) {
    const url = `${this.apiUrl}`;
   return this.http.get<Page>(url, { params: { page, size } }).pipe(
      first(),
      tap(data => (this.cache = data.folders))
    );
  }

  listSubfolders(parentId: number, page: number, size: number) {
    const url = `${this.apiUrl}/${parentId}/subfolders`;
   return this.http.get<Page>(url, { params: { page, size } }).pipe(
      first(),
      tap(data => (this.cache = data.folders))
    );
  }

  getBreadcrumb(parentId: number): Observable<Folder> {
    const url = `${this.apiUrl}/hierarchy/${parentId}`;
    return this.http.get<Folder>(url);
  }


  listParentfolder(page: number, size: number) {
    const url = `${this.apiUrl}/parentFolders`;
    return this.http.get<Page>(url, { params: { page, size } }).pipe(
      first(),
      tap(data => (this.cache = data.folders))
    );
  }

  loadById(id: number): Observable<Folder> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Folder>(url);
  }

  create(folder: Folder): Observable<Folder> {
    return this.http.post<Folder>(this.apiUrl, folder);
  }

  update(id: string, value: any): Observable<Folder> {
    return this.http.put<Folder>(`${this.apiUrl}/${id}`, value);
  }

  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
