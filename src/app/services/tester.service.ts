import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tester } from '../common/tester';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TesterService {

  private apiUrl = environment.apiUrl + '/testers';

  private http = inject(HttpClient);

  get(): Observable<Tester[]> {
    return this.http.get<Tester[]>(this.apiUrl);
  }

  getById(id: string): Observable<Tester[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Tester[]>(url);
  }

  create(tester: Tester): Observable<Tester> {
    return this.http.post<Tester>(this.apiUrl, tester);
  }

  update(id:string, value: any): Observable<Tester> {
    return this.http.put<Tester>(`${this.apiUrl}/${id}`, value);
  }

  delete(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
