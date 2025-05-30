import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionRequest, SurveyService, CreateSurveyRequest } from 'src/app/core/services/survey.service';

interface CreateQuestionRequest {
  text: string;
  type: 'TEXT' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  position: number;
  options?: string[];
}

interface CreateFullSurveyRequest {
  title: string;
  description: string;
  requireAuth: boolean;
  isPublic: boolean;
  questions: CreateQuestionRequest[];
}


@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent {
  title: string = '';
  description: string = '';
  requireAuth: boolean = false;
  isPublic: boolean = false;
  questions: QuestionRequest[] = [];
  //activeFrom:string='';
  //activeUntil:string='';
  activeFromDate!:string;
  activeFromTime!:string;
  activeUntilDate!:string;
  activeUntilTime!:string;

  constructor(private surveyService: SurveyService, private router:Router){}

  addQuestion():void{
    this.questions.push({
      text:'',
      type: 'TEXT',
      position: this.questions.length,
      options:[]
    });
  }


  removeQuestion(index: number):void{
    this.questions.splice(index,1);
  }

  addOption(questionIndex: number):void{
    this.questions[questionIndex].options = this.questions[questionIndex].options || [];
    this.questions[questionIndex].options!.push({
      text: '',
      position: this.questions[questionIndex].options!.length
  });
  }

  removeOption(questionIndex: number, optionIndex:number):void{
    this.questions[questionIndex].options!.splice(optionIndex,1);
  }


  submit(): void {
    //console.log('>>> activeFrom raw:', this.activeFrom);
    //console.log('>>> activeUntil raw:', this.activeUntil);
    //const isoFrom   = this.activeFrom   ? new Date(this.activeFrom).toISOString()   : undefined;
    //const isoUntil  = this.activeUntil  ? new Date(this.activeUntil).toISOString()  : undefined;
    const isoFrom = this.activeFromDate && this.activeFromTime ? `${this.activeFromDate}T${this.activeFromTime}:00Z` : undefined;
    const isoUntil = this.activeUntilDate && this.activeUntilTime ? `${this.activeUntilDate}T${this.activeUntilTime}:00Z` : undefined;
    const request: CreateSurveyRequest = {
      title: this.title,
      description: this.description,
      requireAuth: this.requireAuth,
      isPublic: this.isPublic,
      questions: this.questions,
      //activeFrom: this.activeFrom ? `${this.activeFrom}:00Z`   : undefined,
      //activeUntil: this.activeUntil ? `${this.activeUntil}:00Z` : undefined,
       //...(isoFrom  && { activeFrom:  isoFrom }),
      //...(isoUntil && { activeUntil: isoUntil })
      activeFrom: isoFrom,
      activeUntil: isoUntil
    };
    console.log('>>> payload:', request);
    this.surveyService.createSurvey(request).subscribe({
      next: () => this.router.navigate(['/my-surveys']),
      error: (err) => console.error('Помилка при створенні опитування:', err)
    });
  }





}
