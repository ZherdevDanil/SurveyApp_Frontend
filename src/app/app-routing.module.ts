import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'register', component: RegisterComponent},
  //{path:'my-surveys',component:MySurveysComponent, canActivate:[AuthGuard]},
  //{path:'create',component:CreateSurveyComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
