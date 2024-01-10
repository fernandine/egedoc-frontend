import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, first, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Document } from '../common/document';
import { User } from '../common/user';
import { DocumentPage } from '../common/document-page';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = environment.apiUrl + '/documents';
  public cache: Document[] = [];

  private http = inject(HttpClient);

  list(page: number, size: number) {
    const url = `${this.apiUrl}`;
   return this.http.get<DocumentPage>(url, { params: { page, size } }).pipe(
      first(),
      tap(data => (this.cache = data.documents))
    );
  }

  listDocumentByFolderId(folderId: number, page: number, size: number) {
    const url = `${this.apiUrl}/folder/${folderId}`;
   return this.http.get<DocumentPage>(url, { params: { page, size } }).pipe(
      first(),
      tap(data => (this.cache = data.documents))
    );
  }

  getAccessedUsers(documentId: number): Observable<User[]> {
    const url = `${this.apiUrl}/${documentId}/accessed-users`;
    return this.http.get<User[]>(url);
  }

  loadById(id: number): Observable<Document> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Document>(url);
  }

  getDocumentCountByFolder(folderId: number): Observable<string> {
    const url = `${this.apiUrl}/count?id=${folderId}`;
    return this.http.get<string>(url);
  }

  create(doc: Document): Observable<Document> {
    return this.http.post<Document>(this.apiUrl, doc);
  }

  uploadFile(file: File, folderId: number): Observable<Document> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folderId', folderId.toString());
    return this.http.post<Document>(`${this.apiUrl}/${folderId}/upload`, formData);
  }

  update(id:number, value: any): Observable<Document> {
    return this.http.put<Document>(`${this.apiUrl}/${id}`, value);
  }

  deleteDocument(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
