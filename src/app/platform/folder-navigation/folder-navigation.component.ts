import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Document } from 'src/app/common/document';
import { Folder } from 'src/app/common/folder';
import { Role } from 'src/app/common/role';
import { User } from 'src/app/common/user';
import { Version } from 'src/app/common/version';
import { DocumentService } from 'src/app/services/document.service';
import { FolderService } from 'src/app/services/folder.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-folder-navigation',
  templateUrl: './folder-navigation.component.html',
  styleUrls: ['./folder-navigation.component.scss']
})
export class FolderNavigationComponent {
  documents: Document[] = [];
  visibleUser: boolean = false;
  visibleUpdateDocument: boolean = false;
  folder!: Folder;
  document!: Document;
  selected: Folder[] = [];
  submitted: boolean = false;
  items!: MenuItem[];
  versions: Version[] = [];
  subFolders: Folder[] = [];
  users: User[] = [];
  parentId!: number;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private folderService: FolderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const parentIdParam = this.route.snapshot.params['id'];

    if (parentIdParam !== undefined) {
      this.parentId = +parentIdParam;
      this.loadSubFolders(this.parentId);
    } else {
      console.error('ParentId not found in route parameters.');
    }
  }

  onClickCreateSubFolder(): void {
    const newSubFolder: Folder = {
      name: 'Nova Subpasta',
      creationDate: new Date(),
      code: '',
      favorite: false,
      folderLike: false,
      approver: '',
      responsible: '',
      review: [],
      subFolders: [],
      parentId: this.parentId,
      id: 0
    };
    console.log('Novo Subfolder:', newSubFolder);

    this.folderService.create(newSubFolder).subscribe((createdFolder) => {
      this.folder = createdFolder;
      this.loadSubFolders(this.parentId);

    },
      (error) => {
        console.error('Erro ao criar pasta:', error);
      });
  }

  loadSubFolders(parentId: number, page: number = 0, size: number = 10) {
    this.folderService.listSubfolders(parentId, page, size).subscribe((data) => {
      this.subFolders = data.content.flat();
      this.updateFolderDocumentCount();
    });
  }

  loadById(subfolders: Folder): void {
    if (subfolders.id !== undefined) {
      this.folderService.loadById(subfolders.id).subscribe((loadedFolder) => {
        console.log('Detalhes da pasta carregados:', loadedFolder);

        this.router.navigate(['folders', subfolders.id]);
      });
    } else {
      console.error('Folder id is undefined.');
    }
  }

  showUpdateDialog(value: Document): void {
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
          this.refreshDocumentList();
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

  refreshDocumentList(page: number = 0, size: number = 10): void {
    this.documentService.list(page, size).subscribe(
      (data) => {
        this.documents = data.content.flat();
      },
      (error) => {
        console.error('Erro ao obter a lista de documentos', error);
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
        this.loadSubFolders(this.parentId);
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

