import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToRoomComponent } from './add-to-room';

describe('AddToRoomComponent', () => {
  let component: AddToRoomComponent;
  let fixture: ComponentFixture<AddToRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToRoomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddToRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
