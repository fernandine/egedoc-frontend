import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable, catchError, of, tap } from 'rxjs';
import { Document } from 'src/app/common/document';
import { Folder } from 'src/app/common/folder';
import { Page } from 'src/app/common/page';
import { User } from 'src/app/common/user';
import { Version } from 'src/app/common/version';
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
  selector: 'app-folder-navigation',
  templateUrl: './folder-navigation.component.html',
  styleUrls: ['./folder-navigation.component.scss']
})
export class FolderNavigationComponent {
  subfolders$: Observable<Page> | null = null;
  subFolders: Folder[] = [];
  first = 0;
  rows = 10;

  documents: Document[] = [];
  visibleUser: boolean = false;
  visibleUpdateDocument: boolean = false;
  folder!: Folder;
  document!: Document;
  selected!: Folder[] | null;
  submitted: boolean = false;
  items!: MenuItem[];
  versions: Version[] = [];
  users: User[] = [];
  parentId!: number;
  breadcrumbItems: MenuItem[] = [];

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private folderService: FolderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const parentIdParam = params['id'];
      if (parentIdParam !== undefined) {
        this.parentId = +parentIdParam;
        this.refresh(this.parentId);
      } else {
        console.error('ParentId not found in route parameters.');
      }
    });
  }

  refresh(parentId: number, pageEvent: PageEvent = {
    pageCount: 0, first: 0, rows: 10,
    page: 0
  }) {
    this.subfolders$ = this.folderService.listSubfolders(parentId, pageEvent.first, pageEvent.rows)
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

  onClickCreateSubFolder(): void {
    const newSubFolder: Folder = {
      id: 0,
      name: 'Nova subpasta',
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

    this.folderService.create(newSubFolder).subscribe(
      (createdFolder) => {
        this.subFolders.push(createdFolder);
        this.refresh(this.parentId);
      },
      (error) => {
        console.error('Erro ao criar pasta:', error);
      }
    );
  }

  loadById(folder: Folder): void {
    if (folder.id !== undefined) {
      this.folderService.loadById(folder.id).subscribe(() => {
          this.router.navigate(['folders', folder.id]);
      });
    } else {
      console.error('Folder id is undefined.');
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

  enableEditing(subfolder: any): void {
    subfolder.editing = true;
    subfolder.newName = subfolder.name;
  }

  disableEditing(subfolder: any): void {
    if (subfolder.editing && subfolder.name !== subfolder.newName) {

      this.folderService.update(subfolder.id, { name: subfolder.newName })
        .subscribe(updatedFolder => {
          this.refresh(this.parentId);
        });
    }
    subfolder.editing = false;
  }

  cellClick(subfolder: any): void {
    if (!subfolder.editing) {
      this.loadById(subfolder);
    }
  }

  onDragOver(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent, folder: Folder): void {
    const folderId = folder.id;

    event.preventDefault();
    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      const file = files[0];
      this.documentService.uploadFile(file, folderId).subscribe(
        (updatedDocuments) => {
          console.log('Upload bem-sucedido', updatedDocuments);
          //this.refreshDocumentList();
        },
        (error) => {
          console.error('Erro durante o upload', error);
        }
      );
    }
  }

  onFileInputChange(event: any, folder: Folder) {
    const folderId = folder.id;
    const file = event.target.files[0];
    this.documentService.uploadFile(file, folderId).subscribe(
      (documents: Document) => {
        console.log('Upload bem-sucedido', documents);
      },
      (error) => {
        console.error('Erro ao fazer upload do arquivo', error);
      }
    );
  }


  showAccessList(document: Document): void {
    const documentId = document.id;

    this.documentService.getAccessedUsers(documentId)
      .subscribe(users => {
        this.users = users;
        this.visibleUser = true;
      });
  }

  updateFolderDocumentCount() {
    for (const folder of this.subFolders) {
      this.documentService.getDocumentCountByFolder(folder.id).subscribe((count) => {
        folder.documentCount = count;
      });
    }
  }

  deleteFolder(folder: Folder): void {

    this.folderService.delete(folder.id).subscribe(
      () => {
        this.notificationService.success('Pasta excluída com sucesso');
        this.refresh(this.parentId);
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

