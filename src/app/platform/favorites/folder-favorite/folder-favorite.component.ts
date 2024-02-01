import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { Folder } from 'src/app/common/folder';
import { FolderService } from 'src/app/services/folder.service';
import { HeaderService } from 'src/app/services/header.service';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/common/review';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder-favorite',
  standalone: true,
  imports: [CommonModule, DividerModule, ToastModule, ToolbarModule, SharedModule, RippleModule, StyleClassModule, ButtonModule, FileUploadModule, TableModule, FormsModule],
  templateUrl: './folder-favorite.component.html',
  styleUrls: ['./folder-favorite.component.scss']
})
export class FolderFavoriteComponent {

  selected!: Review[] | null;
  folderId!: number;
  reviews: Review[] = [];

  constructor(
    private folderService: FolderService,
    private headerService: HeaderService,
    private reviewService: ReviewService,
    private route: ActivatedRoute
    ) { }
    ngOnInit(): void {
      this.headerService.setHeaderForSite(false);

      this.route.params.subscribe(params => {
        this.folderId = params['id'];
          this.getFolderList();
      });
    }

  getFolderList(): void {
    this.reviewService.listByFolderId(this.folderId).subscribe(
      (reviews: Review[]) => {
        this.reviews = reviews;      },
      (error) => {
        console.error('Erro ao obter avaliações por folderId', error);
      }
    );
  }

  onFavoriteProductsChanged(folder: Folder): void {
    this.folderService.toggleFavorite(folder).subscribe(
      () => this.getFolderList()
    );
  }
}


