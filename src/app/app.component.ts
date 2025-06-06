import { Component } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'survey-app';

  constructor(public authService: AuthService, private router:Router){}


  logout():void{
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
