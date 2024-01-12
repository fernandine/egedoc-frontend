import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Tag } from 'primeng/tag';
import { catchError, throwError } from 'rxjs';
import { Confidential } from 'src/app/common/enums/confidential.enum';
import { DocumentType } from 'src/app/common/enums/document-type';
import { DocumentService } from 'src/app/services/document.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { CalendarModule } from 'primeng/calendar';
@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss'],
  standalone: true,
  imports: [InputSwitchModule, CalendarModule, DropdownModule, ChipsModule, FormsModule, ReactiveFormsModule]

})
export class DocumentFormComponent {

  form!: FormGroup;
  availableTags: Tag[] = [];
  types: SelectItem[] = [];
  confidentialTypes: SelectItem[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private documentService: DocumentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadDocumentTypes();
    this.loadConfidentialTypes();
  }

  private loadDocumentTypes(): void {
    const documentTypeEnum: { [key: string]: DocumentType } = DocumentType;
    this.types = Object.keys(documentTypeEnum).map(key => ({
      label: documentTypeEnum[key],
      value: key
    }));
  }

  private loadConfidentialTypes(): void {
    const confidentialTypeEnum: { [key: string]: Confidential } = Confidential;
    this.confidentialTypes = Object.keys(confidentialTypeEnum).map(key => ({
      label: confidentialTypeEnum[key],
      value: key
    }));
    }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      category: [''],
      description: [''],
      creationDate: [''],
      lastUpdate: [''],
      dueDate: [''],
      approved: [false],
      documentLike: [false],
      digitalSignature: [''],
      code: [''],
      metadata: [''],
      confidential: [''],
      responsible: [''],
      notify: [false],
      allowDownload: [false],
      reference: [''],
      documentType: [''],
      //approvalStatus: [''],
      accessPermission: [''],
      tags: this.formBuilder.array([]),
      versions: [[]],
    });
  }

  get tagsFormArray(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.documentService.create(this.form.value)
        .pipe(
          catchError((error) => {
            return throwError(error);
          })
        )
        .subscribe(response => {
          console.log('Documento criado com sucesso', response);
          this.router.navigate(['/dashboard']);

        });
    }
  }
}


