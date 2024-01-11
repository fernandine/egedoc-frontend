import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, SharedModule } from 'primeng/api';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Document } from 'src/app/common/document';
import { DocumentPage } from 'src/app/common/document-page';
import { Folder } from 'src/app/common/folder';
import { Page } from 'src/app/common/page';
import { User } from 'src/app/common/user';
import { Version } from 'src/app/common/version';
import { DocumentService } from 'src/app/services/document.service';
import { FolderService } from 'src/app/services/folder.service';
import { HeaderService } from 'src/app/services/header.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
    selector: 'app-folder-navigation',
    templateUrl: './folder-navigation.component.html',
    styleUrls: ['./folder-navigation.component.scss'],
    standalone: true,
    imports: [ToolbarModule, SharedModule, RippleModule, StyleClassModule, ButtonModule, FileUploadModule, TableModule, NgIf, FormsModule, NgFor, AsyncPipe, DatePipe]
})
export class FolderNavigationComponent {

  subFolders$: Observable<Page> | null = null;
  documents$: Observable<DocumentPage> | null = null;
  folderItems: (Folder | Document)[] = [];

  subFolders: Folder[] = [];
  first = 0;
  rows = 10;

  documents: Document[] = [];
  visibleUser: boolean = false;
  visibleUpdateDocument: boolean = false;
  folder!: Folder;
  document!: Document;
  selectedFolder: Folder[] | null = null;
  selectedDocument: Document[] | null = null;
  submitted: boolean = false;
  items!: MenuItem[];
  versions: Version[] = [];
  users: User[] = [];
  parentId!: number;
  breadcrumbItems: MenuItem[] = [];
  isFolderEmpty: boolean = true;
  folderId!: number;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private folderService: FolderService,
    private router: Router,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerService.setHeaderForSite(false);

