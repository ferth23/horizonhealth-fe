import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditacionPopUpComponent } from './meditacion-pop-up.component';

describe('MeditacionPopUpComponent', () => {
  let component: MeditacionPopUpComponent;
  let fixture: ComponentFixture<MeditacionPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeditacionPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeditacionPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
