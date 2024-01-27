import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { catchError, throwError } from 'rxjs';
import { Document } from 'src/app/common/document';
import { Folder } from 'src/app/common/folder';
import { Review } from 'src/app/common/review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, InputTextareaModule, DialogModule, ButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input() showDialog!: boolean;
  @Input() selectedItem: Folder | Document | null = null;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      comment: [''],
      documentId: [this.getDocumentId()],
      folderId: [this.getFolderId()],
    });
  }

  getDocumentId(): number {
    return this.selectedItem && this.isDocument(this.selectedItem) ? this.selectedItem.id : 0;
  }

  getFolderId(): number {
    return this.selectedItem && this.isFolder(this.selectedItem) ? this.selectedItem.id : 0;
  }

  isDocument(item: Folder | Document): item is Document {
    return !('subFolders' in item);
  }

  isFolder(item: Folder | Document): item is Folder {
    return 'subFolders' in item;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const comment = this.form.get('comment')?.value;
      const review: Review = {
        id: 0,
        comment,
        documentId: this.getDocumentId(),
        folderId: this.getFolderId(),
      };

      this.reviewService.create(review)
        .pipe(
          catchError((error) => throwError(error))
        )
        .subscribe(response => {
          console.log('Comentário criado com sucesso', response);
          this.showDialog = false;
        });
    }
  }
}
