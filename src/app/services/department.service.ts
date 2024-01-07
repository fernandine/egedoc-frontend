import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../common/department';
import { Page } from '../common/page';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = environment.apiUrl + '/departments';

  private http = inject(HttpClient);

  // list(folderId: string | null, page: number = 0, size: number = 10): Observable<Page<Department[]>> {
  //   let params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('size', size.toString());
  //   if (folderId) {
  //     params = params.set('folderId', folderId);
  //   }
  //   return this.http.get<Page<Department[]>>(this.apiUrl, { params });
  // }

  loadById(id: string): Observable<Department[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Department[]>(url);
  }

  create(dep: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, dep);
  }

  update(id:string, value: any): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/${id}`, value);
  }

  delete(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
