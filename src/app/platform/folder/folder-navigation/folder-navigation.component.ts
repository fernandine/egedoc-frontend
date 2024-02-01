import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule, MessageService, Message } from 'primeng/api';
import { Document } from 'src/app/common/document';
import { Folder } from 'src/app/common/folder';

import { DocumentService } from 'src/app/services/document.service';
import { FolderService } from 'src/app/services/folder.service';
import { HeaderService } from 'src/app/services/header.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, AsyncPipe, DatePipe, CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";
import { BadgeModule } from 'primeng/badge';
import { CommentsComponent } from '../../comments-dialog/comments.component';
import { SelectionService } from 'src/app/services/selection.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { FileTypesService } from 'src/app/services/file-types.service';

@Component({
  selector: 'app-folder-navigation',
  templateUrl: './folder-navigation.component.html',
  styleUrls: ['./folder-navigation.component.scss'],
  standalone: true,
  providers: [MessageService],
  imports: [
    CommonModule,
    ToolbarModule,
    FileUploadModule,
    ProgressBarModule,
    SharedModule,
    RippleModule,
    StyleClassModule,
    BadgeModule,
    ButtonModule,
    TableModule,
    ToastModule,
    NgIf,
    FormsModule,
    NgFor,
    AsyncPipe,
    DatePipe,
    BreadcrumbComponent,
    CommentsComponent
  ]
})
export class FolderNavigationComponent {

  progress: number = 0;
  showCommentsDialog = false;
  someDocumentId: number | null = null;
  itemLike: boolean = false;
  favorite: boolean = false;
  subFolders: Folder[] = [];
  first = 0;
  rows = 10;
  selectedItem: Folder | Document | null = null;
  documents: Document[] = [];
  folder!: Folder;
  url: string = '';

  document!: Document;
  folderId!: number;
  documentId: number | null = null;
  selectedItems: (Folder | Document)[] = [];
  isDragging = false;
  parentId!: number;

  constructor(
    public documentService: DocumentService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private folderService: FolderService,
    private router: Router,
    private headerService: HeaderService,
    private selectionService: SelectionService,
  ) { }

  ngOnInit(): void {
    this.headerService.setHeaderForSite(false);
    this.route.params.subscribe(params => {
      this.folderId = params['id'];
      this.loadFolderDetails();
    });
  }

  updateUrl(): string {
    return this.url = 'http://localhost:8080/documents/' + this.folderId + '/upload';
  }

  openReviewDialog(item: Folder | Document): void {
    this.selectedItem = item;
    this.showCommentsDialog = true;
  }

  getItemsToDisplay(): (Folder | Document)[] {
    return this.folder ? [...this.folder.subFolders, ...(this.folder.documents || [])] : [];
  }

  loadFolderDetails() {
    this.folderService.loadById(this.folderId).subscribe(
      (folder: Folder) => {
        this.folder = folder;
        this.subFolders = folder.subFolders;
        this.documents = folder.documents;
        this.updateFolderDocumentCount();

      },
      (error) => {
        console.error('Erro ao carregar detalhes da pasta:', error);
      }
    );
  }

  navigateToItem(item: Folder | Document): void {
    if (this.isFolder(item)) {
      this.selectionService.setSelectedFolder(item);
      this.navigateTosubFolder(item);
    } else if (this.isDocument(item)) {
      this.selectionService.setSelectedDocument(item);
      this.navigateToDocument(item);

    }
  }

