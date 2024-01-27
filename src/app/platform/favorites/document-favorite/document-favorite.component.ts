import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Document } from 'src/app/common/document';
import { DocumentService } from 'src/app/services/document.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-document-favorite',
  standalone: true,
  imports: [CommonModule, DividerModule, ToastModule, ToolbarModule, SharedModule, RippleModule, StyleClassModule, ButtonModule, FileUploadModule, TableModule, FormsModule],
  templateUrl: './document-favorite.component.html',
  styleUrls: ['./document-favorite.component.scss']
})
export class DocumentFavoriteComponent {

  likedDocuments: Document[] = [];
  selected!: Document[] | null;

  constructor(
    private documentService: DocumentService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerService.setHeaderForSite(false);
    this.getDocumentList();
  }

  getDocumentList(): void {
    this.documentService.findByFavorite(true).subscribe(
      likedDocuments => this.likedDocuments = likedDocuments
    );
  }

  onFavoriteProductsChanged(document: Document): void {
    this.documentService.toggleFavorite(document).subscribe(
      () => this.getDocumentList()
    );
  }
}



