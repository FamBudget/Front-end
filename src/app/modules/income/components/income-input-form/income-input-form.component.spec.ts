import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeInputFormComponent } from './income-input-form.component';

describe('IncomeInputFormComponent', () => {
  let component: IncomeInputFormComponent;
  let fixture: ComponentFixture<IncomeInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeInputFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
