import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-portal',
    templateUrl: './portal.component.html',
    styleUrls: ['./portal.component.scss'],
    standalone: true,
    providers: [MessageService],
    imports: [FormsModule, ReactiveFormsModule, ToastModule, InputTextModule, CheckboxModule, ButtonModule, RippleModule, DividerModule]
})
export class PortalComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
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
          this.messageService.add({ severity: 'success', summary: 'Logado com sucesso!' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Email ou senha inválido' });
        }
      });
    } else {
      this.messageService.add({ severity: 'info', summary: 'Por favor, preencha todos os campos' });
    }
  }
}