    this.route.params.subscribe(params => {
      this.folderId = +params['id'];
      this.loadFolderDetails();
    });
  }

  loadFolderDetails() {
    this.folderService.loadById(this.folderId).subscribe(
      (folder: Folder) => {
        this.folder = folder;
        this.getDocumentByFolderId(folder.id);
      },
      (error) => {
        console.error('Erro ao carregar detalhes da pasta:', error);
      }
    );
  }

  getDocumentByFolderId(folderId: number, pageEvent: PageEvent = {
    pageCount: 0, first: 0, rows: 10,
    page: 0
  }) {
    this.documents$ = this.documentService.listDocumentByFolderId(folderId, pageEvent.first, pageEvent.rows)
      .pipe(
        tap((page) => {
          this.first = pageEvent.first;
          this.rows = pageEvent.rows;
          this.isFolderEmpty = page.totalElements === 0;

        }),
        catchError(() => {
          this.notificationService.error('Error loading folders');
          return of({ documents: [], totalElements: 0 } as DocumentPage);
        })
      );
  }

  navigateTosubFolder(subFolderId: number, folder: any): void {
    if (!folder.editing) {
      this.router.navigate(['/folders', subFolderId]);
    }
  }

  onClickCreateFolder(): void {
    const newFolderData = {
      id: 0,
      name: 'Nova Subpasta',
      creationDate: new Date(),
      code: '',
      favorite: false,
      folderLike: false,
      approver: '',
      responsible: '',
      reviews: [],
      subFolders: [],
      parentId: this.folderId,
      documents: [],
      documentCount: '',
      parentFolderName: ''
    };
    this.folderService.create(newFolderData).subscribe(
      (createdFolder: Folder) => {
        console.log('Subpasta criada com sucesso:', createdFolder);
        if (this.folder && this.folder.subFolders) {
          this.folder.subFolders.length = 0;
          this.folder.subFolders.push(createdFolder);
        }
      },
      (error) => {
        console.error('Erro ao criar subpasta:', error);
      }
    );
  }

  enableEditing(subFolder: any): void {
    subFolder.editing = true;
    subFolder.newName = subFolder.name;
  }

  disableEditing(subFolder: any): void {
    if (subFolder.editing && subFolder.name !== subFolder.newName) {

      this.folderService.update(subFolder.id, { name: subFolder.newName })
        .subscribe(updatedFolder => {
          this.loadFolderDetails();
        });
    }
    subFolder.editing = false;
  }

  cellClick(subFolder: any): void {
    if (!subFolder.editing) {
      this.loadFolderDetails();
    }
  }

  onDragOver(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      const file = files[0];
      const folderId = this.folder.id;
      console.log('Dropped file into folder with ID:', folderId);

      this.documentService.uploadFile(file, folderId).subscribe(
        (updatedDocument: Document) => {
          console.log('Upload bem-sucedido', updatedDocument);
            this.getDocumentByFolderId(folderId);
        },
        (error) => {
          console.error('Erro durante o upload', error);
        }
      );
    }
  }

  deleteFolder(folder: Folder): void {
    this.folderService.deleteFolder(folder.id).subscribe(
      () => {
        console.log('Pasta deletada com sucesso!');
        this.loadFolderDetails();
      },
      (error) => {
        console.error('Erro ao deletar pasta:', error);
      }
    );
  }

  deleteSelectedFolders() {
    if (this.selectedFolder && this.selectedFolder.length > 0) {
      for (const folder of this.selectedFolder) {
        this.deleteFolder(folder);
      }
      this.selectedFolder = [];
    }
  }








  // loadById(folder: Folder): void {
  //   if (folder.id !== undefined) {
  //     this.loadFolderById(folder.id);
  //     this.router.navigate(['folders', folder.id]);
  //   } else {
  //     console.error('Folder id is undefined.');
  //   }
  // }

  // refresh(pageEvent: PageEvent = {
  //   pageCount: 0, first: 0, rows: 10,
  //   page: 0
  // }) {
  //   this.subFolders$ = this.folderService.list(pageEvent.first, pageEvent.rows)
  //     .pipe(
  //       tap((page) => {
  //         this.first = pageEvent.first;
  //         this.rows = pageEvent.rows;
  //         this.isFolderEmpty = page.totalElements === 0;

  //       }),
  //       catchError(() => {
  //         this.notificationService.error('Error loading folders');
  //         return of({ folders: [], totalElements: 0 } as Page );
  //       })
  //     );
  // }

  // onClickCreatesubFolder(): void {
  //   const newsubFolder: Folder = {
  //     id: 0,
  //     name: 'Nova subpasta',
  //     creationDate: new Date(),
  //     code: '',
  //     favorite: false,
  //     folderLike: false,
  //     approver: '',
  //     responsible: '',
  //     reviews: [],
  //     subFolders: [],
  //     parentId: this.parentId,
  //     documents: [],
  //     documentCount: '',
  //     parentFolderName: ''
  //   };

  //   this.folderService.create(newsubFolder).subscribe(
  //     (createdFolder) => {
  //       this.subFolders.push(createdFolder);
  //       this.refresh();
  //     },
  //     (error) => {
  //       console.error('Erro ao criar pasta:', error);
  //     }
  //   );
  // }

  // propertiesDocument(value: Document): void {
  //   const documentId = value.id;
  //   this.documentService.update(documentId, value).subscribe(
  //     (data) => {
  //       this.document = data;
  //       this.visibleUpdateDocument = true;

  //     },
  //     (error) => {
  //       console.error('Erro ao obter a lista de versões', error);
  //     }
  //   );
  // }



  // onDragOver(event: Event): void {
  //   event.preventDefault();
  //   event.stopPropagation();
  // }

  // // onDrop(event: DragEvent): void {
  // //   event.preventDefault();
  // //   event.stopPropagation();

  // //   const files = event.dataTransfer?.files;

  // //   if (files && files.length > 0) {
  // //     const file = files[0];
  // //     const folderId = this.folder.id;

  // //     this.documentService.uploadFile(file, folderId).subscribe(
  // //       (updatedDocument: Document) => {
  // //         console.log('Upload bem-sucedido', updatedDocument);
  // //         this.refresh();
  // //       },
  // //       (error) => {
  // //         console.error('Erro durante o upload', error);
  // //       }
  // //     );
  // //   }
  // // }

  // // onFileInputChange(event: any): void {
  // //   const folderId = this.folder.id;
  // //   const file = event.target.files[0];

  // //   this.documentService.uploadFile(file, folderId).subscribe(
  // //     (updatedDocument: Document) => {
  // //       console.log('Upload bem-sucedido', updatedDocument);
  // //       this.refresh();
  // //     },
  // //     (error) => {
  // //       console.error('Erro ao fazer upload do arquivo', error);
  // //     }
  // //   );
  // // }



  // showAccessList(document: Document): void {
  //   const documentId = document.id;

  //   this.documentService.getAccessedUsers(documentId)
  //     .subscribe(users => {
  //       this.users = users;
  //       this.visibleUser = true;
  //     });
  // }

  // updateFolderDocumentCount() {
  //   for (const folder of this.subFolders) {
  //     this.documentService.getDocumentCountByFolder(folder.id).subscribe((count) => {
  //       folder.documentCount = count;
  //     });
  //   }
  // }

  // deleteFolder(folder: Folder): void {
  //   this.folderService.deleteFolder(folder.id).subscribe(
  //     () => {
  //       this.notificationService.success('Pasta excluída com sucesso');
  //       this.refresh();
  //     },
  //     (error) => {
  //       this.notificationService.error('Erro ao excluir a pasta');
  //     }
  //   );
  // }

  // deleteDocument(document: Document): void {
  //   this.documentService.deleteDocument(document.id).subscribe(
  //     () => {
  //       this.notificationService.success('Documento excluído com sucesso');
  //       this.refresh();
  //     },
  //     (error) => {
  //       this.notificationService.error('Erro ao excluir o documento');
  //     }
  //   );
  // }

  // deleteSelectedItems() {
  //   if (this.selectedItems && this.selectedItems.length > 0) {
  //     for (const item of this.selectedItems) {
  //       if ((item as Folder).id !== undefined) {
  //         this.deleteFolder(item as Folder);
  //       } else if ((item as Document).id !== undefined) {
  //         this.deleteDocument(item as Document);
  //       }
  //     }
  //     this.selectedItems = [];
  //   } else {
  //     console.warn('Nenhum documento ou pasta selecionado.');
  //   }
  // }

}

