import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToRoom } from './add-to-room';

describe('AddToRoom', () => {
  let component: AddToRoom;
  let fixture: ComponentFixture<AddToRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToRoom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToRoom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
