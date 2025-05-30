import { Component } from '@angular/core';
import { SurveyService } from 'src/app/core/services/survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-surveys',
  templateUrl: './public-surveys.component.html',
  styleUrls: ['./public-surveys.component.css']
})
export class PublicSurveysComponent {
  surveys: any[] = [];

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit(): void {
    this.surveyService.getPublicSurveys().subscribe({
      next: data => this.surveys = data,
      error: err => console.error('Помилка отримання публічних опитувань:', err)
    });
  }

  goToSurvey(id: number): void {
    this.router.navigate(['/survey', id]);
  }
}
