import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { SubscriberService } from '../../services/subscriber.service';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, InputTextModule, InputTextareaModule, ButtonModule, RippleModule]
})
export class ContactComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private subscriberService: SubscriberService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      companyName: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.subscriberService.create(this.form.value)
        .pipe(
          catchError((error) => {
            return throwError(error);
          })
        )
        .subscribe(response => {
          console.log('Usuário enviado com sucesso', response);
        });
    }
  }

  openWhatsApp() {
    const phoneNumber = '31971736555';
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    window.open(whatsappLink, '_blank');
  }
}
