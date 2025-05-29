import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateSurveyRequest, SurveyService } from 'src/app/core/services/survey.service';
//import { Survey } from 'src/app/core/services/survey.service';
import { Survey } from 'src/app/core/models/survey.model';

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
  newQuestion: any = {
    text: '',
    type: 'TEXT',
    options: []
  };


  constructor(private route: ActivatedRoute, private surveyService: SurveyService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.surveyService.getSurveyById(id).subscribe({
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
}
