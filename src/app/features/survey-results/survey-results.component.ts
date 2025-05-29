import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/core/services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { SurveyResultsResponse } from 'src/app/core/models/survey-result.model';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css']
})
export class SurveyResultsComponent implements OnInit {
  surveyId!: number;
  results?: SurveyResultsResponse;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    this.surveyId = Number(this.route.snapshot.paramMap.get('id'));
    this.surveyService.getSurveyAnalytics(this.surveyId).subscribe({
      next: res => {
        this.results = res;
        this.loading = false;
      },
      error: err => {
        this.error = 'Не вдалося завантажити аналітику';
        console.error(err);
        this.loading = false;
      }
    });
  }
  formatStatsForChart(optionStats: any[]): { name: string, value: number }[] {
  return optionStats.map(opt => ({
    name: opt.text,
    value: opt.count
  }));
}


}