  navigateTosubFolder(folder: Folder): void {
    if (!folder.editing) {
      this.router.navigate(['../', folder.id], { relativeTo: this.route });
    }
  }
  navigateToDocument(document: Document): void {
      this.router.navigate(['documents', document.id]);
  }

openDocumentInViewer(item: Document): void {
  if (!item.editing) {
    const documentUrl = item.fileUris[0];
    const allowedExtensions = ['.pdf', '.txt', '.pptx', '.docx', '.xlsx', '.mp4', '.mov', '.mp3', '.wav', '.jpg'];
    const hasAllowedExtension = allowedExtensions.some(extension => documentUrl && documentUrl.endsWith(extension));

    if (hasAllowedExtension) {
      if (FileTypesService.isVideoFile(documentUrl)) {
        window.open(documentUrl, '_blank');
      } else if (FileTypesService.isAudioFile(documentUrl)) {
        window.open(documentUrl, '_blank');
      } else if (FileTypesService.isImageFile(documentUrl)) {
        window.open(documentUrl, '_blank');
      } else {
        const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(documentUrl)}`;
        window.open(viewerUrl, '_blank');
      }
    } else {
      console.error('Extensão de arquivo não suportada:', documentUrl);
      this.messageService.add({ severity: 'error', summary: 'Extensão de arquivo não suportada!' });
    }
  }
}

  onClickCreateFolder(): void {
    const newFolderData = {
      id: 0,
      name: 'Nova Subpasta',
      creationDate: new Date(),
      code: '',
      favorite: false,
      itemLike: false,
      approver: '',
      responsible: '',
      reviews: [],
      subFolders: [],
      fullPath: '',
      parentId: this.folderId,
      documents: [],
      documentCount: '',
      parentFolderName: '',

    };
    this.folderService.create(newFolderData).subscribe(
      (createdFolder: Folder) => {
        console.log('Subpasta criada com sucesso:', createdFolder);
        if (this.folder && this.folder.subFolders) {
          this.folder.subFolders.length = 0;
          this.folder.subFolders.push(createdFolder);
          this.loadFolderDetails();

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

  onUpload(event: UploadEvent): void {
    this.progress = 0;
    const interval = setInterval(() => {
      this.progress += 80;
      if (this.progress >= 100) {
        clearInterval(interval);
        this.loadFolderDetails();
      }
    }, 1000);
  }


  deleteItem(item: Folder | Document): void {
    if (this.isFolder(item)) {
      this.folderService.deleteFolder(item.id).subscribe(
        () => {
          console.log('Pasta deletada com sucesso!');
          this.loadFolderDetails();
        },
        (error) => {
          console.error('Erro ao deletar pasta:', error);
        }
      );
    } else if (this.isDocument(item)) {
      this.documentService.deleteDocument(item.id).subscribe(
        () => {
          console.log('Documento deletado com sucesso!');

          this.loadFolderDetails();
        },
        (error) => {
          console.error('Erro ao deletar documento:', error);
        }
      );
    }
  }
  isFolder(item: Folder | Document): item is Folder {
    return 'subFolders' in item;
  }

  isDocument(item: Folder | Document): item is Document {
    return !('subFolders' in item);
  }

  isFavorite(item: Folder | Document): boolean {
    return item.favorite;
  }

  deleteSelectedItems() {
    if (this.selectedItems && this.selectedItems.length > 0) {
      for (const item of this.selectedItems) {
        this.deleteItem(item);
      }
      this.selectedItems = [];
    }
  }

  updateFolderDocumentCount() {
    for (const folder of this.subFolders) {
      this.documentService.getDocumentCountByFolder(folder.id).subscribe((count) => {
        folder.documentCount = count;
      });
    }
  }

  toggleLike(item: Folder | Document) {
    item.itemLike = !item.itemLike;
    this.updateItem(item, { itemLike: item.itemLike });
  }

  toggleFavorite(item: Folder | Document) {
    item.favorite = !item.favorite;
    this.updateItem(item, { favorite: item.favorite });
    this.messageService.add({ severity: 'info', summary: 'Favoritado!' });
  }

  updateItem(item: Folder | Document, updatedProperties: any) {
    const updatedItem = { ...item, ...updatedProperties };
    if (this.isDocument(item)) {
      this.documentService.update(item.id, updatedItem).subscribe(
        (updatedDocument: Document) => {
        },
        (error) => {
          console.error('Erro ao atualizar o documento:', error);
        }
      );
    } else if (this.isFolder(item)) {
      this.folderService.update(item.id, updatedItem).subscribe(
        (updatedFolder: Folder) => {
        },
        (error) => {
          console.error('Erro ao atualizar a pasta:', error);
        }
      );
    }
  }


}

