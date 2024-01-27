import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Document } from '../common/document';

@Injectable({
  providedIn: 'root'
})
export class ActionHeaderService {

  private selectedDocumentSubject = new BehaviorSubject<Document | null>(null);
  selectedDocument$ = this.selectedDocumentSubject.asObservable();

  private actionSubject = new BehaviorSubject<string | null>(null);
  action$ = this.actionSubject.asObservable();

  setAction(action: string): void {
    this.actionSubject.next(action);
  }

  getAction(): string | null {
    return this.actionSubject.getValue();
  }

  setSelectedDocument(document: Document | null): void {
    this.selectedDocumentSubject.next(document);
  }

  getSelectedDocument(): Document | null {
    return this.selectedDocumentSubject.getValue();
  }
  }
