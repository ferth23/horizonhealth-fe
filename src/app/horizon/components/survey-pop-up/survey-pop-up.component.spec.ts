import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPopUpComponent } from './survey-pop-up.component';

describe('SurveyPopUpComponent', () => {
  let component: SurveyPopUpComponent;
  let fixture: ComponentFixture<SurveyPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
