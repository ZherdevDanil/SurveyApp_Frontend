import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username='';
  password='';
  error='';


  constructor(private authService: AuthService, private router: Router){}

  login():void{
    this.authService.login({username:this.username,password:this.password
    }).subscribe({
      next: (res) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/surveys'])
      },
          error: (err)=>{
            this.error = 'Неправильні дані для входу';
            console.error(err);
          }
    })
  }
  


}
