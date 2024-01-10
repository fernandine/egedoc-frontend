import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private isHeaderSiteSource = new BehaviorSubject<boolean>(true);
  isHeaderSite$ = this.isHeaderSiteSource.asObservable();

  setHeaderForSite(isHeaderSite: boolean) {
    this.isHeaderSiteSource.next(isHeaderSite);
  }
}
