import { Injectable, inject } from '@angular/core';
import { User } from '../common/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + '/users';

  private http = inject(HttpClient);

  list(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getById(id: string): Observable<User[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User[]>(url);
  }

  create(address: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, address);
  }

  update(id:string, value: any): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, value);
  }

  delete(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
