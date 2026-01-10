import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelMessage } from './channel-message';

describe('ChannelMessage', () => {
  let component: ChannelMessage;
  let fixture: ComponentFixture<ChannelMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
