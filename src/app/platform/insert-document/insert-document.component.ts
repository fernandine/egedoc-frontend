import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Document } from 'src/app/common/document';
import { DocumentService } from 'src/app/services/document.service';
import { AccessListModalComponent } from '../access-list-modal/access-list-modal.component';

@Component({
  selector: 'app-insert-document',
  templateUrl: './insert-document.component.html',
  styleUrls: ['./insert-document.component.scss']
})
export class InsertDocumentComponent {

  documents: Document[] = [];
  folderId: string = '';
  visible: boolean = false;
  accessListModalComponent!: AccessListModalComponent;
  document!: Document;
  selected!: Document[] | null;
  submitted: boolean = false;
  statuses!: any[];

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private messageService: MessageService,
     private confirmationService: ConfirmationService
    ) {}


  ngOnInit(): void {
    this.folderId = this.route.snapshot.paramMap.get('folderId') || '';
    this.refreshDocumentList(this.folderId);
  }

  openNew() {
    this.submitted = false;
  }

    deleteSelectedDocuments() {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja cancelar esta pasta?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.documents = this.documents.filter((val) => !this.selected?.includes(val));
        this.selected = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  onDragOver(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      const file = files[0];

      this.documentService.uploadFile(file, this.folderId).subscribe(
        (updatedDocuments) => {
          console.log('Upload bem-sucedido', updatedDocuments);
          this.refreshDocumentList(this.folderId);
        },
        (error) => {
          console.error('Erro durante o upload', error);
        }
      );
    }
  }

  onFileInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files && files.length > 0) {
      const file = files[0];

      this.documentService.uploadFile(file, this.folderId).subscribe(
      (response) => {
        console.log('Upload bem-sucedido', response);
        this.refreshDocumentList(this.folderId);
        },
        (error) => {
          console.error('Erro durante o upload', error);
        }
      );
    }
    inputElement.value = '';
  }

  refreshDocumentList(folderId: string, page: number = 0, size: number = 10): void {
    this.documentService.list(folderId, page, size).subscribe(
      (data) => {
        this.documents = data.content.flat();
      },
      (error) => {
        console.error('Erro ao obter a lista de documentos', error);
      }
    );
  }

  showAccessList(document: Document): void {
    const documentId = parseInt(document.id);

    this.documentService.getUsersWhoAccessedDocument(documentId)
      .subscribe(users => {
        this.accessListModalComponent.users = users;
        this.accessListModalComponent.visible = true;
      });
  }


  deleteDocument(document: Document) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + document.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.documentService.delete(document.id).subscribe(() => {
          this.documents = this.documents.filter((val) => val.id !== document.id);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Document Deleted',
            life: 3000
          });
        });
      }
    });
  }
}

