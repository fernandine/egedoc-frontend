import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Tag } from 'primeng/tag';
import { catchError, throwError } from 'rxjs';
import { Document } from 'src/app/common/document';
import { Confidential } from 'src/app/common/enums/confidential.enum';
import { DocumentType } from 'src/app/common/enums/document-type';
import { Folder } from 'src/app/common/folder';
import { DocumentService } from 'src/app/services/document.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss'],
  standalone: true,
  imports: [InputSwitchModule, InputTextareaModule, CalendarModule, DropdownModule, ChipsModule, FormsModule, ReactiveFormsModule,]

})
export class DocumentFormComponent {

  form!: FormGroup;
  availableTags: Tag[] = [];
  types: SelectItem[] = [];
  confidentialTypes: SelectItem[] = [];
  document!: Document;
  folder!: Folder;
  documentId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.headerService.setHeaderForSite(false);
    this.initializeForm();
    this.loadDocumentTypes();
    this.loadConfidentialTypes();

    this.route.params.subscribe(params => {
      this.documentId = +params['id'];
      this.loadDocumentDetails(this.documentId);
    });
  }

  loadDocumentDetails(documentId: number) {
    this.documentService.loadById(documentId).subscribe((document) => {
      this.document = document;
      this.form.patchValue({
        name: document.name,
        code: document.code,
        description: document.description,
        dueDate: new Date(document.dueDate),
        approved: document.approved,
        purge: document.purge,
        temporality: document.temporality,
        note: document.note,
        confidential: document.confidential,
        responsible: document.responsible,
        notify: document.notify,
        allowDownload: document.allowDownload,
        reference: document.reference,
        documentType: document.documentType,
        tags: document.tags,
        versions: document.versions
      });
    })
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: new Date(),
      approved: [false],
      code: [],
      confidential: [''],
      responsible: [''],
      note: [''],
      purge: new Date(),
      temporality: [0],
      notify: [false],
      allowDownload: [false],
      reference: [''],
      documentType: [''],
      //approvalStatus: [''],
      tags: [],
      versions: [[]],
    });
  }

  get tagsFormArray(): FormArray {
    return this.form.get('tags') as FormArray;
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
          this.router.navigate(['/folderId']);

        });
    }
  }

  onUpdate(documentId: number): void {
    if (this.form.valid) {
      this.documentService.update(documentId, this.form.value)
        .pipe(
          catchError((error) => {
            return throwError(error);
          })
        )
        .subscribe(response => {
          console.log('Documento atualizado com sucesso', response);
          this.location.back();

        });
    }
  }
  formatDate(date: Date): string {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

}


