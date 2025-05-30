import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSurveysComponent } from './public-surveys.component';

describe('PublicSurveysComponent', () => {
  let component: PublicSurveysComponent;
  let fixture: ComponentFixture<PublicSurveysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicSurveysComponent]
    });
    fixture = TestBed.createComponent(PublicSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
