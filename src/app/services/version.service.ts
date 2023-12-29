import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../common/page';
import { Version } from '../common/version';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  private apiUrl = environment.apiUrl + '/versions';

  private http = inject(HttpClient);

  list(): Observable<Version[]> {
    return this.http.get<Version[]>(this.apiUrl);
  }

  loadById(id: string): Observable<Version[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Version[]>(url);
  }

  create(version: Version): Observable<Version> {
    return this.http.post<Version>(this.apiUrl, version);
  }

  update(id: string, value: any): Observable<Version> {
    return this.http.put<Version>(`${this.apiUrl}/${id}`, value);
  }

  delete(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
