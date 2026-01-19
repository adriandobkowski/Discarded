import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonToAddComponent } from './person-to-add';

describe('PersonToAddComponent', () => {
  let component: PersonToAddComponent;
  let fixture: ComponentFixture<PersonToAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonToAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonToAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
