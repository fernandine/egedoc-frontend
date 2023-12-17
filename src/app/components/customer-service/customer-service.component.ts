import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { SubscriberService } from '../../services/subscriber.service';
@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.scss']
})
export class CustomerServiceComponent {
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
