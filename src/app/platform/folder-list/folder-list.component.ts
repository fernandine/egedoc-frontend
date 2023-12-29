import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Document } from 'src/app/common/document';
import { Folder } from 'src/app/common/folder';
import { DocumentService } from 'src/app/services/document.service';
import { FolderService } from 'src/app/services/folder.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent {

  productDialog: boolean = false;
  folders: Folder[] = [];
  folder!: Folder;
  selected!: Folder[] | null;
  submitted: boolean = false;

  newFolderName: string = '';

  constructor(
    private folderService: FolderService,
    private documentService: DocumentService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadFolders();
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
      review: [],
      subFolders: [],
    };

    this.folderService.create(newFolderData).subscribe(
      (createdFolder) => {

          this.folder = createdFolder;
          this.loadFolders();

      },
      (error) => {
        console.error('Erro ao criar pasta:', error);
      }
    );
  }

  loadFolders(page: number = 0, size: number = 10) {
    this.folderService.listParentfolder(page, size).subscribe((data) => {
      this.folders = data.content.flat();
      this.updateFolderDocumentCount();
    });
  }

  updateFolderDocumentCount() {
    for (const folder of this.folders) {
      this.documentService.getDocumentCountByFolder(folder.id).subscribe((count) => {
        folder.documentCount = count;
      });
    }
  }

  deleteFolder(folder: Folder): void {
    this.folderService.delete(folder.id).subscribe(
      () => {
        this.notificationService.success('Pasta excluída com sucesso');
        this.loadFolders();
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
