import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonToAdd } from './person-to-add';

describe('PersonToAdd', () => {
  let component: PersonToAdd;
  let fixture: ComponentFixture<PersonToAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonToAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonToAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
