import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SurveyResultsComponent } from './features/survey-results/survey-results.component';
import { MySurveysComponent } from './features/my-surveys/my-surveys.component';
import { CreateSurveyComponent } from './features/create-survey/create-survey.component';
import { SurveyPassComponent } from './features/survey-pass/survey-pass.component';
import { HomeComponent } from './features/home/home.component';
import { SurveyDetailsComponent } from './features/survey-details/survey-details.component';
import { PublicSurveysComponent } from './features/public-surveys/public-surveys.component';
import { ActivationComponent } from './features/activation/activation.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'', component:HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'activate',component: ActivationComponent},
  
  {path:'my-surveys',component:MySurveysComponent, canActivate:[AuthGuard]},
  {path:'create-survey',component:CreateSurveyComponent,canActivate:[AuthGuard]},
  {path:'survey-results/:id', component:SurveyResultsComponent, canActivate:[AuthGuard]},
  {path:'surveys/public',component:PublicSurveysComponent,canActivate:[AuthGuard]},

  {path:'survey/:id',component:SurveyPassComponent},
  {path:'survey-details/:id',component:SurveyDetailsComponent, canActivate:[AuthGuard]},
  
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
