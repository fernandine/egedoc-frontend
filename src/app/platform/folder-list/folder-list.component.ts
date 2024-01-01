import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable, catchError, of, tap } from 'rxjs';
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
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent {
  folders: Folder[] = [];
  folders$: Observable<Page> | null = null;
  first = 0;
  rows = 10;
  parentId!: number;
  folder!: Folder;
  selected!: Folder[] | null;
  breadcrumbItems: MenuItem[] = [];

  constructor(
    private folderService: FolderService,
    private documentService: DocumentService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh(pageEvent: PageEvent = {
    pageCount: 0, first: 0, rows: 10,
    page: 0
  }) {
    this.folders$ = this.folderService.listParentfolder(pageEvent.first, pageEvent.rows)
      .pipe(
        tap(() => {

          this.first = pageEvent.first;
          this.rows = pageEvent.rows;
        }),
        catchError(() => {
          this.notificationService.error('Error loading folders');
          return of({ folders: [], totalElements: 0 } as Page );
        })
      );
  }

  onClickCreateFolder(): void {
    const newFolderData = {
      id: 0,
      name: 'Nova Pasta',
      creationDate: new Date(),
      code: '',
      favorite: false,
      folderLike: false,
      approver: '',
      responsible: '',
      reviews: [],
      subFolders: [],
      parentId: this.parentId,
      documents: [],
      documentCount: '',
      parentFolderName: ''
    };
    this.folderService.create(newFolderData).subscribe(
      (createdFolder) => {
          this.folder = createdFolder;
          this.refresh();
      },
      (error) => {
        console.error('Erro ao criar pasta:', error);
      }
    );
  }

  updateFolderDocumentCount() {
    for (const folder of this.folders) {
      this.documentService.getDocumentCountByFolder(folder.id).subscribe((count) => {
        folder.documentCount = count;
      });
    }
  }

  loadById(folder: Folder): void {
    if (folder.id !== undefined) {
      this.folderService.loadById(folder.id).subscribe((loadedFolder) => {
        console.log('Detalhes da pasta carregados:', loadedFolder);

        this.router.navigate(['folders', folder.id]);
      });
    } else {
      console.error('Folder id is undefined.');
    }
  }

  enableEditing(subfolder: any): void {
    subfolder.editing = true;
    subfolder.newName = subfolder.name;
  }

  disableEditing(subfolder: any): void {
    if (subfolder.editing && subfolder.name !== subfolder.newName) {

      this.folderService.update(subfolder.id, { name: subfolder.newName })
        .subscribe(() => {
          this.refresh();
        });
    }

    subfolder.editing = false;
  }

  cellClick(subfolder: any): void {
    if (!subfolder.editing) {
      this.loadById(subfolder);
    }
  }

  deleteFolder(folder: Folder): void {
    this.folderService.delete(folder.id).subscribe(
      () => {
        this.notificationService.success('Pasta excluída com sucesso');
        this.refresh();
      },
      (error) => {
        this.notificationService.error('Erro ao excluir a pasta');
      }
    );
  }

  deleteSelectedFolders() {
    if (this.selected && this.selected.length > 0) {
      for (const folder of this.selected) {
        this.deleteFolder(folder);
      }
      this.selected = [];
    }
  }
}
