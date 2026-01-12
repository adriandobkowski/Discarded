import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteToChannelModal } from './invite-to-channel-modal';

describe('InviteToChannelModal', () => {
  let component: InviteToChannelModal;
  let fixture: ComponentFixture<InviteToChannelModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InviteToChannelModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteToChannelModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
