import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelLayout } from './channel-layout';

describe('ChannelLayout', () => {
  let component: ChannelLayout;
  let fixture: ComponentFixture<ChannelLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
