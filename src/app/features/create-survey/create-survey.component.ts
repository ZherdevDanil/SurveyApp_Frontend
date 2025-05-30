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
    const request: CreateSurveyRequest = {
      title: this.title,
      description: this.description,
      requireAuth: this.requireAuth,
      isPublic: this.isPublic,
      questions: this.questions,
    };

    this.surveyService.createSurvey(request).subscribe({
      next: () => this.router.navigate(['/my-surveys']),
      error: (err) => console.error('Помилка при створенні опитування:', err)
    });
  }





}
