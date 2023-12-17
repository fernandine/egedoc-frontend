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

  getAddresses(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getById(id: string): Observable<User[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User[]>(url);
  }

  createAddress(address: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, address);
  }

  updateAddress(id:string, value: any): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, value);
  }

  deleteAddress(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
