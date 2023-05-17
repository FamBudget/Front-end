import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoveryFirstDialogComponent } from './password-recovery-first-dialog.component';

describe('PasswordRecoveryFirstDialogComponent', () => {
  let component: PasswordRecoveryFirstDialogComponent;
  let fixture: ComponentFixture<PasswordRecoveryFirstDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordRecoveryFirstDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordRecoveryFirstDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
