import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SharedModule } from 'primeng/api';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Folder } from 'src/app/common/folder';
import { Page } from 'src/app/common/page';
import { DocumentService } from 'src/app/services/document.service';
import { FolderService } from 'src/app/services/folder.service';
import { HeaderService } from 'src/app/services/header.service';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { NgIf, AsyncPipe, DatePipe, CommonModule } from '@angular/common';
import { HeaderPlatformComponent } from 'src/app/shared/layout/header-platform/header-platform.component';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
    selector: 'app-folder-list',
    templateUrl: './folder-list.component.html',
    styleUrls: ['./folder-list.component.scss'],
    standalone: true,
    imports: [CommonModule, NgIf, ToastModule, ToolbarModule, SharedModule, RippleModule, StyleClassModule, ButtonModule, FileUploadModule, TableModule, FormsModule, AsyncPipe, DatePipe, HeaderPlatformComponent]
})
export class FolderListComponent {
  @Output() favoriteFolderChanged = new EventEmitter<Folder>();

  folders: Folder[] = [];
  folders$: Observable<Page> | null = null;
  first = 0;
  rows = 10;
  parentId!: number;
  folder!: Folder;
  selected!: Folder[] | null;
  folderId!: number;

  constructor(
    private folderService: FolderService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private documentService: DocumentService,
    private message: MessageService
  ) { }

  ngOnInit() {
    this.headerService.setHeaderForSite(false);
    this.route.paramMap.subscribe(params => {
      const folderId = params.get('id');

      if (folderId) {
        this.folderId = this.folder.id;
        this.loadById(this.folder);
      }
    });
    this.refresh();
  }

  refresh(pageEvent: PageEvent = {
    pageCount: 0, first: 0, rows: 10,
    page: 0
  }) {
    if (!this.folders$) {
      this.folders$ = this.folderService.listParentfolder(pageEvent.first, pageEvent.rows)
        .pipe(
          tap((page) => {
            this.first = pageEvent.first;
            this.rows = pageEvent.rows;
            this.folders = page.folders;

            this.updateFolderDocumentCount();
          }),
          catchError(() => {
            this.message.add({ severity: 'error', summary: 'Erro ao carregar a pasta.' });
            return of({ folders: [], totalElements: 0 } as Page);
          })
        );
    }
  }

  loadById(folder: Folder): void {
    if (folder.id !== undefined) {
      this.folderService.loadById(folder.id).subscribe(() => {
        this.router.navigate(['/folders', folder.id], { relativeTo: this.route });
      });
    } else {
      console.error('Folder id is undefined.');
    }
  }

  onClickCreateFolder(): void {
    const newFolderData = {
      id: 0,
      name: 'Nova Pasta',
      creationDate: new Date(),
      code: '',
      favorite: false,
      itemLike: false,
      approver: '',
      responsible: '',
      reviews: [],
      subFolders: [],
      parentId: this.parentId,
      documents: [],
      documentCount: '',
      parentFolderName: '',
      fullPath: ''
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

  enableEditing(subFolder: any): void {
    subFolder.editing = true;
    subFolder.newName = subFolder.name;

  }

  disableEditing(subFolder: any): void {
    if (subFolder.editing && subFolder.name !== subFolder.newName) {
      this.folderService.update(subFolder.id, { name: subFolder.newName })
        .subscribe(() => {
          this.refresh();
        });
    }

    subFolder.editing = false;
  }

  cellClick(subFolder: any): void {
    if (!subFolder.editing) {
      this.loadById(subFolder);
    }
  }

  deleteFolder(folder: Folder): void {
    this.folderService.deleteFolder(folder.id).subscribe(
      () => {
        this.message.add({ severity: 'success', summary: 'Pasta excluída com sucesso' });
        if (this.folders$) {
          this.folders$ = this.folders$.pipe(
            map((page) => {
              const updatedFolders = page.folders.filter(f => f.id !== folder.id);
              return { ...page, folders: updatedFolders };
            })
          );
        }
      },
      () => {
        this.message.add({ severity: 'error', summary: 'Erro ao excluir a pasta' });
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

  toggleFavorite(folder: Folder): void {
    this.folderService.toggleFavorite(folder).subscribe(
      updatedFolder => this.favoriteFolderChanged.emit(updatedFolder)
    );
  }

  isFavorite(folder: Folder): boolean {
    return folder.favorite;
  }

}
