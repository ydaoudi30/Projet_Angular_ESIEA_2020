import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCntComponent } from './registration-cnt.component';

describe('RegistrationCntComponent', () => {
  let component: RegistrationCntComponent;
  let fixture: ComponentFixture<RegistrationCntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationCntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationCntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
