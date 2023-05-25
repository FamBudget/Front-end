import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountIncomeComponent } from './amount-income.component';

describe('AmountIncomeComponent', () => {
  let component: AmountIncomeComponent;
  let fixture: ComponentFixture<AmountIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountIncomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmountIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
