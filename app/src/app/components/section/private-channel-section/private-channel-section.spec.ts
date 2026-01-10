import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateChannelSection } from './private-channel-section';

describe('PrivateChannelSection', () => {
  let component: PrivateChannelSection;
  let fixture: ComponentFixture<PrivateChannelSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateChannelSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateChannelSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
