import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomMessage } from './room-message';

describe('RoomMessage', () => {
  let component: RoomMessage;
  let fixture: ComponentFixture<RoomMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
