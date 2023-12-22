import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
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
