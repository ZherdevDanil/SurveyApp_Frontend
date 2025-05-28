import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {
    this.authService.register({
      username: this.username,
      password: this.password,
      email: this.email
    }).subscribe({
      next: () => {
        alert('Реєстрація успішна!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Помилка при реєстрації:', error);
        alert('Помилка реєстрації. Спробуйте ще раз.');
      }
    });
  }
}
