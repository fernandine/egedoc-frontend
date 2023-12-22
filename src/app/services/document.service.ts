import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../common/page';
import { Document } from '../common/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = environment.apiUrl + '/documents';

  private http = inject(HttpClient);

  list(page: number = 0, size: number = 10): Observable<Page<Document[]>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Document[]>>(this.apiUrl, { params });
  }

  loadById(id: string): Observable<Document[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Document[]>(url);
  }

  getDocumentCountByFolder(folderId: string): Observable<string> {
    const url = `${this.apiUrl}/count?id=${folderId}`;
    return this.http.get<string>(url);
  }

  create(doc: Document): Observable<Document> {
    return this.http.post<Document>(this.apiUrl, doc);
  }

  uploadFile(file: File, folderId: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
      return this.http.post(`${this.apiUrl}/${folderId}/upload`, formData);
  }


  update(id:string, value: any): Observable<Document> {
    return this.http.put<Document>(`${this.apiUrl}/${id}`, value);
  }

  delete(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
