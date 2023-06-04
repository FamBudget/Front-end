import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIconToggleComponent } from './select-icon-toggle.component';

describe('SelectIconToggleComponent', () => {
  let component: SelectIconToggleComponent;
  let fixture: ComponentFixture<SelectIconToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectIconToggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectIconToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
