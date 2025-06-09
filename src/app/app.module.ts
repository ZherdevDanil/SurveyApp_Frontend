import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import { SurveysModule } from './features/surveys/surveys.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { HomeComponent } from './features/home/home.component';
import { MySurveysComponent } from './features/my-surveys/my-surveys.component';
import { CreateSurveyComponent } from './features/create-survey/create-survey.component';
import { SurveyPassComponent } from './features/survey-pass/survey-pass.component';
import { SurveyResultsComponent } from './features/survey-results/survey-results.component';
import { SurveyDetailsComponent } from './features/survey-details/survey-details.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PublicSurveysComponent } from './features/public-surveys/public-surveys.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { ActivationComponent } from './features/activation/activation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MySurveysComponent,
    CreateSurveyComponent,
    SurveyPassComponent,
    SurveyResultsComponent,
    SurveyDetailsComponent,
    PublicSurveysComponent,
    ActivationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SurveysModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
