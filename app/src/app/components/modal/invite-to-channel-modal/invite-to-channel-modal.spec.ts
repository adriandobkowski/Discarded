import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteToChannelModalComponent } from './invite-to-channel-modal';

describe('InviteToChannelModalComponent', () => {
  let component: InviteToChannelModalComponent;
  let fixture: ComponentFixture<InviteToChannelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InviteToChannelModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InviteToChannelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
