import { Component, OnInit } from '@angular/core';
import { Survey, SurveyService } from 'src/app/core/services/survey.service';

@Component({
  selector: 'app-my-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrls: ['./my-surveys.component.css']
})
export class MySurveysComponent implements OnInit{
  surveys: Survey[] = [];
  constructor(private surveyService: SurveyService){}
  
  ngOnInit(): void {
      this.surveyService.getMySurveys().subscribe({
        next: (data) => this.surveys=data,
        error: (err) => console.error('Помилка завантаження опитувань',err)
      });
  }
}
