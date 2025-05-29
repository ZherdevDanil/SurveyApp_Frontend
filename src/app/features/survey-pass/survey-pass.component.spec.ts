import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPassComponent } from './survey-pass.component';

describe('SurveyPassComponent', () => {
  let component: SurveyPassComponent;
  let fixture: ComponentFixture<SurveyPassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyPassComponent]
    });
    fixture = TestBed.createComponent(SurveyPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
