import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsenanzaPageComponent } from './ensenanza-page.component';

describe('EnsenanzaPageComponent', () => {
  let component: EnsenanzaPageComponent;
  let fixture: ComponentFixture<EnsenanzaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnsenanzaPageComponent]
    });
    fixture = TestBed.createComponent(EnsenanzaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
