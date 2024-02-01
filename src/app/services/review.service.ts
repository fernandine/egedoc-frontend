import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from '../common/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl =  environment.apiUrl + '/reviews';

  private http = inject(HttpClient);

  listByFolderId(folderId: number): Observable<Review[]> {
    const url = `${this.apiUrl}/folder/${folderId}`;
    return this.http.get<Review[]>(url);
  }

  listByDocumentId(documentId: number): Observable<Review[]> {
    const url = `${this.apiUrl}/document/${documentId}`;
    return this.http.get<Review[]>(url);
  }

  create(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}`, review);
  }

}
