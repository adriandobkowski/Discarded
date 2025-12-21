import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSection } from './channel-section';

describe('ChannelSection', () => {
  let component: ChannelSection;
  let fixture: ComponentFixture<ChannelSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
