import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../common/page';
import { Document } from '../common/document';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = environment.apiUrl + '/documents';

  private http = inject(HttpClient);

  list(page: number = 0, size: number = 10) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page>(this.apiUrl, { params });
  }

  // list(folderId: string | null, page: number = 0, size: number = 10): Observable<Page<Document[]>> {
  //   let params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('size', size.toString());

  //   if (folderId) {
  //     params = params.set('folderId', folderId);
  //   }

  //   return this.http.get<Page<Document[]>>(this.apiUrl, { params });
  // }

  getAccessedUsers(documentId: number): Observable<User[]> {
    const url = `${this.apiUrl}/${documentId}/accessed-users`;
    return this.http.get<User[]>(url);
  }

  loadById(id: string): Observable<Document> {
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
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<Document>(`${this.apiUrl}/${folderId}/upload`, formData);
  }

  update(id:number, value: Document): Observable<Document> {
    return this.http.put<Document>(`${this.apiUrl}/${id}`, value);
  }

  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
