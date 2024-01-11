import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { Segment } from 'src/app/common/segment';
import { TesterService } from 'src/app/services/tester.service';
import { UserService } from 'src/app/services/user.service';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'app-try-free',
    templateUrl: './try-free.component.html',
    styleUrls: ['./try-free.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, DividerModule, InputTextModule, CheckboxModule, InputMaskModule, DropdownModule, ToastModule, ConfirmDialogModule, ButtonModule, RippleModule]
})
export class TryFreeComponent {
  form!: FormGroup;
  segments: Segment[] = [];

  constructor(
    private fb: FormBuilder,
    private testerService: TesterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }


  ngOnInit() {
    this.initForm();
    this.segments = [
      { name: 'Bancário' },
      { name: 'Saúde' },
      { name: 'Jurídico' },
      { name: 'Educação' },
      { name: 'Tecnologia' },
      { name: 'Manufatura' },
      { name: 'Recursos Humanos' },
      { name: 'Varejo' },
      { name: 'Construção' },
      { name: 'Governo' },

    ]
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      position: [null, [Validators.required]],
      notification: [null],
      selected: [null, [Validators.required]],
      companyName: ['', [Validators.required]],
      numberOfEmployees: [null, [Validators.required]],
      accessUrl: ['', [Validators.required]],
      otherSegment: ['']
    });
  }


  submitForm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'O usuário concorda em prosseguir com a experimentação gratuita?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle mr-2',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'p-button-success',
      rejectButtonStyleClass: 'p-button-danger mr-3',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Voltar e revisar',
      accept: () => {
        if (this.form.valid) {
          this.testerService.create(this.form.value)
            .pipe(
              catchError((error) => {
                return throwError(error);
              })
            )
            .subscribe(response => {
              console.log('Usuário enviado com sucesso', response);
              this.router.navigate(['/confirmacao']);

            });
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Operação Cancelada', detail: 'Você cancelou a operação.', life: 3000 });
      }
    });
  }

}
