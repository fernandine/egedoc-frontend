import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule, MessageService } from 'primeng/api';
import { Document } from 'src/app/common/document';
import { Folder } from 'src/app/common/folder';

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
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";
import { BadgeModule } from 'primeng/badge';
import { CommentsComponent } from '../../comments-dialog/comments.component';
import { Review } from 'src/app/common/review';

@Component({
  selector: 'app-folder-navigation',
  templateUrl: './folder-navigation.component.html',
  styleUrls: ['./folder-navigation.component.scss'],
  standalone: true,
  providers: [MessageService],
  imports: [
    ToolbarModule,
    SharedModule,
     RippleModule,
     StyleClassModule,
     BadgeModule,
     ButtonModule,
     FileUploadModule,
     TableModule,
     NgIf,
     FormsModule,
     NgFor,
     AsyncPipe,
     DatePipe,
     BreadcrumbComponent,
    CommentsComponent]
})
export class FolderNavigationComponent {
  showCommentsDialog = false;
  someDocumentId: number | null = null;
  comment!: string;
  itemLike: boolean = false;
  favorite: boolean = false;
  subFolders: Folder[] = [];
  first = 0;
  rows = 10;
  selectedItem: Folder | Document | null = null;

  documents: Document[] = [];
  folder!: Folder;
  document!: Document;
  folderId!: number;
  selectedItems: (Folder | Document)[] | null = null;
  isDragging = false;
  parentId!: number;
  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private messageService: MessageService,
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

  openCommentsDialog(item: Folder | Document): void {
    this.selectedItem = item;
    this.showCommentsDialog = true;
  }

  getItemsToDisplay() {
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
      this.navigateTosubFolder(item);
    } else if (this.isDocument(item)) {
      this.navigateToDocument(item.id, item);
    }
  }

  navigateTosubFolder(folder: Folder): void {
    if (!folder.editing) {
      this.router.navigate(['../', folder.id], { relativeTo: this.route });
    }
  }

  navigateToDocument(documentId: number, document: Document): void {
    if (!document.editing) {
      this.router.navigate(['/documents', documentId]);
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

  onDragOver(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;

    if (files && files.length >= 0) {
      const file = files[0];
      const folderId = this.folder.id;
      console.log('Dropped file into folder with ID:', folderId);

      this.documentService.uploadFile(file, folderId).subscribe(
        (updatedDocument: Document) => {
          console.log('Upload bem-sucedido', updatedDocument);
          this.loadFolderDetails();
        },
        (error) => {
          console.error('Erro durante o upload', error);
        }
      );
    }
  }

  onDragEnter(): void {
    this.isDragging = true;
  }

  onDragLeave(): void {
    this.isDragging = true;
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
          // Atualize o item na matriz selectedItems se necessário
        },
        (error) => {
          console.error('Erro ao atualizar o documento:', error);
        }
      );
    } else if (this.isFolder(item)) {
      this.folderService.update(item.id, updatedItem).subscribe(
        (updatedFolder: Folder) => {
          // Atualize o item na matriz selectedItems se necessário
        },
        (error) => {
          console.error('Erro ao atualizar a pasta:', error);
        }
      );
    }
  }

}

