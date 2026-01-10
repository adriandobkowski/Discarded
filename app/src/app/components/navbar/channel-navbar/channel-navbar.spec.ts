import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelNavbar } from './channel-navbar';

describe('ChannelNavbar', () => {
  let component: ChannelNavbar;
  let fixture: ComponentFixture<ChannelNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
