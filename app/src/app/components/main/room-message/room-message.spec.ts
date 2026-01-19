import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomMessageComponent } from './room-message';

describe('RoomMessageComponent', () => {
  let component: RoomMessageComponent;
  let fixture: ComponentFixture<RoomMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
