import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Folder } from '../common/folder';
import { FolderService } from '../services/folder.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderResolver {

  constructor(private folderService: FolderService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Folder> {
    const folderId = +route.paramMap.get('id')!;
    return this.folderService.loadById(folderId);
  }
}
