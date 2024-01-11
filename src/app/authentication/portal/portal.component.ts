import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-portal',
    templateUrl: './portal.component.html',
    styleUrls: ['./portal.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, InputTextModule, CheckboxModule, ButtonModule, RippleModule, DividerModule]
})
export class PortalComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value.username, this.form.value.password).subscribe((success) => {
        if (success) {
          this.router.navigate(['/dashboard']);
          this.notificationService.success('Logado com sucesso');
        } else {
          this.notificationService.error('Email ou senha inválido');
        }
      });
    } else {
      this.notificationService.warn('Por favor, preencha todos os campos');
    }
  }
}
