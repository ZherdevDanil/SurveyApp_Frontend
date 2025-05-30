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
  surveyClosed = false;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private answerService: AnswerService,
    public router : Router
  ) {}

  ngOnInit(): void {
    this.surveyId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSurveyAndCheck();
    
    /*this.surveyService.checkIfAlreadySubmitted(this.surveyId).subscribe({
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
    });*/
  }

   private loadSurveyAndCheck(): void {
    this.surveyService.getSurveyById(this.surveyId).subscribe({
      next: data => {
        this.survey = data;
        if (!this.isSurveyActive(data)) {
          this.surveyClosed = true;
          this.loading = false;
        } else {
          this.checkIfSubmitted();
        }
      },
      error: err => {
        console.error('Помилка завантаження опитування:', err);
        this.loading = false;
      }
    });
  }

  private checkIfSubmitted(): void {
    this.surveyService.checkIfAlreadySubmitted(this.surveyId).subscribe({
      next: submitted => {
        this.alreadySubmitted = submitted;
        this.loading = false;
      },
      error: err => {
        console.error('Помилка перевірки проходження:', err);
        this.loading = false;
      }
    });
  }

  private isSurveyActive(s: Survey): boolean {
    const now = new Date();
    if (!s.isActive) {
      return false;
    }
    if (s.activeFrom && new Date(s.activeFrom) > now) {
      return false;
    }
    if (s.activeUntil && new Date(s.activeUntil) < now) {
      return false;
    }
    return true;
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

  /*submitAnswers(): void {
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
}*/

  submitAnswers(): void {
  if (!this.survey) {
    return;
  }

  const answerRequests: AnswerRequest[] = this.survey.questions.map(q => {
    const ans = this.answers[q.id];

    // Для питань із варіантами (радіо та чекбокси) приводимо у масив чисел
    const selected: number[] = ans != null
      ? Array.isArray(ans)
        ? ans      // вже масив для MULTIPLE_CHOICE
        : [ans]   // обгортаємо у масив для SINGLE_CHOICE
      : [];

    if (q.type === 'TEXT') {
      return {
        questionId: q.id,
        textAnswer: (ans as string) || ''
        // selectedOptionId можна опустити, якщо DTO допускає undefined
      };
    }

    // SINGLE_CHOICE або MULTIPLE_CHOICE
    return {
      questionId: q.id,
      selectedOptionId: selected
      // textAnswer можна опустити або поставити null/undefined
    };
  });

  this.answerService.submitAnswers(answerRequests).subscribe({
    next: () => {
      this.alreadySubmitted = true;
    },
    error: err => {
      console.error('Помилка надсилання відповідей:', err);
    }
  });
}



  /*canSubmit():boolean{
    if(!this.survey){
      return false;
    }
    for (const q of this.survey.questions) {
      if (q.type !== 'TEXT') {
        const ans = this.answers[q.id];
        if (!Array.isArray(ans) || ans.length === 0) {
          return false;
        }
      }
    }
    return true;
  }*/

    canSubmit(): boolean {
  if (!this.survey) {
    return false;
  }

  for (const q of this.survey.questions) {
    if (q.type === 'TEXT') {
      // Для текстових питань ми нічого не перевіряємо
      continue;
    }

    const ans = this.answers[q.id];
    // Якщо відповіді взагалі немає → не можна сабмітити
    if (ans == null) {
      return false;
    }

    if (q.type === 'MULTIPLE_CHOICE') {
      // Для мультивибору треба, щоб це був масив і не порожній
      if (!Array.isArray(ans) || ans.length === 0) {
        return false;
      }
    }
    // Для SINGLE_CHOICE достатньо просто перевірити ans != null,
    // бо ans — одне число, і воно truthy
  }

  return true;
}

}
