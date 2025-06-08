import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';

  captchaToken?:string;
  error?:string;
  
  siteKey = environment.recaptcha.siteKey;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onCaptchaResolved(token:string):void{
    this.captchaToken = token;
  }

  register(): void {
    if(!this.captchaToken){
      this.error='Будь ласка, підтвердіть, що ви не робот';
    }

    this.authService.register({
      username: this.username,
      password: this.password,
      email: this.email,
      recaptchaToken: this.captchaToken
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
