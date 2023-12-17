import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscriber } from '../common/subscriber';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  private apiUrl = environment.apiUrl + '/subscribers';

  private http = inject(HttpClient);

  get(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>(this.apiUrl);
  }

  getById(id: string): Observable<Subscriber[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Subscriber[]>(url);
  }

  create(sub: Subscriber): Observable<Subscriber> {
    return this.http.post<Subscriber>(this.apiUrl, sub);
  }

  // updateAddress(id:string, value: any): Observable<Subscriber> {
  //   return this.http.put<Subscriber>(`${this.apiUrl}/${id}`, value);
  // }

  delete(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
