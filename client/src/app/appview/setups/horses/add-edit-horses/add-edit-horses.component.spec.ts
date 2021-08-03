import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditHorsesComponent } from './add-edit-horses.component';

describe('AddEditHorsesComponent', () => {
  let component: AddEditHorsesComponent;
  let fixture: ComponentFixture<AddEditHorsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditHorsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditHorsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
