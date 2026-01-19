import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelNavbarComponent } from './channel-navbar';

describe('ChannelNavbarComponent', () => {
  let component: ChannelNavbarComponent;
  let fixture: ComponentFixture<ChannelNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
