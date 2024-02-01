import { HttpClient, HttpEvent } from '@angular/common/http';
import { EventEmitter, Injectable, inject } from '@angular/core';
import { Observable, first, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Document } from '../common/document';
import { User } from '../common/user';
import { DocumentPage } from '../common/document-page';
import { PasteRequest } from '../common/paste-request';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = environment.apiUrl + '/documents';
  public cache: Document[] = [];
  private uploadUrl!: string;

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

  uploadFile(formData: FormData, folderId: number): Observable<Document> {
    this.setUploadUrl(folderId);

    const options = {
      reportProgress: true,
    };

    return this.http.post<Document>(this.uploadUrl, formData, options);
  }

  setUploadUrl(folderId: number): void {
    this.uploadUrl = `${this.apiUrl}/documents/${folderId}/upload`;
  }

  update(id:number, value: any): Observable<Document> {
    return this.http.put<Document>(`${this.apiUrl}/${id}`, value);
  }

  deleteDocument(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  findByFavorite(favorite: boolean): Observable<Document[]> {
    const url = `${this.apiUrl}/favorites?favorite=${favorite}`;
    return this.http.get<Document[]>(url);
  }

  toggleFavorite(document: Document): Observable<Document> {
    document.favorite = !document.favorite;
    const url = `${this.apiUrl}/${document.id}`;
    return this.http.put<Document>(url, document).pipe(
      map(updatedDocument => {
        const cachedDocumentIndex = this.cache.findIndex(p => p.id === updatedDocument.id);
        if (cachedDocumentIndex !== -1) {
          this.cache[cachedDocumentIndex] = updatedDocument;
        }
        return updatedDocument;
      })
    );
  }
  documentCopied: EventEmitter<Document> = new EventEmitter<Document>();


copy(documentId: number): Observable<Document> {
  const url = `${this.apiUrl}/${documentId}/copy`;
  return this.http.post<Document>(url, documentId);
}

  copyAndPasteDocument(request: PasteRequest): Observable<Document> {
    return this.http.post<Document>(`${this.apiUrl}/copy-paste`, request);
  }

  cutAndPasteDocument(request: PasteRequest): Observable<Document> {
    return this.http.post<Document>(`${this.apiUrl}/cut-paste`, request);
  }

  cut(documentId: number): Observable<Document> {
    const url = `${this.apiUrl}/${documentId}/cut`;
    return this.http.post<Document>(url, documentId);
  }

  // copyDocumentId(documentId: number) {
  //   this.selection.setCopiedDocumentId(documentId);
  // }

  // copyDocument(documentId: number, folderId: number): Observable<any> {
  //   const copiedDocumentId = this.selection.getCopiedDocumentId();
  //   return this.http.post<any>(`${this.apiUrl}/${folderId}/copy`, { documentId: copiedDocumentId });
  // }
}
