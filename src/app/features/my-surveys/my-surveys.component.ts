import { Component, OnInit } from '@angular/core';
import {  SurveyService } from 'src/app/core/services/survey.service';
import { Router } from '@angular/router';
import { Survey } from 'src/app/core/models/survey.model';
@Component({
  selector: 'app-my-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrls: ['./my-surveys.component.css']
})
export class MySurveysComponent implements OnInit{
  surveys: Survey[] = [];
  constructor(private surveyService: SurveyService,private router:Router){}

  viewDetails(id:number){
    this.router.navigate(['/survey-details',id])
  }
  
  ngOnInit(): void {
      this.surveyService.getMySurveys().subscribe({
        next: (data) => this.surveys=data,
        error: (err) => console.error('Помилка завантаження опитувань',err)
      });
  }
}
