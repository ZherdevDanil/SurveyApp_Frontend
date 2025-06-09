import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent {
  loading = true;
  success=false;

  constructor(private route:ActivatedRoute,private auth:AuthService,private router:Router){}


  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      this.auth.activate(token).subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
        },
        error: () => {
          this.success = false;
          this.loading = false;
        }
      });
    });
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }


}
