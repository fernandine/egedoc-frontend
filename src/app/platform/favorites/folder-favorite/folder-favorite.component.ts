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

@Component({
  selector: 'app-folder-favorite',
  standalone: true,
  imports: [CommonModule, DividerModule, ToastModule, ToolbarModule, SharedModule, RippleModule, StyleClassModule, ButtonModule, FileUploadModule, TableModule, FormsModule],
  templateUrl: './folder-favorite.component.html',
  styleUrls: ['./folder-favorite.component.scss']
})
export class FolderFavoriteComponent {

  likedFolders: Folder[] = [];
  selected!: Folder[] | null;

  constructor(
    private folderService: FolderService,
    private headerService: HeaderService
    ) { }

  ngOnInit(): void {
    this.headerService.setHeaderForSite(false);

    this.getFolderList();
  }

  getFolderList(): void {
    this.folderService.findByFavorite(true).subscribe(
      likedFolders => this.likedFolders = likedFolders
    );
  }

  onFavoriteProductsChanged(folder: Folder): void {
    this.folderService.toggleFavorite(folder).subscribe(
      () => this.getFolderList()
    );
  }
}


