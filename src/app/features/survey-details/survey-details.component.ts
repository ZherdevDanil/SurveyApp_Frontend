import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateSurveyRequest, SurveyService } from 'src/app/core/services/survey.service';
//import { Survey } from 'src/app/core/services/survey.service';
import { Survey } from 'src/app/core/models/survey.model';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css']
})
export class SurveyDetailsComponent implements OnInit{
  survey?: Survey;
  editedIndex: number | null = null;
  editableQuestion: any = null;
  newQuestionVisible: boolean = false;
  newDescription: string = '';
  newQuestion: any = {
    text: '',
    type: 'TEXT',
    options: []
  };


  constructor(private route: ActivatedRoute, private surveyService: SurveyService, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.surveyService.getSurveyDetailsById(id).subscribe({
      next: data => this.survey = data,
      error: err => console.error('Помилка завантаження опитування', err)
    });
  }

  editQuestion(index: number): void {
    this.editedIndex = index;
    const original = this.survey!.questions[index];
    this.editableQuestion = {
      text: original.text,
      type: original.type,
      options: original.options?.map((o: any) => ({ text: o.text, position: o.position })) || []
    };
  }

  cancelEdit(): void {
    this.editedIndex = null;
    this.editableQuestion = null;
  }

  addOption(): void {
    this.editableQuestion.options.push({ text: '', position: this.editableQuestion.options.length });
  }

  removeOption(index: number): void {
    this.editableQuestion.options.splice(index, 1);
  }

  saveQuestion(index: number, questionId: number): void {
    const request = {
      text: this.editableQuestion.text,
      type: this.editableQuestion.type,
      position: index,
      options: this.editableQuestion.type === 'TEXT' ? [] : this.editableQuestion.options
    };

    this.surveyService.updateQuestion(questionId, request).subscribe({
      next: () => {
        this.survey!.questions[index].text = request.text;
        this.survey!.questions[index].type = request.type;
        this.survey!.questions[index].options = request.options;
        this.cancelEdit();
      },
      error: err => console.error('Помилка збереження питання', err)
    });
  }



  showNewQuestionForm(): void {
  this.newQuestionVisible = true;
  this.newQuestion = {
    text: '',
    type: 'TEXT',
    options: []
  };
}

addNewOption(): void {
  this.newQuestion.options.push({ text: '', position: this.newQuestion.options.length });
}

removeNewOption(index: number): void {
  this.newQuestion.options.splice(index, 1);
}

saveNewQuestion(): void {
  const request = {
    text: this.newQuestion.text,
    type: this.newQuestion.type,
    position: this.survey!.questions.length,
    options: this.newQuestion.type === 'TEXT' ? [] : this.newQuestion.options
  };

  this.surveyService.addQuestion(this.survey!.id, request).subscribe({
    next: (newQ) => {
      this.survey!.questions.push(newQ);
      this.newQuestionVisible = false;
    },
    error: err => console.error('Помилка додавання питання', err)
  });
}

  saveSurveyChanges():void{
    if (!this.survey) return;
    const updatedSurvey = {
      title: this.survey.title,
      description: this.survey.description,
      requireAuth: this.survey.requireAuth,
      public: this.survey.public,
    };
    this.surveyService.updateSurvey(this.survey.id,updatedSurvey).subscribe({
      next: ()=>{
        alert('Зміни пройшли успішно')
        this.router.navigate(['/my-surveys'])
      },error: err=>{
        if(err.status === 400 || err.status === 409){
          alert('неможливо редагувати питання, на яке вже надано відповідь')
        }
        alert('Помилки при збережені відредагованого опитування')
      }
    })

  }


  finishSurvey():void{
    this.surveyService.finishSurvey(this.survey!.id)
    .subscribe(updated => this.survey = updated);
  }
}
