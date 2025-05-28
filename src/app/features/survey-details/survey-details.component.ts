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
      questionType: original.questionType,
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
      type: this.editableQuestion.questionType,
      position: index,
      options: this.editableQuestion.questionType === 'TEXT' ? [] : this.editableQuestion.options
    };

    this.surveyService.updateQuestion(questionId, request).subscribe({
      next: () => {
        this.survey!.questions[index].text = request.text;
        this.survey!.questions[index].questionType = request.type;
        this.survey!.questions[index].options = request.options;
        this.cancelEdit();
      },
      error: err => console.error('Помилка збереження питання', err)
    });
  }
}
