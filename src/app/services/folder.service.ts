import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Folder } from '../common/folder';
import { Page } from '../common/page';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private apiUrl = environment.apiUrl + '/folders';

  private http = inject(HttpClient);

  list(page: number = 0, size: number = 10): Observable<Page<Folder[]>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Folder[]>>(this.apiUrl, { params });
  }

  loadById(id: string): Observable<Folder[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Folder[]>(url);
  }

  create(folder: Folder): Observable<Folder> {
    return this.http.post<Folder>(this.apiUrl, folder);
  }

  update(id:string, value: any): Observable<Folder> {
    return this.http.put<Folder>(`${this.apiUrl}/${id}`, value);
  }

  delete(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
