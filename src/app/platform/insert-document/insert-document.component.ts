import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';

export interface FileItem {
  name: string;
  size: number;
}

@Component({
  selector: 'app-insert-document',
  templateUrl: './insert-document.component.html',
  styleUrls: ['./insert-document.component.scss']
})
export class InsertDocumentComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  dataSource: FileItem[] = [];
  displayedColumns: string[] = ['arquivo', 'tamanho'];
  folderId: string = '';

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
    ) {}


  ngOnInit(): void {
    this.folderId = this.route.snapshot.paramMap.get('folderId') || '';
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
        (response) => {
          console.log('Upload bem-sucedido', response);
          this.router.navigate(['/documento-lista']);
        },
        (error) => {
          console.error('Erro durante o upload', error);
        }
  )}

  }
  formatFileSize(size: number): string {
    const kilobytes = size / 1024;
    return kilobytes.toFixed(2) + ' KB';
  }

  onFileInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files && files.length > 0) {
      const file = files[0];

      this.documentService.uploadFile(file, this.folderId).subscribe(
        (response) => {
          console.log('Upload bem-sucedido', response);
          //this.router.navigate(['/documento-lista']);
        },
        (error) => {
          console.error('Erro durante o upload', error);
        }
      );
    }

    inputElement.value = '';
  }

}




  // @Output() addDocumentEvent = new EventEmitter<void>();

  // productDialog: boolean = false;

  // documents: Document[] = [];

  // document!: Document;

  // selected!: Document[] | null;

  // submitted: boolean = false;

  // statuses!: any[];

  // constructor(
  //   private documentService: DocumentService,
  //   private messageService: MessageService,
  //   private confirmationService: ConfirmationService
  //   ) { }

  // ngOnInit() {
  //   this.loadDocuments();
  // }

  // loadDocuments(page: number = 0, size: number = 10) {
  //   this.documentService.list(page, size).subscribe((data) => {
  //     this.documents = data.content.flat();
  //   });
  // }

  // onClickAddDocument(): void {
  //   this.addDocumentEvent.emit();
  // }

  // openNew() {
  //   //this.folder = {};
  //   this.submitted = false;
  //   this.productDialog = true;
  // }

  // deleteSelectedDocuments() {
  //   this.confirmationService.confirm({
  //     message: 'Você tem certeza que deseja cancelar esta pasta?',
  //     header: 'Confirmar',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.documents = this.documents.filter((val) => !this.selected?.includes(val));
  //       this.selected = null;
  //       this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
  //     }
  //   });
  // }

  // editProduct(document: Document) {
  //   this.document = { ...document };
  //   this.productDialog = true;
  // }

  // deleteProduct(document: Document) {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete ' + document.title + '?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.documents = this.documents.filter((val) => val.id !== document.id);
  //       //this.document = {};
  //       this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
  //     }
  //   });
  // }

  // hideDialog() {
  //   this.productDialog = false;
  //   this.submitted = false;
  // }
  // onFileSelect(event: any): void {
  //   const files: File[] = event.files;

  // }
  // onFileDrop(event: any): void {
  //   event.preventDefault();
  //   const files = event.dataTransfer?.files;

  //   if (files && files.length > 0) {
  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];
        // Handle the file upload logic here
        // For example:
        // this.documentService.uploadFile(file).subscribe((response) => {
        //   // Handle the response as needed
        //   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'File Uploaded', life: 3000 });
        // });
  //     }
  //   }
  // }
  // saveProduct() {
  //   this.submitted = true;

  //   if (this.document.title?.trim()) {
  //     if (this.document.id) {
  //       this.documents[this.findIndexById(this.document.id)] = this.document;
  //       this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
  //     } else {
  //       this.documents.push(this.document);
  //       this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
  //     }

  //     this.documents = [...this.documents];
  //     this.productDialog = false;
  //     //this.document = {};
  //   }
  // }

  // findIndexById(id: string): number {
  //   let index = -1;
  //   for (let i = 0; i < this.documents.length; i++) {
  //     if (this.documents[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }

  //   return index;
  // }

