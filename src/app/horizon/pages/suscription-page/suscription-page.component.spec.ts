import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscriptionPageComponent } from './suscription-page.component';

describe('SuscriptionPageComponent', () => {
  let component: SuscriptionPageComponent;
  let fixture: ComponentFixture<SuscriptionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuscriptionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuscriptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
