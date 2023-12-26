import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Folder } from 'src/app/common/folder';
import { DocumentService } from 'src/app/services/document.service';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent {
  @Output() addDocument: EventEmitter<Folder> = new EventEmitter<Folder>();

  productDialog: boolean = false;

  folders: Folder[] = [];

  folder!: Folder;

  selected!: Folder[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(
    private folderService: FolderService,
    private documentService: DocumentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadFolders();
  }

  onClickAddDocument(folder: Folder): void {
    this.addDocument.emit(folder);
  }

  loadFolders(page: number = 0, size: number = 10) {
    this.folderService.list(page, size).subscribe((data) => {
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



  openNew() {
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedFolders() {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja cancelar esta pasta?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.folders = this.folders.filter((val) => !this.selected?.includes(val));
        this.selected = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  editProduct(folder: Folder) {
    this.folder = { ...folder };
    this.productDialog = true;
  }

  deleteProduct(folder: Folder) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + folder.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.folders = this.folders.filter((val) => val.id !== folder.id);
        //this.folder = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveFolder() {
    this.submitted = true;

    if (this.folder.name?.trim()) {
      if (this.folder.id) {
        this.folders[this.findIndexById(this.folder.id)] = this.folder;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.folders.push(this.folder);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.folders = [...this.folders];
      this.productDialog = false;
      //this.folder = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.folders.length; i++) {
      if (this.folders[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }



}

