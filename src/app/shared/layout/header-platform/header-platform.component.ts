import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { Folder } from 'src/app/common/folder';
import { PasteRequest } from 'src/app/common/paste-request';
import { User } from 'src/app/common/user';
import { FolderNavigationComponent } from 'src/app/platform/folder/folder-navigation/folder-navigation.component';
import { SelectionService } from 'src/app/services/selection.service';
import { Document } from '../../../common/document';
import { DocumentService } from '../../../services/document.service';
import { MessageService, PrimeIcons } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-header-platform',
  templateUrl: './header-platform.component.html',
  styleUrls: ['./header-platform.component.scss'],
  standalone: true,
  providers: [MessageService],
  imports: [NgIf, RippleModule, StyleClassModule,SelectButtonModule,FormsModule, ToastModule, InputTextModule, NgFor, FolderNavigationComponent]
})
export class HeaderPlatformComponent {
  users!: User[];
  selectedFolder: Folder| null = null;
  selectedDocument: Document | null = null;
  folderId!: number;
  stateOptions: any[] = [{icon: PrimeIcons.MOON, value: 'off'}, {icon: PrimeIcons.SUN, value: 'on'}];
  value: string = 'off';

  constructor(
    private router: Router,
    private documentService: DocumentService,
    private selectionService: SelectionService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.selectionService.getSelectedFolder().subscribe((folder) => {
      if (folder) {
        this.selectedFolder = folder;
      }
    });

    this.selectionService.getSelectedDocument().subscribe((document) => {
      if (document) {
        this.selectedDocument = document;
      }
    });
  }

  navFolderFavorite() {
    this.router.navigate(['folder-favorite']);
  }
  navDocumentFavorite() {
    this.router.navigate(['document-favorite']);
  }

  copyDocument() {
    if (this.selectedDocument && 'id' in this.selectedDocument && this.selectedDocument.id !== undefined) {
      console.log('Document ID a ser copiado:', this.selectedDocument.id);

      this.documentService.copy(this.selectedDocument.id).subscribe(
        () => {
          this.messageService.add({ severity: 'info', summary: 'Documento copiado' });
        },
        (error) => {
          // Lógica para tratar erros
        }
      );
    } else {
      console.log('Nenhum documento selecionado ou ID indefinido.');
    }
  }

  pasteDocument() {
    if (this.selectedFolder && 'id' in this.selectedFolder && this.selectedFolder.id !== undefined &&
    this.selectedDocument && 'id' in this.selectedDocument && this.selectedDocument.id !== undefined) {
      console.log('Folder ID a ser colado:', this.selectedFolder.id);

      const request: PasteRequest = {
        documentId: this.selectedDocument.id,
        destinationFolderId: this.selectedFolder.id,
      };

      this.documentService.copyAndPasteDocument(request).subscribe(
        () => {
          this.messageService.add({ severity: 'info', summary: 'Documento colado' });
        },
        (error) => {
          // Lógica para tratar erros
        }
      );
    }
  }




  // cut(documentId: number, destinationFolderId: number) {
  //   const request: PasteRequest = { documentId, destinationFolderId };
  //   this.documentService.cutDocument(request).subscribe(
  //     (cutDocument) => {
  //       console.log('Documento recortado:', cutDocument);
  //       // Lógica adicional, se necessário
  //     },
  //     error => {
  //       console.error('Erro ao recortar o documento:', error);
  //     }
  //   );
  // }

}




