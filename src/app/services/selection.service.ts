import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Folder } from '../common/folder';
import { Document } from '../common/document';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private selectedFolderSubject: Subject<Folder | null> = new Subject<Folder | null>();
  private selectedDocumentSubject: Subject<Document | null> = new Subject<Document | null>();

  setSelectedFolder(folder: Folder | null) {
    this.selectedFolderSubject.next(folder);
  }

  getSelectedFolder(): Observable<Folder | null> {
    return this.selectedFolderSubject.asObservable();
  }

  setSelectedDocument(document: Document | null) {
    this.selectedDocumentSubject.next(document);
  }

  getSelectedDocument(): Observable<Document | null> {
    return this.selectedDocumentSubject.asObservable();
  }

}
