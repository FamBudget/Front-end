import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoverySecondDialogComponent } from './password-recovery-second-dialog.component';

describe('PasswordRecoverySecondDialogComponent', () => {
  let component: PasswordRecoverySecondDialogComponent;
  let fixture: ComponentFixture<PasswordRecoverySecondDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordRecoverySecondDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordRecoverySecondDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
