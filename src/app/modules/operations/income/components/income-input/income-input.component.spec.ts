import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeInputComponent } from './income-input.component';

describe('IncomeInputComponent', () => {
  let component: IncomeInputComponent;
  let fixture: ComponentFixture<IncomeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
