import { Component } from '@angular/core';
import { SurveyService } from 'src/app/core/services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { AnswerService } from 'src/app/core/services/answer.serveci';
import { Survey } from 'src/app/core/models/survey.model';
import { AnswerRequest } from 'src/app/core/models/answer-request.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-survey-pass',
  templateUrl: './survey-pass.component.html',
  styleUrls: ['./survey-pass.component.css']
})
export class SurveyPassComponent {

surveyId!: number;
  survey: Survey | undefined;
  alreadySubmitted = false;
  loading = true;
  answers: { [questionId: number]: any } = {};

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private answerService: AnswerService,
    public router : Router
  ) {}

  ngOnInit(): void {
    this.surveyId = Number(this.route.snapshot.paramMap.get('id'));

    this.surveyService.checkIfAlreadySubmitted(this.surveyId).subscribe({
      next: submitted => {
        this.alreadySubmitted = submitted;
        if (!submitted) {
          this.loadSurvey();
        } else {
          this.loading = false;
        }
      },
      error: err => {
        console.error('Помилка перевірки проходження:', err);
        this.loading = false;
      }
    });
  }

  loadSurvey(): void {
    this.surveyService.getSurveyById(this.surveyId).subscribe({
      next: data => {
        this.survey = data;
        this.loading = false;
      },
      error: err => {
        console.error('Помилка завантаження опитування:', err);
        this.loading = false;
      }
    });
  }

  onCheckboxChange(questionId: number, optionId: number, checked: boolean): void {
    if (!this.answers[questionId]) {
      this.answers[questionId] = [];
    }
    if (checked) {
      this.answers[questionId].push(optionId);
    } else {
      this.answers[questionId] =
        this.answers[questionId].filter((id: number) => id !== optionId);
    }
  }

  onCheckboxChangeEvent(
    qId: number,
    optId: number,
    event: Event
  ): void {
    const input = event.target as HTMLInputElement;
    this.onCheckboxChange(qId, optId, input.checked);
  }

  submitAnswers(): void {
  if (!this.survey) return;

  const answerRequests: AnswerRequest[] = this.survey.questions.map(q => {
    const ans = this.answers[q.id]; 

    if (q.type === 'TEXT') {
      return {
        questionId: q.id,
        textAnswer: ans || ''      
      };
    }

    if (q.type === 'SINGLE_CHOICE') {
      const selected = ans ? [ans as number] : [];
      return {
        questionId: q.id,
        selectedOptionId: selected
      };
    }

 
    return {
      questionId: q.id,
      selectedOptionId: ans as number[]
    };
  });

  this.surveyService.submitAnswers(answerRequests).subscribe({
    next: () => (this.alreadySubmitted = true),
    error: err => console.error('Помилка надсилання відповідей:', err)
  });
}
}
