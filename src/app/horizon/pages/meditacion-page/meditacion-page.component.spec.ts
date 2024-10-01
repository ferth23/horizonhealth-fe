import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditacionPageComponent } from './meditacion-page.component';

describe('MeditacionPageComponent', () => {
  let component: MeditacionPageComponent;
  let fixture: ComponentFixture<MeditacionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeditacionPageComponent]
    });
    fixture = TestBed.createComponent(MeditacionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
