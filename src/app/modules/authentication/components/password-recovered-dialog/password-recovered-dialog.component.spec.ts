import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoveredDialogComponent } from './password-recovered-dialog.component';

describe('PasswordRecoveredDialogComponent', () => {
  let component: PasswordRecoveredDialogComponent;
  let fixture: ComponentFixture<PasswordRecoveredDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordRecoveredDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordRecoveredDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
