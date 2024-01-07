import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { Document } from 'src/app/common/document';
import { DocumentPage } from 'src/app/common/document-page';
import { Folder } from 'src/app/common/folder';
import { Page } from 'src/app/common/page';
import { DocumentService } from 'src/app/services/document.service';
import { FolderService } from 'src/app/services/folder.service';
import { NotificationService } from 'src/app/services/notification.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent {
  documents: Document[] = [];
  documents$: Observable<DocumentPage> | null = null;
  first = 0;
  rows = 10;
  selected!: Document[] | null;
  folderId!: number;
  document!: Document;
  visibleUpdateDocument!: boolean;
  folder!: Folder;

  constructor(
    private documentService: DocumentService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private folderService: FolderService
  ) { }

  ngOnInit(): void {
  this.refresh();
  }

  refresh(pageEvent: PageEvent = { pageCount: 0, first: 0, rows: 10, page: 0 }
  ) {

    this.documents$ = this.documentService.list(pageEvent.first, pageEvent.rows)
      .pipe(
        tap(() => {
          this.first = pageEvent.first;
          this.rows = pageEvent.rows;
        }),
        catchError(() => {
          this.notificationService.error('Error loading documents');
          return of({ documents: [], totalElements: 0 } as DocumentPage);
        })
      );
  }

  loadById(document: Document): void {
    if (document.id !== undefined) {
      this.documentService.loadById(document.id).subscribe(() => {
        this.router.navigate(['documents', document.id]);
      });
    } else {
      console.error('ID do document indefinido.');
    }
  }

  enableEditing(subfolder: any): void {
    subfolder.editing = true;
    subfolder.newName = subfolder.name;
  }

  disableEditing(document: any): void {
    if (document.editing && document.title !== document.newName) {

      this.documentService.update(document.id, { title: document.newName })
        .subscribe(updatedDocument => {
          this.refresh();
        });
    }
    document.editing = false;
  }

  cellClick(document: any): void {
    if (!document.editing) {
      this.loadById(document);
    }
  }
  propertiesDocument(value: Document): void {
    const documentId = value.id;
    this.documentService.update(documentId, value).subscribe(
      (data) => {
        this.document = data;
        this.visibleUpdateDocument = true;

      },
      (error) => {
        console.error('Erro ao obter a lista de versões', error);
      }
    );
  }
}
